import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../domain/AccountRepository';
import { Repository } from 'typeorm';
import { AccountEntity } from './AccountRepositoryTypeORM/Account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountId } from '../../shared/domain/ids/AccountId';
import { Account } from '../domain/Account';
import { EmailAddress } from '../domain/EmailAddress';

@Injectable()
export class AccountRepositoryTypeORM implements AccountRepository {
  constructor(
    @InjectRepository(AccountEntity)
    private accountsRepository: Repository<AccountEntity>,
  ) {}

  async save(account: Account): Promise<void> {
    const accountEntity = AccountEntity.fromPrimitives(account.toPrimitives());

    const id = accountEntity.id;

    if (await this.existEntityWith(id)) {
      await this.accountsRepository.save(accountEntity);
    } else {
      await this.accountsRepository.update({ id }, accountEntity);
    }
  }

  async findOneById(accountId: AccountId): Promise<Account | undefined> {
    const accountEntity = await this.accountsRepository.findOneBy({
      id: accountId.getValue(),
    });

    if (accountEntity) {
      return AccountEntity.toDomain(accountEntity);
    }
  }

  async findOneByEmail(email: EmailAddress): Promise<Account | undefined> {
    const accountEntity = await this.accountsRepository.findOneBy({
      email: email.getValue(),
    });

    if (accountEntity) {
      return AccountEntity.toDomain(accountEntity);
    }
  }

  count(): Promise<number> {
    return this.accountsRepository.count();
  }

  private async existEntityWith(id: string): Promise<boolean> {
    return this.accountsRepository.countBy({ id }).then(Boolean);
  }
}
