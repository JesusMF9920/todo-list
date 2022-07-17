import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from '../type-orm.config';

@Module({})
export class TypeOrmSwitcherModule {
  static init({ disable }: { disable: boolean }): DynamicModule {
    if (disable) {
      return {
        module: TypeOrmSwitcherModule,
      };
    }

    return {
      module: TypeOrmSwitcherModule,
      imports: [TypeOrmModule.forRoot(typeOrmConfig)],
    };
  }
}
