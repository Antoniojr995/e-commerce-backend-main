import { OrderEntity } from '../../order/entities/order.entity';
import { AddressEntity } from '../../address/entities/address.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PaymentEntity } from 'src/payment/entities/payment.entity';
import { OrderProductEntity } from 'src/order-product/entities/order-product.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @Column({ name: 'phone' })
  phone: string;

  @Column({ name: 'cpf', nullable: false })
  cpf: string;

  @Column({ name: 'type_user', nullable: false })
  typeUser: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: Date;

  @OneToMany(() => AddressEntity, (address) => address.user)
  address?: AddressEntity[];

  @OneToMany(() => OrderEntity, (order) => order.address)
  orders?: OrderEntity[];
}
