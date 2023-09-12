import * as React from "react";
import {
  Box,
  Table,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
} from "@mui/material";
import Loader from "./Loader";

function ListData({
  hanldeDoubleClickList,
  allDevicesData,
  setDeviceIdToShowData,
  darkMode,
  isLoading,
  uploadLoading,
}) {
  const isData = allDevicesData && allDevicesData.length > 0;
  const tabsColor = "#222";
  return (
    <TableContainer
      component={Paper}
      sx={{ height: "100vh", width: "100%", marginBottom: "80px" }}
    >
      {isData ? (
        <Table
          sx={{ minWidth: 60, bgcolor: "#ededed", width: "100%" }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead
            style={{
              backgroundColor: darkMode ? tabsColor : "#1976d2",
              color: "white",
              position: "sticky",
              top: 0,
              zIndex: 1,
              fontSize: "52px",
            }}
          >
            <TableRow>
              <TableCell style={{ color: "white", maxWidth: "50px" }}>
                Anlagen-ID
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                Seriennr
              </TableCell>
              <TableCell
                style={{ color: "white", width: "50px" }}
                align="right"
              >
                Gehort zu
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                Anlagenbez
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                Typ/Model
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                Hersteller
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                Liferant
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                Servicetelle
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                Abteilung
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                Kostenstelle
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                SLA
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                PreisproSLA
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allDevicesData.map((device) => (
              <TableRow
                key={device.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  bgcolor: darkMode ? "#cccccc" : "",
                }}
                onDoubleClick={() => hanldeDoubleClickList(device)}
                onClick={() => setDeviceIdToShowData(device.id)}
              >
                <TableCell component="th" scope="row">
                  {device.anlagenID}
                </TableCell>
                <TableCell align="right">{device.seriennr}</TableCell>
                <TableCell align="right">{device.gehortzu}</TableCell>
                <TableCell align="right">{device.anlagenbez}</TableCell>
                <TableCell align="right">{device.typModell}</TableCell>
                <TableCell align="right">{device.hersteller}</TableCell>
                <TableCell align="right">{device.lieferant}</TableCell>
                <TableCell align="right">{device.servicestelle}</TableCell>
                <TableCell align="right">{device.abteilung}</TableCell>
                <TableCell align="right">{device.kostenstelle}</TableCell>
                <TableCell align="right">{device.SLA}</TableCell>
                <TableCell align="right">{device.preisProSLA}</TableCell>
                <TableCell align="right">{device.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Box
          sx={{
            backgroundColor: "#cccccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "30%",
            paddingBottom: "40%",
          }}
        >
          <h3>
            {isLoading === true || uploadLoading === true ? (
              <Loader />
            ) : (
              "No Data To Show Please Add Some Data"
            )}
          </h3>
        </Box>
      )}
    </TableContainer>
  );
}

export default ListData;
