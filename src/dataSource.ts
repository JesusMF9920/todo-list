import { DataSource } from 'typeorm';
import { config } from './config';
import { AccountEntity } from './task/accounts/infraestructure/AccountRepositoryTypeORM/Account.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  entities: [AccountEntity],
  synchronize: true,
  migrations: ['src/migrations/*.ts'],
});

export default AppDataSource;
