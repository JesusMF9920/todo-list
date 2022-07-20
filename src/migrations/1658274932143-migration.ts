import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1658274932143 implements MigrationInterface {
  name = 'migration1658274932143';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "accounts" ADD "accountType" character varying NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "accountType"`);
  }
}
