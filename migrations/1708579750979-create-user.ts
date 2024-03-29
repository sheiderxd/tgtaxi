import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1708579750979 implements MigrationInterface {
  name = "CreateUser1708579750979";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "role" character varying NOT NULL, "resetPasswordToken" character varying, "refreshToken" character varying, "encryptionHash" character varying NOT NULL, "encryptedPassword" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
