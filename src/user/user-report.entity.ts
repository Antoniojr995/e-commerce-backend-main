// user-report.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'user_reports' })
export class UserReportEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  // Adicione outros campos necessários para o relatório

  // Relacionamento com o usuário
  // @ManyToOne(() => UserEntity, (user) => user.reports)
  // @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  // user: UserEntity;
}
