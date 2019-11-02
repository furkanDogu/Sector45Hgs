import { MigrationInterface, QueryRunner } from 'typeorm';

export class WholeDb1572379883335 implements MigrationInterface {
    name = 'wholeDb1572379883335';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `CREATE TABLE "operation" ("operationId" int NOT NULL IDENTITY(1,1), "amount" money NOT NULL, "cardCardId" int, CONSTRAINT "PK_10583e3e1a51213835fa630e69a" PRIMARY KEY ("operationId"))`,
            undefined
        );
        await queryRunner.query(
            `CREATE TABLE "subscriber" ("subscriberId" int NOT NULL IDENTITY(1,1), "TCKN" varchar(11) NOT NULL, CONSTRAINT "UQ_d2d154eedd3631cc6f2ec16054e" UNIQUE ("TCKN"), CONSTRAINT "PK_9460ca261a17e14cb614c992b4d" PRIMARY KEY ("subscriberId"))`,
            undefined
        );
        await queryRunner.query(
            `CREATE TABLE "card" ("cardId" int NOT NULL IDENTITY(1,1), "balance" money NOT NULL, "subscriberSubscriberId" int, CONSTRAINT "PK_da6bb682664de7601d3f1a7cc5d" PRIMARY KEY ("cardId"))`,
            undefined
        );
        await queryRunner.query(
            `CREATE TABLE "employee" ("employeeId" int NOT NULL IDENTITY(1,1), "username" varchar(250) NOT NULL, "password" varchar(250) NOT NULL, CONSTRAINT "UQ_389fe2fe09430efb8eabc4e1b6e" UNIQUE ("username"), CONSTRAINT "PK_cd21151b14974c7a24e8c24df28" PRIMARY KEY ("employeeId"))`,
            undefined
        );
        await queryRunner.query(
            `ALTER TABLE "operation" ADD CONSTRAINT "FK_fe388b6851bfbf57e67f417ae9e" FOREIGN KEY ("cardCardId") REFERENCES "card"("cardId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
            undefined
        );
        await queryRunner.query(
            `ALTER TABLE "card" ADD CONSTRAINT "FK_9e6d28323127e3a9790e421f3d9" FOREIGN KEY ("subscriberSubscriberId") REFERENCES "subscriber"("subscriberId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
            undefined
        );
        await queryRunner.query(
            `ALTER TABLE "operation" ADD "date" datetime2 NOT NULL CONSTRAINT "DF_216892e6685901e56fa7355df65" DEFAULT getdate()`,
            undefined
        );

        await queryRunner.query(
            `INSERT INTO employee VALUES ('furkan', '$2b$11$tan3.53wCtz.gQi3a2Oy.OVN7/ucua2KXS0pouB/W5XH0OBTjHtsq')`,
            undefined
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `ALTER TABLE "card" DROP CONSTRAINT "FK_9e6d28323127e3a9790e421f3d9"`,
            undefined
        );
        await queryRunner.query(
            `ALTER TABLE "operation" DROP CONSTRAINT "FK_fe388b6851bfbf57e67f417ae9e"`,
            undefined
        );
        await queryRunner.query(
            `ALTER TABLE "operation" DROP CONSTRAINT "DF_216892e6685901e56fa7355df65"`,
            undefined
        );
        await queryRunner.query(`ALTER TABLE "operation" DROP COLUMN "date"`, undefined);
        await queryRunner.query(`DROP TABLE "employee"`, undefined);
        await queryRunner.query(`DROP TABLE "card"`, undefined);
        await queryRunner.query(`DROP TABLE "subscriber"`, undefined);
        await queryRunner.query(`DROP TABLE "operation"`, undefined);
    }
}
