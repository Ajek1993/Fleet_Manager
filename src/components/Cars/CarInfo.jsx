import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function CarInfo({
  carInfo: {
    plate,
    brand,
    model,
    insurance,
    technicalExamination,
    oilChange,
    startMilage,
  },
}) {
  const rows = [
    brand,
    model,
    insurance,
    technicalExamination,
    oilChange,
    startMilage,
  ];

  const rowsNames = [
    "Marka",
    "Model",
    "Data ważności polisy OC",
    "Data kolejnego badania technicznego",
    "Data kolejnej wymiany oleju",
    "Początkowy przebieg",
  ];
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={row}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "& > td": { padding: "6px" },
              }}
            >
              <TableCell component="th" scope="row">
                {rowsNames[i]}
              </TableCell>
              <TableCell align="center">{row}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
