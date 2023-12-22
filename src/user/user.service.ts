import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { createUserDTO } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from './enum/user-type.enum';
import { UpdatePasswordDTO } from './dtos/update-password.dto';
import { createPasswordHashed, vaildatePassword } from '../utils/password';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(
    createUserDTO: createUserDTO,
    userType?: number,
  ): Promise<UserEntity> {
    const user = await this.findUserByEmail(createUserDTO.email).catch(
      () => undefined,
    );

    if (user) {
      throw new BadGatewayException(
        'Este email já está cadastrado no sistema. Tente cadastrar outro email.',
      );
    }
    const passwordHashed = await createPasswordHashed(createUserDTO.password);

    return this.userRepository.save({
      ...createUserDTO,
      typeUser: userType ? userType : UserType.User,
      password: passwordHashed,
    });
  }

  async getUserByUsingRelations(userId: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        address: {
          city: {
            state: true,
          },
        },
      },
    });
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findUserById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`UserId: ${userId} not found.`);
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFoundException(`Email: ${email} Not Found`);
    }

    return user;
  }

  async updatePasswordUser(
    updatePasswordDTO: UpdatePasswordDTO,
    userId: number,
  ): Promise<UserEntity> {
    const user = await this.findUserById(userId);

    const passwordHashed = await createPasswordHashed(
      updatePasswordDTO.newPassword,
    );

    const isMatch = await vaildatePassword(
      updatePasswordDTO.lastPassword,
      user.password || '',
    );

    if (!isMatch) {
      throw new BadRequestException('Senha inválida');
    }

    return this.userRepository.save({
      ...user,
      password: passwordHashed,
    });
  }
}
