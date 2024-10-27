-- DropIndex
DROP INDEX "refresh_id_key";

-- AlterTable
CREATE SEQUENCE refresh_id_seq;
ALTER TABLE "refresh" ALTER COLUMN "id" SET DEFAULT nextval('refresh_id_seq'),
ADD CONSTRAINT "refresh_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE refresh_id_seq OWNED BY "refresh"."id";
