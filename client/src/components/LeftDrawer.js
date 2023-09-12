import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { TextField, InputLabel } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import axios from "axios";
import "../AddDataForm.css";

const drawerWidth = 210;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "center",
}));

const styles = (theme) => ({
  multilineColor: {
    color: "red",
  },
});

function LeftDrawer({ open, setOpen, darkMode = { darkMode } }) {
  const [note, setNote] = useState("");
  const [noteData, setNoteData] = useState("");
  const [currentDateDevices, setCurrentDateDevices] = useState([]);

  const getNotes = async () => {
    const response = await axios.get(`http://localhost:8080/api/notes`);
    setNoteData(response?.data?.data?.notes[0]);
  };

  const createOrUpdateNotes = async () => {
    await axios.post(`http://localhost:8080/api/notes`, {
      note,
      noteId: noteData?.id,
    });
  };

  useEffect(() => {
    const getCurrentDateDevices = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/devices/remindersId`
      );
      setCurrentDateDevices(response?.data?.data);
    };

    getCurrentDateDevices();
  }, []);

  const theme = useTheme();
  const fieldsColor = "#222";
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: darkMode ? "#333" : "#ededed", // Set the background color here
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          <InputLabel style={{ fontWeight: "100px" }}>
            <Typography
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: darkMode ? "white" : "black",
              }}
            >
              Create Your Notes
            </Typography>
          </InputLabel>
        </Box>
      </DrawerHeader>
      <Divider />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          margin: 1,
          gap: 3,
        }}
      >
        <Box
          sx={{
            backgroundColor: darkMode ? fieldsColor : "white",
          }}
        >
          <TextField
            multiline
            rows={5}
            value={note ? note : noteData?.note}
            onChange={(e) => setNote(e.target.value)}
            sx={{
              "& textarea": {
                color: darkMode ? "white" : "black", // Set the desired font color
              },
            }}
          />
        </Box>
        <Button
          onClick={getNotes}
          variant="contained"
          sx={{ width: "90%", fontSize: "12px", padding: "6px" }}
        >
          Load Previous Notes
        </Button>
        <Button
          onClick={createOrUpdateNotes}
          variant="contained"
          sx={{ width: "90%", fontSize: "12px", padding: "6px" }}
        >
          Save
        </Button>
        <Button
          variant="contained"
          sx={{ width: "90%", fontSize: "12px", padding: "6px" }}
          onClick={() => setOpen(false)}
        >
          Close
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          margin: 1,
          gap: 2,
        }}
      >
        <InputLabel style={{ fontWeight: "100px" }}>
          <Typography
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              marginTop: "15px",
              color: darkMode ? "white" : "black",
            }}
          >
            All Remind Me Id's
          </Typography>
        </InputLabel>
        <Box sx={{ backgroundColor: darkMode ? fieldsColor : "white" }}>
          <TextField
            multiline
            rows={5}
            disabled={true}
            value={currentDateDevices?.map((item) => item?.anlagenID)}
            sx={{
              "& textarea": {
                color: darkMode ? "white" : "black", // Set the desired font color
              },
            }}
          />
        </Box>
      </Box>
    </Drawer>
  );
}

export default LeftDrawer;
