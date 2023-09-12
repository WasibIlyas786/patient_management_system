const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addDeviceToRequested = async (req, res) => {
  const { deviceID } = req.params;
  const { isRequested } = req.body;

  const findRequested = await prisma.devices.findUnique({
    where: {
      id: deviceID,
    },
  });

  if (!findRequested)
    return res.json({
      message: "No result found!",
      error: true,
    });

  const requested = await prisma.devices.update({
    data: {
      isRequested,
    },
    where: {
      id: deviceID,
    },
  });

  res.json({
    message: "Device added to requested successfully",
    error: false,
    data: {
      requested,
    },
  });
};

exports.getAllRequestedDevices = async (req, res) => {
  const requestedData = await prisma.devices.findMany({
    where: {
      isRequested: true,
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
      requestedData,
    },
  });
};

exports.getOneRequestedDevice = async (req, res) => {
  const { deviceID } = req.params;
  try {
    const requestedData = await prisma.devices.findMany({
      where: {
        id: deviceID,
        isRequested: true,
      },
      include: {
        images: true,
        reminders: true,
        notes: true,
      },
    });

    if (!requestedData)
      return res.json({
        message: "No result found!",
        error: true,
      });

    res.json({
      message: "Data populated successfully",
      error: false,
      data: {
        requestedData,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
