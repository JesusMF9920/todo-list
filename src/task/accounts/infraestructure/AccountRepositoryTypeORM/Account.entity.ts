import { AccountId } from '../../../shared/domain/ids/AccountId';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Account, AccountPrimitives } from '../../domain/Account';
import { AccountHashedPassword } from '../../domain/AccountHashedPassword';
import { AccountSalt } from '../../domain/AccountSalt';
import { AccountType } from '../../domain/AccountType';
import { EmailAddress } from '../../domain/EmailAddress';
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

  @Column({ enum: AccountType })
  accountType: AccountType;

  constructor(p: AccountPrimitives) {
    this.id = p.id;
    this.email = p.email;
    this.password = p.password;
    this.salt = p.salt;
    this.accountType = p.accountType;
  }

  static fromPrimitives(p: AccountPrimitives) {
    return new AccountEntity(p);
  }

  static async toDomain(accountEntity: AccountEntity) {
    return new Account(
      AccountId.fromString(accountEntity.id),
      new EmailAddress(accountEntity.email),
      new AccountHashedPassword(accountEntity.password),
      new AccountSalt(accountEntity.salt),
      accountEntity.accountType,
    );
  }
}
