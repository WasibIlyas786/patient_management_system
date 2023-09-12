const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addDeviceToDone = async (req, res) => {
  const { deviceID } = req.params;
  const { isDone } = req.body;

  const done = await prisma.devices.findUnique({
    where: {
      id: deviceID,
    },
  });

  if (!done)
    return res.json({
      message: "No result found!",
      error: true,
    });

  await prisma.devices.update({
    where: {
      id: deviceID,
    },
    data: {
      isDone,
    },
  });

  res.json({
    message: "Device added to done successfully",
    error: false,
  });
};

exports.getAllDoneDevices = async (req, res) => {
  const donesData = await prisma.devices.findMany({
    where: {
      isDone: true,
    },
    include: {
      images: true,
      reminders: true,
      notes: true,
    },
  });

  res.json({
    message: "Data populated successfully",
    error: false,
    data: {
      donesData,
    },
  });
};

exports.getOneDoneDevice = async (req, res) => {
  const { deviceID } = req.params;
  try {
    const done = await prisma.devices.findMany({
      where: {
        id: deviceID,
        isDone: true,
      },
      include: {
        images: true,
        reminders: true,
        notes: true,
      },
    });

    if (!done)
      return res.json({
        message: "No result found!",
        error: true,
      });

    res.json({
      message: "Data populated successfully",
      error: false,
      data: {
        done,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
