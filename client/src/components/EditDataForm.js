import React, { useState, useEffect } from "react";

import { toast, ToastContainer } from "react-toastify";
import { FileUploader } from "react-drag-drop-files";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import "../styles.css";

import { Modal, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function EditDataForm({
  open,
  setOpen,
  deviceIdToUpdateData,
  darkMode,
  setShowRequestedModal,
}) {
  const [seriennr, setSeriennr] = useState("");
  const [anlagenId, setAnlagenId] = useState("");
  const [contact, setContact] = useState("");
  const [deviceDate, setDeviceDate] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [reminderIsComing, setReminderIsComing] = useState("");
  const [notes, setNotes] = useState("");
  const [isRequested, setIsRequested] = useState("");
  const [isDone, setIsDone] = useState("");

  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");

  const getAndSetData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/devices/${deviceIdToUpdateData}`
      );
      const deviceData = response.data.data.device;

      setSeriennr(
        deviceData?.seriennr !== "undefined" ? deviceData.seriennr : ""
      );
      setAnlagenId(
        deviceData?.anlagenID !== "undefined" ? deviceData.anlagenID : ""
      );
      setContact(deviceData?.contact !== "undefined" ? deviceData.contact : "");
      setDeviceDate(deviceData?.date !== "undefined" ? deviceData.date : "");
      setEmail(deviceData?.email !== "undefined" ? deviceData.email : "");
      setCompanyName(
        deviceData?.companyName !== "undefined" ? deviceData.companyName : ""
      );
      setTelephone(
        deviceData?.telephone !== "undefined" ? deviceData.telephone : ""
      );
      setNotes(deviceData?.notes !== "undefined" ? deviceData.notes : "");
      setReminderDate(
        deviceData?.reminders[0]?.time !== "undefined"
          ? deviceData.reminders[0]?.time
          : ""
      );
      setDeviceDate(deviceData?.date);
      setReminderIsComing(deviceData?.reminders[0]?.isComing);
      setIsRequested(deviceData?.isRequested);
      setIsDone(deviceData?.isDone);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("images", image1);
      formData.append("images", image2);
      formData.append("images", image3);
      formData.append("images", image4);

      formData.append("seriennr", seriennr);
      formData.append("anlagenID", anlagenId);
      formData.append("contact", contact);
      formData.append("date", deviceDate);
      formData.append("email", email);
      formData.append("companyName", companyName);
      formData.append("telephone", telephone);
      formData.append("content", notes);
      formData.append("time", reminderDate);

      const response = await axios.patch(
        `http://localhost:8080/api/devices/update/${deviceIdToUpdateData}`,
        formData
      );
      // const responseNotes = await axios.patch(`http://localhost:8080/api/devices/${deviceIdToUpdateData}/notes`,{content:notes,title:"notes"});
      setShowRequestedModal(!response.data.device.isRequested);
      setOpen(false);
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    }
  };

  const fileTypes = ["JPG", "PNG", "JPEG"];
  useEffect(() => {
    getAndSetData();
  }, [deviceIdToUpdateData]);

  const formContainerClass = darkMode
    ? "form-container dark"
    : "form-container";

  return (
    <Modal
      open={open}
      // onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className={formContainerClass}>
        <div className={darkMode ? "black_container" : "light-container"}>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              height: "13px",
              "&:hover svg": {
                cursor: "pointer",
                color: "red", // Change the color to your desired color
              },
            }}
            onClick={() => setOpen(false)}
          >
            <CloseIcon />
          </Box>
          <h2 className="form-heading">Add Requested Information</h2>
          <div className="field-row">
            <div className="form-field">
              <label htmlFor="field1">ANLAGEN-ID</label>
              <input
                type="text"
                id="field1"
                className={darkMode ? "text-input dark" : "text-input"}
                value={anlagenId}
                placeholder="ID"
                onChange={(e) => setAnlagenId(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="field2">SERIENNR</label>
              <input
                type="text"
                className={darkMode ? "text-input dark" : "text-input"}
                id="field2"
                placeholder="Sr. No"
                value={seriennr}
                onChange={(e) => setSeriennr(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="field3">Contact:</label>
              <input
                type="text"
                id="field3"
                className={darkMode ? "text-input dark" : "text-input"}
                placeholder="+42-__-___"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
          </div>
          <div className="field-row">
            <div className="form-field">
              <label htmlFor="field4">Date:</label>
              <input
                type="text"
                id="field4"
                className={darkMode ? "text-input dark" : "text-input"}
                value={deviceDate}
                placeholder="mm/dd/yy"
                onChnage={(e) => setDeviceDate(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="field5">Email:</label>
              <input
                type="text"
                id="field5"
                className={darkMode ? "text-input dark" : "text-input"}
                placeholder="abc@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="field6">Telephone No.</label>
              <input
                type="text"
                id="field6"
                className={darkMode ? "text-input dark" : "text-input"}
                placeholder="+42-__-___"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
            </div>
          </div>
          <div className="recommend-container">
            <div>
              <label htmlFor="field5">Company:</label>
              <input
                type="text"
                id="field5"
                className={darkMode ? "text-input dark" : "text-input"}
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
          </div>

          <div className="recommend-container">
            <h3
            // className={
            //   darkMode ? "recommend-heading dark" : "recommend-heading"
            // }
            >
              Remind Me
            </h3>
            <div className="recommend-content">
              <input
                className="calendar"
                type="date"
                id="calendar"
                value={reminderDate}
                onChange={(e) => setReminderDate(e.target.value)}
              />
              <input
                type="checkbox"
                id="popup"
                value={reminderIsComing}
                onChange={(e) => setReminderIsComing(e.target.checked)}
              />
              <label htmlFor="popup">Do you want Pop Up?</label>
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="notes">Notes:</label>
            <textarea
              id="notes"
              value={notes}
              className={darkMode ? "text-input dark" : "text-input"}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
          <div className="image-upload-container">
            <label htmlFor="notes">Select File Path: </label>
            <div className="image-upload-row">
              <div className="image-upload">
                <div className="App">
                  <FileUploader
                    handleChange={(file) => setImage1(file)}
                    value={image1}
                    name="file"
                    types={fileTypes}
                  />
                </div>
              </div>
              <div className="image-upload">
                <div>
                  <FileUploader
                    handleChange={(file) => setImage2(file)}
                    value={image2}
                    name="file"
                    types={fileTypes}
                  />
                </div>
              </div>
            </div>
            <div className="image-upload-row">
              <div className="image-upload">
                <div className="App">
                  <FileUploader
                    handleChange={(file) => setImage3(file)}
                    value={image3}
                    name="file"
                    types={fileTypes}
                  />
                </div>
              </div>
              <div className="image-upload">
                <div className="App">
                  <FileUploader
                    handleChange={(file) => setImage4(file)}
                    value={image4}
                    name="file"
                    types={fileTypes}
                  />
                </div>
              </div>
            </div>
          </div>
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>

          {/* <Button variant="contained" onClick={() => setOpen(false)}>
          Close
        </Button> */}
        </div>
      </div>
    </Modal>
  );
}

export default EditDataForm;
