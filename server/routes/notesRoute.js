const express = require("express");
const {
  createOrUpdateNote,
  getNotes,
} = require("../controllers/notes.controller");

const router = express.Router();

router.post("/", createOrUpdateNote);
router.get("/", getNotes);

module.exports = router;
