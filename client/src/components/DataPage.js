import React, { useState } from "react";

import { Box } from "@mui/material";

import Data from "./Data";
import ShowDataForm from "./ShowDataForm";

function DataPage({
  allDevicesData,
  setAllDevicesData,
  darkMode,
  setTabsValue,
  tabsValue,
  isLoading,
}) {
  const [deviceIdToShowData, setDeviceIdToShowData] = useState("");

  return (
    <Box sx={{ display: "flex", flexGrow: "initial", width: "100%" }}>
      <Data
        isLoading={isLoading}
        setTabsValue={setTabsValue}
        tabsValue={tabsValue}
        allDevicesData={allDevicesData}
        setDeviceIdToShowData={setDeviceIdToShowData}
        darkMode={darkMode}
        setAllDevicesData={setAllDevicesData}
      />{" "}
      <ShowDataForm
        darkMode={darkMode}
        allDevicesData={allDevicesData}
        deviceIdToShowData={deviceIdToShowData}
      />
    </Box>
  );
}

export default DataPage;
