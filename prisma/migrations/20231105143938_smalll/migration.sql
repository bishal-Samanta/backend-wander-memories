-- CreateTable
CREATE TABLE `_LocationToTrip` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_LocationToTrip_AB_unique`(`A`, `B`),
    INDEX `_LocationToTrip_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_LocationToTrip` ADD CONSTRAINT `_LocationToTrip_A_fkey` FOREIGN KEY (`A`) REFERENCES `Location`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LocationToTrip` ADD CONSTRAINT `_LocationToTrip_B_fkey` FOREIGN KEY (`B`) REFERENCES `Trip`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
