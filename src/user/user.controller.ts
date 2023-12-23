import { Body, Controller, Get,Param, Patch, Post, UsePipes, ValidationPipe,} from '@nestjs/common';
import { createUserDTO } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { UpdatePasswordDTO } from './dtos/update-password.dto';
import { UserId } from '../decorators/user-id.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from './enum/user-type.enum';
import { Res } from '@nestjs/common';
import { Response } from 'express';
import { UserReportService } from './user-report.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userReportService: UserReportService, // Adicione o serviço de relatório
  ) {}
  @Get('/report')
  async generateAllUsersReport(@Res() res: Response): Promise<void> {
    const reportBuffer = await this.userService.generateAllUsersReportPDF();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=all_users_report.pdf');
    res.send(reportBuffer);
  }

  @Roles(UserType.Root)
  @Post('/admin')
  async createAdmin(@Body() createUser: createUserDTO): Promise<UserEntity> {
    return this.userService.createUser(createUser, UserType.Admin);
  }

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: createUserDTO): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Get('/all')
  async getAllUsers(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAllUsers()).map(
      (userEntity) => new ReturnUserDto(userEntity),
    );
  }

  @Roles(UserType.Admin, UserType.Root)
  @Get('/:userId')
  async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto> {
    return new ReturnUserDto(
      await this.userService.getUserByUsingRelations(userId),
    );
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Patch()
  @UsePipes(ValidationPipe)
  async updatePasswordUser(
    @Body() updatePasswordDTO: UpdatePasswordDTO,
    @UserId() userId: number,
  ): Promise<UserEntity> {
    return this.userService.updatePasswordUser(updatePasswordDTO, userId);
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get()
  async getInfoUser(@UserId() userId: number): Promise<ReturnUserDto> {
    return new ReturnUserDto(
      await this.userService.getUserByUsingRelations(userId),
    );
  }
  @Get('/report/:userId')
  async generateUserReportPDF(
    @Param('userId') userId: number,
    @Res() res: Response,
  ) {
    const savePath = 'C:/Users/Antonio jr/Documents/relatorio';

    try {
      const buffer = await this.userReportService.generateUserReportPDF(userId);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=user_report_${userId}.pdf`);
      res.send(buffer);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao gerar o relatório');
    }
  }
}

