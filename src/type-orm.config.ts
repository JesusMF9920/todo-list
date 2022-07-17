import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from './config';
import { AccountEntity } from './task/accounts/infraestructure/AccountRepositoryTypeORM/Account.entity';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  entities: [AccountEntity],
  synchronize: true,
  migrations: ['migrations/*.js'],
};

export default typeOrmConfig;

// TODO: Add to app Modules