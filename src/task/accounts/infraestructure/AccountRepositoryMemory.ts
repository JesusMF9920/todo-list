import { Injectable } from '@nestjs/common';
import { AccountId } from '../../shared/domain/ids/AccountId';
import { Account } from '../domain/Account';
import { AccountRepository } from '../domain/AccountRepository';
import { EmailAddress } from '../domain/EmailAddress';

@Injectable()
export class AccountRepositoryMemory implements AccountRepository {
  public accounts: Account[] = [];

  private clone(account: Account): Account {
    return Account.fromPrimitives(account.toPrimitives());
  }

  async save(account: Account): Promise<void> {
    const index = this.accounts.findIndex((a) => a.hasId(account.getId()));
    if (index < 0) {
      this.accounts.push(account);
    } else {
      this.accounts[index] = account;
    }
  }

  async findOneById(accountId: AccountId): Promise<Account> {
    const account = this.accounts.find((a) => a.hasId(accountId));
    return account ? this.clone(account) : undefined;
  }

  async findOneByEmail(email: EmailAddress): Promise<Account> {
    return this.accounts.find((account) => account.getEmail().equals(email));
  }

  async count(): Promise<number> {
    return this.accounts.length;
  }
}
