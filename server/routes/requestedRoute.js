const express = require("express");
const {
  addDeviceToRequested,
  getAllRequestedDevices,
  getOneRequestedDevice,
} = require("../controllers/requested.controller");

const router = express.Router();

router.get("/", getAllRequestedDevices);
router.post("/:deviceID", addDeviceToRequested);
router.get("/:deviceID", getOneRequestedDevice);
module.exports = router;
