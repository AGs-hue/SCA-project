/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePackagesTable1620984599223 implements MigrationInterface {
  name = 'CreatePackagesTable1620984599223';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        CREATE TABLE "packages" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "reference" character varying(255) NOT NULL,
            "status" character varying NOT NULL,
            "dimensions" character varying,
            "meta" jsonb,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_020801f620e21f943ead9311c98" PRIMARY KEY ("id")
        );
        
        COMMENT ON COLUMN "packages"."reference" IS 'The unique package reference';
        COMMENT ON COLUMN "packages"."meta" IS 'The data object from the bank provider'
      `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_a05b2f82565aff072172769a9f" ON "packages" ("reference") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_a05b2f82565aff072172769a9f"`);
    await queryRunner.query(`DROP TABLE "packages"`);
  }
}
