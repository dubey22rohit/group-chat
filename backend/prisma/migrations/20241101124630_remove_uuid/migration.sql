/*
  Warnings:

  - The primary key for the `chat_groups` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `chat_groups` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `chats` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `chats` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `group_id` on the `chats` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `group_id` on the `group_users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "chats" DROP CONSTRAINT "chats_group_id_fkey";

-- DropForeignKey
ALTER TABLE "group_users" DROP CONSTRAINT "group_users_group_id_fkey";

-- AlterTable
ALTER TABLE "chat_groups" DROP CONSTRAINT "chat_groups_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "chat_groups_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "chats" DROP CONSTRAINT "chats_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "group_id",
ADD COLUMN     "group_id" INTEGER NOT NULL,
ADD CONSTRAINT "chats_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "group_users" DROP COLUMN "group_id",
ADD COLUMN     "group_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "group_users" ADD CONSTRAINT "group_users_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "chat_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "chat_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
