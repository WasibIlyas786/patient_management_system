-- CreateTable
CREATE TABLE "devices" (
    "id" SERIAL NOT NULL,
    "anlagenID" TEXT,
    "seriennr" TEXT,
    "gehortzu" TEXT,
    "anlagenbez" TEXT,
    "typModell" TEXT,
    "hersteller" TEXT,
    "lieferant" TEXT,
    "servicestelle" TEXT,
    "abteilung" TEXT,
    "kostenstelle" INTEGER,
    "SLA" TEXT,
    "preisProSLA" INTEGER,
    "status" TEXT,
    "raumbezMT" TEXT,
    "contact" INTEGER,
    "date" TIMESTAMP(3),
    "email" TEXT,
    "telephone" INTEGER,
    "companyName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "devices_pkey" PRIMARY KEY ("id")
);
