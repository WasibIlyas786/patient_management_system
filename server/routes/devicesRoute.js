const express = require("express");
const multer = require("multer");
const {
  uploadDeviceData,
  uploadImages,
  getAllDevices,
  searchDevices,
  updateDevices,
  getDevice,
  addDevice,
  getCurrentDateReminders,
} = require("../controllers/devices.controller");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/remindersId", getCurrentDateReminders);
router.post("/upload", upload.single("file"), uploadDeviceData);
router.get("/", getAllDevices);
router.post("/", uploadImages, addDevice);
router.get("/search", searchDevices);
router.get("/:deviceID", getDevice);
router.patch("/update/:deviceID", uploadImages, updateDevices);

module.exports = router;
