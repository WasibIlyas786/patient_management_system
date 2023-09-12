-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "devicesId" TEXT,
    "imageURL" TEXT NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_devicesId_fkey" FOREIGN KEY ("devicesId") REFERENCES "devices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
