const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getTime = (time = "") => {
  if (time) {
    const date = new Date(time);
    return date.toISOString();
  } else {
    const date = new Date(Date.now());
    return date.toISOString();
  }
};

const insertDevicesToDb = async (
  devicesData,
  isReq,
  isDone,
  batchSize = 200
) => {
  if (devicesData.length > 200) {
    for (let i = 0; i < devicesData.length; i += batchSize) {
      const batch = devicesData.slice(i, i + batchSize);
      await prisma.devices.createMany({
        data: batch?.map((obj) => ({
          anlagenID:
            `${obj?.anlagenid}` !== "undefined" ? `${obj?.anlagenid}` : null,
          seriennr:
            `${obj?.seriennr}` !== "undefined" ? `${obj?.seriennr}` : null,
          gehortzu:
            `${obj?.gehortzu}` !== "undefined" ? `${obj?.gehortzu}` : null,
          anlagenbez:
            `${obj?.anlagenbez}` !== "undefined" ? `${obj?.anlagenbez}` : null,
          typModell:
            `${obj?.typmodell}` !== "undefined" ? `${obj?.typmodell}` : null,
          hersteller:
            `${obj?.hersteller}` !== "undefined" ? `${obj?.hersteller}` : null,
          lieferant:
            `${obj?.lieferant}` !== "undefined" ? `${obj?.lieferant}` : null,
          servicestelle:
            `${obj?.servicestelle}` !== "undefined"
              ? `${obj?.servicestelle}`
              : null,
          abteilung:
            `${obj?.abteilung}` !== "undefined" ? `${obj?.abteilung}` : null,
          kostenstelle:
            `${obj?.kostenstelle}` !== "undefined"
              ? `${obj?.kostenstelle}`
              : null,
          SLA: `${obj?.sla}` !== "undefined" ? `${obj?.sla}` : null,
          preisProSLA:
            `${obj?.preisprosla}` !== "undefined"
              ? `${obj?.preisprosla}`
              : null,
          status: `${obj?.status}` !== "undefined" ? `${obj?.status}` : null,
          raumbezMT:
            `${obj?.raumbezmt}` !== "undefined" ? `${obj?.raumbezmt}` : null,
          contact: `${obj?.contact}` !== "undefined" ? `${obj?.contact}` : null,
          date: `${obj?.date}` !== "undefined" ? `${obj?.date}` : null,
          email: `${obj?.email}` !== "undefined" ? `${obj?.email}` : null,
          telephone:
            `${obj?.telephone}` !== "undefined" ? `${obj?.telephone}` : null,
          companyName:
            `${obj?.companyName}` !== "undefined"
              ? `${obj?.companyName}`
              : null,
          isRequested: isReq === true ? isReq : false,
          isDone: isDone === true ? isDone : false,
        })),
      });
    }
  } else {
    await prisma.devices.createMany({
      data: devicesData?.map((obj) => ({
        anlagenID:
          `${obj?.anlagenid}` !== "undefined" ? `${obj?.anlagenid}` : null,
        seriennr:
          `${obj?.seriennr}` !== "undefined" ? `${obj?.seriennr}` : null,
        gehortzu:
          `${obj?.gehortzu}` !== "undefined" ? `${obj?.gehortzu}` : null,
        anlagenbez:
          `${obj?.anlagenbez}` !== "undefined" ? `${obj?.anlagenbez}` : null,
        typModell:
          `${obj?.typmodell}` !== "undefined" ? `${obj?.typmodell}` : null,
        hersteller:
          `${obj?.hersteller}` !== "undefined" ? `${obj?.hersteller}` : null,
        lieferant:
          `${obj?.lieferant}` !== "undefined" ? `${obj?.lieferant}` : null,
        servicestelle:
          `${obj?.servicestelle}` !== "undefined"
            ? `${obj?.servicestelle}`
            : null,
        abteilung:
          `${obj?.abteilung}` !== "undefined" ? `${obj?.abteilung}` : null,
        kostenstelle:
          `${obj?.kostenstelle}` !== "undefined"
            ? `${obj?.kostenstelle}`
            : null,
        SLA: `${obj?.sla}` !== "undefined" ? `${obj?.sla}` : null,
        preisProSLA:
          `${obj?.preisprosla}` !== "undefined" ? `${obj?.preisprosla}` : null,
        status: `${obj?.status}` !== "undefined" ? `${obj?.status}` : null,
        raumbezMT:
          `${obj?.raumbezmt}` !== "undefined" ? `${obj?.raumbezmt}` : null,
        contact: `${obj?.contact}` !== "undefined" ? `${obj?.contact}` : null,
        date: `${obj?.date}` !== "undefined" ? `${obj?.date}` : null,
        email: `${obj?.email}` !== "undefined" ? `${obj?.email}` : null,
        telephone:
          `${obj?.telephone}` !== "undefined" ? `${obj?.telephone}` : null,
        companyName:
          `${obj?.companyName}` !== "undefined" ? `${obj?.companyName}` : null,
        isRequested: isReq === true ? isReq : false,
        isDone: isDone === true ? isDone : false,
      })),
    });
  }
};

async function cleanKeys(data) {
  return data.map((obj) => {
    const cleanedObj = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const cleanedKey = key
          .replace(/\s/g, "")
          .replace(/\//g, "")
          .replace(/\./g, "")
          .replace(/\+/g, "")
          .replace(/-/g, "")
          .replace(/__/g, "")
          .replace(/!/g, "")
          .replace(/#/g, "")
          .replace(/'/g, "")
          .replace(/[^A-Za-z0-9_]/g, "")
          .toLowerCase();
        cleanedObj[cleanedKey] = obj[key];
      }
    }
    return cleanedObj;
  });
}

module.exports = {
  insertDevicesToDb,
  getTime,
  cleanKeys,
};
