import React from "react";
import { useState
  // ,useEffect,useCallback
 } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import LeftDrawer from "./components/LeftDrawer";
import AddDataForm from "./components/AddDataForm";
import DataPage from "./components/DataPage";

function App() {

  const [openDarawer, setOpenDrawer] = useState(false);
  const [openAddDataForm, setOpenAddDataForm] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [tabsValue, setTabsValue] = useState("a");
  const [allDevicesData, setAllDevicesData] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  return (
    <div className="dark">
      <header className="App-header">
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setOpenDrawer={setOpenDrawer}
          setOpenAddDataForm={setOpenAddDataForm}
          setAllDevicesData={setAllDevicesData}
          setIsLoading={setIsLoading}
        />
        <LeftDrawer open={openDarawer} setOpen={setOpenDrawer}  darkMode={darkMode} />
        <AddDataForm
          openAddDataForm={openAddDataForm}
          setOpenAddDataForm={setOpenAddDataForm}
          darkMode={darkMode}
        />
      </header>
      <DataPage darkMode={darkMode} isLoading={isLoading}  setTabsValue={setTabsValue} tabsValue={tabsValue} setAllDevicesData={setAllDevicesData} allDevicesData={allDevicesData} />
    </div>
  );
}

export default App;
