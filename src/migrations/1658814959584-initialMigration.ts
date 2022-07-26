import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1658814959584 implements MigrationInterface {
    name = 'initialMigration1658814959584'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    }

}
