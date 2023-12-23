/*import * as fs from 'fs';
import * as path from 'path';
import * as PDFDocument from 'pdfkit';
import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserReportService {
  constructor(private readonly userService: UserService) {}

  async generateUserReportPDF(userId: number, savePath: string): Promise<Buffer> {
    const user = await this.userService.getUserByUsingRelations(userId);
    const pdfDocument = new PDFDocument();

    pdfDocument.pipe(fs.createWriteStream(path.join(savePath, `user_report_${userId}.pdf`)));

    pdfDocument.fontSize(16).text(`Relatório do Usuário ID: ${userId}`, { align: 'center' });
    pdfDocument.moveDown();

    pdfDocument.fontSize(12).text(`Nome: ${user.name}`);
    pdfDocument.fontSize(12).text(`E-mail: ${user.email}`);
    pdfDocument.fontSize(12).text(`Tipo de Usuário: ${user.typeUser}`);
    pdfDocument.moveDown();

    // Adicione mais informações conforme necessário

    pdfDocument.end();

    return new Promise<Buffer>((resolve, reject) => {
      const buffers: any[] = [];
      pdfDocument.on('data', (buffer) => buffers.push(buffer));
      pdfDocument.on('end', () => resolve(Buffer.concat(buffers)));
      pdfDocument.on('error', (error) => reject(error));
    });
  }
}
*/
import * as PDFDocument from 'pdfkit';
import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserReportService {
  constructor(private readonly userService: UserService) {}

  async generateUserReportPDF(userId: number): Promise<Buffer> {
    const user = await this.userService.getUserByUsingRelations(userId);
    const pdfDocument = new PDFDocument();

    pdfDocument.fontSize(16).text(`Relatório do Usuário ID: ${userId}`, { align: 'center' });
    pdfDocument.moveDown();

    pdfDocument.fontSize(12).text(`Nome: ${user.name}`);
    pdfDocument.fontSize(12).text(`E-mail: ${user.email}`);
    pdfDocument.fontSize(12).text(`Tipo de Usuário: ${user.typeUser}`);
    pdfDocument.moveDown();

    // Adicione mais informações conforme necessário

    pdfDocument.end();

    return new Promise<Buffer>((resolve, reject) => {
      const buffers: any[] = [];
      pdfDocument.on('data', (buffer) => buffers.push(buffer));
      pdfDocument.on('end', () => resolve(Buffer.concat(buffers)));
      pdfDocument.on('error', (error) => reject(error));
    });
  }
}
