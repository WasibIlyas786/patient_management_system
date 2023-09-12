const express = require("express");
const compression = require("compression");
const cors = require("cors");
const devicesRoute = require("./routes/devicesRoute");
const notesRoute = require("./routes/notesRoute");
const requestedRoute = require("./routes/requestedRoute");
const doneRoute = require("./routes/doneRoute");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(compression());

app.use("/api/devices", devicesRoute);
app.use("/api/devices", notesRoute);
app.use("/api/notes", notesRoute);
app.use("/api/requested", requestedRoute);
app.use("/api/done", doneRoute);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`The server is running on:${port}`);
});
