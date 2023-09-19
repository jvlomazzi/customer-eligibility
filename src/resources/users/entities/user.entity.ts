import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../interfaces/entities/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true, name: 'username' })
  username: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'email' })
  email: string;
}
