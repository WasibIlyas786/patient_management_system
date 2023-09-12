import React, { useState } from "react";
// import { Modal, FormControlLabel, Checkbox, Button } from '@material-ui';
import { Modal, Box, FormControlLabel, Checkbox, Button } from "@mui/material";
import axios from "axios";
// const useStyles = makeStyles((theme) => ({
//   modal: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   paper: {
//     backgroundColor: theme.palette.background.paper,
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
// }));

const RequestedModal = ({
  showRequestedModal,
  setShowRequestedModal,
  isRequested,
  setIsRequested,
  darkMode,
  deviceIdToUpdateData,
}) => {
  const [open, setOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleClose = () => {
    setShowRequestedModal(false);
  };

  const handleCheckboxChange = (event) => {
    setIsRequested(event.target.checked);
  };

  const handleSubmit = async () => {
    // Handle form submission or any other action
    try {
      console.log("handleSubmit deviceIdToUpdateData", deviceIdToUpdateData);
      await axios.post(
        `http://localhost:8080/api/requested/${deviceIdToUpdateData}`,
        { isRequested }
      );
    } catch (error) {}
    handleClose();
  };

  return (
    <Box>
      {/* <Button variant="contained" color="primary" onClick={handleOpen}>
        Open Modal
      </Button> */}
      <Modal
        // className={classes.modal}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "15%",
        }}
        open={showRequestedModal}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            bgcolor: darkMode ? "#333" : "#ededed",
            color: darkMode ? "whitesmoke" : "black",
            padding: "10px 20px",
            borderRadius: "5px",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={isRequested}
                onChange={handleCheckboxChange}
                color="primary"
                sx={{ color: darkMode ? "white" : "#333" }}
              />
            }
            label="Move into Requested"
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default RequestedModal;
