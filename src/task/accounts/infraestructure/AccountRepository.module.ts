import { Module } from '@nestjs/common';
import { ACCOUNT_REPOSITORY_TOKEN } from '../domain/AccountRepository';
import { AccountRepositoryTypeORM } from './AccountRepositoryTypeORM';

@Module({
  controllers: [],
  providers: [
    {
      provide: ACCOUNT_REPOSITORY_TOKEN,
      useClass: AccountRepositoryTypeORM,
    },
  ],
  exports: [ACCOUNT_REPOSITORY_TOKEN],
})
export class AccountRepositoryModule {}
