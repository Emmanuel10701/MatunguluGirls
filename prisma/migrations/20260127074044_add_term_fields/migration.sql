-- AlterTable
ALTER TABLE `SchoolDocument` ADD COLUMN `admissionFeeTerm` VARCHAR(50) NULL,
    ADD COLUMN `curriculumTerm` VARCHAR(50) NULL,
    ADD COLUMN `feesBoardingTerm` VARCHAR(50) NULL,
    ADD COLUMN `feesDayTerm` VARCHAR(50) NULL;

-- CreateIndex
CREATE INDEX `SchoolDocument_curriculumTerm_idx` ON `SchoolDocument`(`curriculumTerm`);

-- CreateIndex
CREATE INDEX `SchoolDocument_feesDayTerm_idx` ON `SchoolDocument`(`feesDayTerm`);

-- CreateIndex
CREATE INDEX `SchoolDocument_feesBoardingTerm_idx` ON `SchoolDocument`(`feesBoardingTerm`);

-- CreateIndex
CREATE INDEX `SchoolDocument_admissionFeeTerm_idx` ON `SchoolDocument`(`admissionFeeTerm`);
