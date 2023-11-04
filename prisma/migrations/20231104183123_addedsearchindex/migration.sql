-- CreateIndex
CREATE FULLTEXT INDEX `Image_name_description_idx` ON `Image`(`name`, `description`);

-- CreateIndex
CREATE FULLTEXT INDEX `Location_name_idx` ON `Location`(`name`);

-- CreateIndex
CREATE FULLTEXT INDEX `Trip_name_description_idx` ON `Trip`(`name`, `description`);
