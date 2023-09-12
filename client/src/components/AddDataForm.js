import React, { useState } from "react";

import { Modal, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "../AddDataForm.css";

import axios from "axios";

function AddDataForm({ setOpenAddDataForm, openAddDataForm, darkMode }) {
  const [seriennr, setSeriennr] = useState("");
  const [gehortzu, setGehortzu] = useState("");
  const [anlagenID, setAnlagenID] = useState("");
  const [anlagenbez, setAnlagenbez] = useState("");
  const [typModell, setTypModell] = useState("");
  const [hersteller, setHersteller] = useState("");
  const [lieferant, setLieferant] = useState("");
  const [servicestelle, setServicestelle] = useState("");
  const [abteilung, setAbteilung] = useState("");
  const [kostenstelle, setKostenstelle] = useState("");
  const [SLA, setSLA] = useState("");
  const [preisProSLA, setpreisProSLA] = useState("");
  const [status, setStatus] = useState("");
  const [raumbezMT, setRaumbezMT] = useState("");

  const hanldleSumitForm = async () => {
    try {
      const reqData = {
        seriennr,
        gehortzu,
        anlagenID,
        anlagenbez,
        typModell,
        hersteller,
        lieferant,
        servicestelle,
        abteilung,
        kostenstelle,
        SLA,
        preisProSLA,
        status,
        raumbezMT,
      };
      if (!reqData.anlagenID) {
        return toast.error("Anlagen-ID Should not be empty");
      }
      const response = await axios.post(
        "http://localhost:8080/api/devices",
        reqData
      );

      setOpenAddDataForm(false);
      !!response.data && toast.success("Data is added successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <Modal
      open={openAddDataForm}
      // onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className={darkMode ? "dark-mode data-form" : "light-mode data-form"}
      >
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
            "&:hover svg": {
              cursor: "pointer",
              color: "red", // Change the color to your desired color
            },
          }}
          onClick={() => setOpenAddDataForm(false)}
        >
          <CloseIcon />
        </Box>
        <h2 className="title">Add Data in Device</h2>
        <div className="form-container">
          <div className="row">
            <div className="input-container">
              <label htmlFor="field1">ANLAGEN-ID</label>
              <input
                onChange={(e) => setAnlagenID(e.target.value)}
                value={anlagenID}
                type="text"
                id="field1"
                className="text-input"
                placeholder="ID"
              />
            </div>
            <div className="input-container">
              <label htmlFor="field2">SERIENNR.</label>
              <input
                onChange={(e) => setSeriennr(e.target.value)}
                value={seriennr}
                type="text"
                id="field2"
                className="text-input"
                placeholder="Sr.No."
              />
            </div>
          </div>
          <div className="row">
            <div className="input-container">
              <label htmlFor="field3">Gehort zu</label>
              <input
                value={gehortzu}
                onChange={(e) => setGehortzu(e.target.value)}
                type="text"
                id="field3"
                className="text-input"
                placeholder="TYPE"
              />
            </div>
            <div className="input-container">
              <label htmlFor="field4">Anlagenbez</label>
              <input
                onChange={(e) => setAnlagenbez(e.target.value)}
                value={anlagenbez}
                type="text"
                id="field4"
                className="text-input"
                placeholder="TYPE"
              />
            </div>
          </div>
          <div className="row">
            <div className="input-container">
              <label htmlFor="field5">Typ/Model</label>
              <input
                onChange={(e) => setTypModell(e.target.value)}
                value={typModell}
                type="text"
                id="field5"
                className="text-input"
                placeholder="TYPE"
              />
            </div>
            <div className="input-container">
              <label htmlFor="field6">Hersteller</label>
              <input
                onChange={(e) => setHersteller(e.target.value)}
                value={hersteller}
                type="text"
                id="field6"
                className="text-input"
                placeholder="TYPE"
              />
            </div>
          </div>
          <div className="row">
            <div className="input-container">
              <label htmlFor="field7">Lieferant</label>
              <input
                value={lieferant}
                onChange={(e) => setLieferant(e.target.value)}
                type="text"
                id="field7"
                className="text-input"
                placeholder="TYPE"
              />
            </div>
            <div className="input-container">
              <label htmlFor="field8">Servicestelle</label>
              <input
                onChange={(e) => setServicestelle(e.target.value)}
                value={servicestelle}
                type="text"
                id="field8"
                className="text-input"
                placeholder="TYPE"
              />
            </div>
          </div>
          <div className="row">
            <div className="input-container">
              <label htmlFor="field7">Abteilung</label>
              <input
                onChange={(e) => setAbteilung(e.target.value)}
                value={abteilung}
                type="text"
                id="field7"
                className="text-input"
                placeholder="TYPE"
              />
            </div>
            <div className="input-container">
              <label htmlFor="field8">Kostenstelle</label>
              <input
                onChange={(e) => setKostenstelle(e.target.value)}
                value={kostenstelle}
                type="text"
                id="field8"
                className="text-input"
                placeholder="TYPE"
              />
            </div>
          </div>
          <div className="row">
            <div className="input-container">
              <label htmlFor="field7">SLA</label>
              <input
                onChange={(e) => setSLA(e.target.value)}
                value={SLA}
                type="text"
                id="field7"
                className="text-input"
                placeholder="TYPE"
              />
            </div>
            <div className="input-container">
              <label htmlFor="field8">Preis pro SLA</label>
              <input
                onChange={(e) => setpreisProSLA(e.target.value)}
                value={preisProSLA}
                type="text"
                id="field8"
                className="text-input"
                placeholder="TYPE"
              />
            </div>
          </div>
          <div className="row">
            <div className="input-container">
              <label htmlFor="field7">Status</label>
              <input
                onChange={(e) => setStatus(e.target.value)}
                value={status}
                type="text"
                id="field7"
                className="text-input"
                placeholder="TYPE"
              />
            </div>
            <div className="input-container">
              <label htmlFor="field8">Raumbez. MT</label>
              <input
                onChange={(e) => setRaumbezMT(e.target.value)}
                value={raumbezMT}
                type="text"
                id="field8"
                className="text-input"
                placeholder="TYPE"
              />
            </div>
          </div>
          <button className="submit-button" onClick={hanldleSumitForm}>
            Submit
          </button>
          {/* <button className="submit-button" variant="contained" onClick={()=>setOpenAddDataForm(false)}>
           Close
          </button> */}
        </div>
      </div>
    </Modal>
  );
}

export default AddDataForm;
