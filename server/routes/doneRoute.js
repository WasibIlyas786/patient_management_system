const express = require("express");
const {
  getAllDoneDevices,
  addDeviceToDone,
  getOneDoneDevice,
} = require("../controllers/done.controller");

const router = express.Router();

router.get("/", getAllDoneDevices);
router.post("/:deviceID", addDeviceToDone);
router.get("/:deviceID", getOneDoneDevice);
module.exports = router;
