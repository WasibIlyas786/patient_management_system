/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useCallback, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import SearchIcon from "@mui/icons-material/Search";
import { Tooltip, Switch } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.5),
  // "&:hover": {
  //   backgroundColor: alpha(theme.palette.common.white, 1),
  // },
  // marginRight: theme.spacing(2),
  // marginLeft: theme.spacing(2),
  width: "auto",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(0.5, 1, 0.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

function Navbar({
  setOpenDrawer,
  setOpenAddDataForm,
  setDarkMode,
  darkMode,
  setAllDevicesData,
  setIsLoading,
}) {
  const fileInputRef = useRef(null);
  // const [isLoading, setIsLoading] = useState(false);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:8080/api/devices");
      setAllDevicesData(response.data.data.devices);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file.name.includes(".xls")) {
      toast.error("Invalid file type");
    } else {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await axios.post(
          "http://localhost:8080/api/devices/upload",
          formData
        );
        toast.success("file uploaded successfully");
        fetchData();
      } catch (error) {
        console.log("error", error);
        toast.error(error.response.data.message);
      }
    }
  };

  const searchData = async (e) => {
    try {
      const result = await axios.get(
        `http://localhost:8080/api/devices/search?anlagenID=${e.target.value}&seriennr=${e.target.value}`
      );
      if (result && result.data.data.device.length > 0) {
        setAllDevicesData(result.data.data.device);
      }
      if (!e.target.value) {
        fetchData();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      <AppBar
        position="static"
        color="default"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          backgroundColor: darkMode ? "#333" : "#ededed",
          color: darkMode ? "white" : "black",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <Toolbar sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              width: "38%",
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpenDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Box>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  onChange={searchData}
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  color="black"
                />
              </Search>
            </Box>
            <Box>
              <Tooltip title="Add New Data">
                <IconButton
                  size="string"
                  edge="end"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={() => setOpenAddDataForm(true)}
                >
                  <AddBoxOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box display="flex" alignItems="center">
              <input
                type="file"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <Tooltip title="Upload File">
                <IconButton
                  color="primary"
                  component="span"
                  onClick={handleUploadClick}
                >
                  <FileUploadIcon />
                </IconButton>
              </Tooltip>

              {/* <Button
                variant="contained"
                color="primary"
                onClick={handleUploadClick}
              >
                Upload File
              </Button> */}
            </Box>
            <Box>
              <Switch
                checked={darkMode}
                onChange={handleDarkModeToggle}
                color="default"
                icon={<Brightness7Icon />}
                checkedIcon={<Brightness4Icon />}
              />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
