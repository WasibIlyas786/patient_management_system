const fs = require("fs-extra");
const multer = require("multer");
const path = require("path");
const { v4: uuid } = require("uuid");
const excelToJson = require("convert-excel-to-json");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { getTime } = require("../utils");
const { insertDevicesToDb, cleanKeys } = require("../utils");
const { error } = require("console");

const host = process.env.LOCAL_HOST;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + uuid() + path.extname(file.originalname));
  },
});

module.exports.uploadDeviceData = async (req, res) => {
  const { originalname, filename } = req.file;

  const file = await prisma.files.findMany({
    where: {
      name: originalname,
    },
  });

  if (file[0]?.name === originalname)
    return res.status(400).json({
      message: "File already exists!",
      error: true,
    });

  try {
    if (filename === null || filename === "undefined") {
      res.status(400).json({
        message: "No file found!",
        error: true,
      });
    } else if (path.extname(originalname) !== ".xlsx") {
      res.status(400).json({
        message: "Unsupported file type!",
        error: true,
      });
    } else {
      let filePath = "uploads/" + filename;

      const excelData = excelToJson({
        sourceFile: filePath,
        header: {
          rows: 1,
        },
        columnToKey: {
          "*": "{{columnHeader}}",
        },
      });

      fs.remove(filePath);

      const devicesData = await cleanKeys(excelData?.Sheet1);
      const doneData = await cleanKeys(excelData?.done);
      const requestedData = await cleanKeys(excelData?.requested);

      if (devicesData !== null) {
        await insertDevicesToDb(devicesData);
      }

      if (requestedData !== null) {
        await insertDevicesToDb(requestedData, true, true);
      }

      if (doneData !== null) {
        await insertDevicesToDb(doneData, true, true);
      }

      await prisma.files.create({
        data: {
          name: originalname,
        },
      });

      res.status(201).json({
        message: "Data uploaded successfully",
        error: false,
        devicesData,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.getAllDevices = async (req, res) => {
  try {
    const devices = await prisma.devices.findMany({
      include: {
        images: true,
        reminders: true,
        notes: true,
      },
    });

    if (!devices.length)
      return res.status(404).json({
        message: "No results found!",
        error: true,
      });

    res.status(200).json({
      message: "Data populated successfully",
      error: null,
      data: {
        devices,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.searchDevices = async (req, res) => {
  try {
    const { anlagenID, seriennr } = req.query;
    const device = await prisma.devices.findMany({
      where: {
        OR: [
          { anlagenID: anlagenID || undefined },
          { seriennr: seriennr || undefined },
        ],
      },
      include: {
        images: true,
        reminders: true,
        notes: true,
      },
    });

    if (!device)
      return res.status(404).json({
        message: "No result found!",
        error: true,
      });

    res.status(200).json({
      message: "Data populated successfully",
      error: false,
      data: {
        device,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getDevice = async (req, res) => {
  const { deviceID } = req.params;
  try {
    const device = await prisma.devices.findUnique({
      where: {
        id: deviceID,
      },
      include: {
        images: true,
        reminders: true,
        notes: true,
      },
    });

    if (!device)
      return res.status(404).json({
        message: "Device does not exists!",
        error: true,
      });

    res.status(200).json({
      message: "Data populated successfully",
      error: false,
      data: {
        device,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateDevices = async (req, res) => {
  const data = req.body;
  const isReq = data?.isRequested === "true";
  const isDone = data?.isDone === "true";
  const { deviceID } = req.params;
  const imageFiles = req.files;
  let images;
  if (req?.files.length) {
    images = {
      link1: `${host}${imageFiles[0]?.path}`,
      link2: `${host}${imageFiles[1]?.path}`,
      link3: `${host}${imageFiles[2]?.path}`,
      link4: `${host}${imageFiles[3]?.path}`,
    };
  }

  try {
    const device = await prisma.devices.findUnique({
      where: {
        id: deviceID,
      },
    });

    if (!device)
      return res.status(404).json({
        message: "Device does not exits!",
        error: true,
      });

    await prisma.devices.update({
      where: { id: deviceID },
      data: {
        anlagenID:
          `${data?.anlagenID}` !== "undefined"
            ? `${data?.anlagenID}`
            : device?.anlagenID,
        seriennr:
          `${data?.seriennr}` !== "undefined"
            ? `${data?.seriennr}`
            : device?.seriennr,
        gehortzu:
          `${data?.gehortzu}` !== "undefined"
            ? `${data?.gehortzu}`
            : device?.gehortzu,
        anlagenbez:
          `${data?.anlagenbez}` !== "undefined"
            ? `${data?.anlagenbez}`
            : device?.anlagenbez,
        typModell:
          `${data?.typModell}` !== "undefined"
            ? `${data?.typModell}`
            : device?.typModell,
        hersteller:
          `${data?.hersteller}` !== "undefined"
            ? `${data?.hersteller}`
            : device?.hersteller,
        lieferant:
          `${data?.lieferant}` !== "undefined"
            ? `${data?.lieferant}`
            : device?.lieferant,
        servicestelle:
          `${data?.servicestelle}` !== "undefined"
            ? `${data?.servicestelle}`
            : device?.servicestelle,
        abteilung:
          `${data?.abteilung}` !== "undefined"
            ? `${data?.abteilung}`
            : device?.abteilung,
        kostenstelle:
          `${data?.kostenstelle}` !== "undefined"
            ? `${data?.kostenstelle}`
            : device?.kostenstelle,
        SLA: `${data?.SLA}` !== "undefined" ? `${data?.SLA}` : device?.SLA,
        preisProSLA:
          `${data?.preisProSLA}` !== "undefined"
            ? `${data?.preisProSLA}`
            : device?.preisProSLA,
        status:
          `${data?.status}` !== "undefined"
            ? `${data?.status}`
            : device?.status,
        raumbezMT:
          `${data?.raumbezMT}` !== "undefined"
            ? `${data?.raumbezMT}`
            : device?.raumbezMT,
        contact:
          `${data?.contact}` !== "undefined"
            ? `${data?.contact}`
            : device?.contact,
        date: `${data?.date}` !== "undefined" ? `${data?.date}` : device?.date,
        email:
          `${data?.email}` !== "undefined" ? `${data?.email}` : device?.email,
        telephone:
          `${data?.telephone}` !== "undefined"
            ? `${data?.telephone}`
            : device?.telephone,
        companyName:
          `${data?.companyName}` !== "undefined"
            ? `${data?.companyName}`
            : device?.companyName,
        isRequested: isReq,
        isDone: isDone,
      },
    });

    await prisma.notes.create({
      data: {
        deviceId: deviceID,
        content: data?.content,
      },
    });

    const convertedTime = getTime(data?.time).split("T")[0];
    const currentTime = getTime().split("T")[0];

    await prisma.reminders.create({
      data: {
        time: convertedTime,
        isComing: convertedTime > currentTime ? true : false,
        message: data?.message,
        deviceId: deviceID,
      },
    });

    const deviceImages = await prisma.images.findMany({
      where: {
        deviceId: deviceID,
      },
    });

    if (deviceImages.length) {
      await prisma.images.updateMany({
        where: {
          deviceId: deviceID,
        },
        data: {
          imageURL: `${images?.link1}` || `${deviceImages[0]?.imageURL}`,
          imageURL: `${images?.link2}` || `${deviceImages[1]?.imageURL}`,
          imageURL: `${images?.link3}` || `${deviceImages[2]?.imageURL}`,
          imageURL: `${images?.link4}` || `${deviceImages[3]?.imageURL}`,
        },
      });
    } else if (req.files.length) {
      await prisma.images.createMany({
        data: [
          {
            deviceId: deviceID,
            imageURL: images?.link1 || device?.image[0]?.imageURL,
          },
          {
            deviceId: deviceID,
            imageURL: images?.link2 || device?.image[1]?.imageURL,
          },
          {
            deviceId: deviceID,
            imageURL: images?.link3 || device?.image[2]?.imageURL,
          },
          {
            deviceId: deviceID,
            imageURL: images?.link4 || device?.image[3]?.imageURL,
          },
        ],
      });
    }

    res.status(200).json({
      message: "Data updated successfully",
      error: false,
      device,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.addDevice = async (req, res) => {
  try {
    const isReq = req?.body?.isRequested === "true";
    const isDone = req?.body?.isDone === "true";

    // const imageFiles = req?.files;
    // const images = {
    //   link1: `${host}${imageFiles[0]?.path}`,
    //   link2: `${host}${imageFiles[1]?.path}`,
    //   link3: `${host}${imageFiles[2]?.path}`,
    //   link4: `${host}${imageFiles[3]?.path}`,
    // };

    const device = await prisma.devices.create({
      data: {
        anlagenID: `${req?.body?.anlagenID}` || null,
        seriennr: `${req?.body?.seriennr}` || null,
        gehortzu: `${req?.body?.gehortzu}` || null,
        anlagenbez: `${req?.body?.anlagenbez}` || null,
        typModell: `${req?.body?.typModell}` || null,
        hersteller: `${req?.body?.hersteller}` || null,
        lieferant: `${req?.body?.lieferant}` || null,
        servicestelle: `${req?.body?.servicestelle}` || null,
        abteilung: `${req?.body?.abteilung}` || null,
        kostenstelle: `${req?.body?.kostenstelle}` || null,
        SLA: `${req?.body?.SLA}` || null,
        preisProSLA: `${req?.body?.preisProSLA}` || null,
        status: `${req?.body?.status}` || null,
        raumbezMT: `${req?.body?.raumbezMT}` || null,
        contact: `${req?.body?.contact}` || null,
        date: `${req?.body?.date}` || null,
        email: `${req?.body?.email}` || null,
        telephone: `${req?.body?.telephone}` || null,
        companyName: `${req?.body?.companyName}` || null,
        isRequested: isReq === true ? isReq : false,
        isDone: isDone === true ? isDone : false,
      },
    });

    // if(req.files.length > 0){
    //   await prisma.images.createMany({
    //     data: [
    //       { deviceId: device.id, imageURL: images?.link1 },
    //       { deviceId: device.id, imageURL: images?.link2 },
    //       { deviceId: device.id, imageURL: images?.link3 },
    //       { deviceId: device.id, imageURL: images?.link4 },
    //     ],
    //   });
    // }

    res.json({
      message: "Device created successfully!",
      error: false,
      data: {
        device,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
      error: true,
    });
  }
};

module.exports.getCurrentDateReminders = async (req, res) => {
  try {
    const currentDate = new Date().toISOString().split("T")[0];

    const devicesWithCurrentDateReminder = await prisma.devices.findMany({
      where: {
        reminders: {
          some: {
            time: {
              gte: currentDate,
              lt: `${new Date(
                new Date(currentDate).getTime() + 24 * 60 * 60 * 1000
              )}`,
            },
          },
        },
      },
    });

    res.json({
      data: devicesWithCurrentDateReminder,
      message: "success",
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
      error: true,
    });
  }
};

module.exports.uploadImages = multer({
  storage,
  limits: { fileSize: "100000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /png|jpg|jpeg/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper file size");
  },
}).array("images", 4);
