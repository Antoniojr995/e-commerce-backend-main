import { Controller, Get, Param } from '@nestjs/common';
import { CorreiosService } from './correios.service';
import { ReturnCepDTO } from './dtos/return-cep.dto';

@Controller('correios')
export class CorreiosController {
  constructor(private readonly correiosService: CorreiosService) {}

  @Get('/:cep')
  async findAll(@Param('cep') cep: string): Promise<ReturnCepDTO> {
    return this.correiosService.findAddressByCep(cep);
  }
}
