/*
  Warnings:

  - You are about to drop the column `additionalFilesUploadDate` on the `SchoolDocument` table. All the data in the column will be lost.
  - You are about to drop the column `additionalResultsFiles` on the `SchoolDocument` table. All the data in the column will be lost.
  - You are about to drop the column `schoolId` on the `SchoolDocument` table. All the data in the column will be lost.
  - You are about to drop the column `admissionFeeDistribution` on the `SchoolInfo` table. All the data in the column will be lost.
  - You are about to drop the column `feesBoardingDistributionJson` on the `SchoolInfo` table. All the data in the column will be lost.
  - You are about to drop the column `feesDayDistributionJson` on the `SchoolInfo` table. All the data in the column will be lost.
  - You are about to drop the `PromotionHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `student_councils` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `PromotionHistory` DROP FOREIGN KEY `PromotionHistory_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `student_councils` DROP FOREIGN KEY `student_councils_studentId_fkey`;

-- DropIndex
DROP INDEX `SchoolDocument_schoolId_idx` ON `SchoolDocument`;

-- AlterTable
ALTER TABLE `SchoolDocument` DROP COLUMN `additionalFilesUploadDate`,
    DROP COLUMN `additionalResultsFiles`,
    DROP COLUMN `schoolId`,
    ADD COLUMN `admissionFeeDescription` TEXT NULL,
    ADD COLUMN `admissionFeeDistribution` JSON NULL,
    ADD COLUMN `admissionFeeYear` INTEGER NULL,
    ADD COLUMN `curriculumDescription` TEXT NULL,
    ADD COLUMN `curriculumYear` INTEGER NULL,
    ADD COLUMN `feesBoardingDescription` TEXT NULL,
    ADD COLUMN `feesBoardingDistributionJson` JSON NULL,
    ADD COLUMN `feesBoardingYear` INTEGER NULL,
    ADD COLUMN `feesDayDescription` TEXT NULL,
    ADD COLUMN `feesDayDistributionJson` JSON NULL,
    ADD COLUMN `feesDayYear` INTEGER NULL,
    ADD COLUMN `form1ResultsDescription` TEXT NULL,
    ADD COLUMN `form1ResultsTerm` VARCHAR(50) NULL,
    ADD COLUMN `form2ResultsDescription` TEXT NULL,
    ADD COLUMN `form2ResultsTerm` VARCHAR(50) NULL,
    ADD COLUMN `form3ResultsDescription` TEXT NULL,
    ADD COLUMN `form3ResultsTerm` VARCHAR(50) NULL,
    ADD COLUMN `form4ResultsDescription` TEXT NULL,
    ADD COLUMN `form4ResultsTerm` VARCHAR(50) NULL,
    ADD COLUMN `kcseDescription` TEXT NULL,
    ADD COLUMN `kcseTerm` VARCHAR(50) NULL,
    ADD COLUMN `mockExamsDescription` TEXT NULL,
    ADD COLUMN `mockExamsTerm` VARCHAR(50) NULL;

-- AlterTable
ALTER TABLE `SchoolInfo` DROP COLUMN `admissionFeeDistribution`,
    DROP COLUMN `feesBoardingDistributionJson`,
    DROP COLUMN `feesDayDistributionJson`,
    ADD COLUMN `form1ResultsTerm` VARCHAR(50) NULL,
    ADD COLUMN `form2ResultsTerm` VARCHAR(50) NULL,
    ADD COLUMN `form3ResultsTerm` VARCHAR(50) NULL,
    ADD COLUMN `form4ResultsTerm` VARCHAR(50) NULL,
    ADD COLUMN `kcseTerm` VARCHAR(50) NULL,
    ADD COLUMN `mockExamsTerm` VARCHAR(50) NULL;

-- DropTable
DROP TABLE `PromotionHistory`;

-- DropTable
DROP TABLE `Student`;

-- DropTable
DROP TABLE `student_councils`;

-- CreateTable
CREATE TABLE `AdditionalDocument` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `schoolDocumentId` INTEGER NOT NULL,
    `filename` VARCHAR(255) NOT NULL,
    `filepath` TEXT NOT NULL,
    `filetype` VARCHAR(50) NOT NULL,
    `description` TEXT NULL,
    `year` INTEGER NULL,
    `term` VARCHAR(50) NULL,
    `filesize` INTEGER NULL,
    `uploadedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `AdditionalDocument_schoolDocumentId_idx`(`schoolDocumentId`),
    INDEX `AdditionalDocument_year_idx`(`year`),
    INDEX `AdditionalDocument_filetype_idx`(`filetype`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `SchoolDocument_curriculumYear_idx` ON `SchoolDocument`(`curriculumYear`);

-- CreateIndex
CREATE INDEX `SchoolDocument_feesDayYear_idx` ON `SchoolDocument`(`feesDayYear`);

-- CreateIndex
CREATE INDEX `SchoolDocument_feesBoardingYear_idx` ON `SchoolDocument`(`feesBoardingYear`);

-- CreateIndex
CREATE INDEX `SchoolDocument_admissionFeeYear_idx` ON `SchoolDocument`(`admissionFeeYear`);

-- CreateIndex
CREATE INDEX `SchoolDocument_form1ResultsYear_idx` ON `SchoolDocument`(`form1ResultsYear`);

-- CreateIndex
CREATE INDEX `SchoolDocument_form2ResultsYear_idx` ON `SchoolDocument`(`form2ResultsYear`);

-- CreateIndex
CREATE INDEX `SchoolDocument_form3ResultsYear_idx` ON `SchoolDocument`(`form3ResultsYear`);

-- CreateIndex
CREATE INDEX `SchoolDocument_form4ResultsYear_idx` ON `SchoolDocument`(`form4ResultsYear`);

-- CreateIndex
CREATE INDEX `SchoolDocument_mockExamsYear_idx` ON `SchoolDocument`(`mockExamsYear`);

-- AddForeignKey
ALTER TABLE `AdditionalDocument` ADD CONSTRAINT `AdditionalDocument_schoolDocumentId_fkey` FOREIGN KEY (`schoolDocumentId`) REFERENCES `SchoolDocument`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
