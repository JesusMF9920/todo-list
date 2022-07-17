import { Column, Entity, PrimaryColumn } from 'typeorm';
// import { Account, AccountPrimitives } from '../../domain/Account';

@Entity({ name: 'accounts' })
export class AccountEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;
}
