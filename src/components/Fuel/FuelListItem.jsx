import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export default function FuelListItem({ fuel, dateChosen }) {
  if (dateChosen.month === "(wszystkie)" && dateChosen.year === "(wszystkie)") {
    return (
      <TableRow sx={{ "& > td": { textAlign: "center", padding: "10px 0" } }}>
        <TableCell>{fuel.plate}</TableCell>
        <TableCell>{fuel.costLPG} zł</TableCell>
        <TableCell>{fuel.quantityLPG} L</TableCell>
        <TableCell>{fuel.costPB} zł</TableCell>
        <TableCell>{fuel.quantityPB} L</TableCell>
      </TableRow>
    );
  } else {
    return (
      <>
        {fuel.month === dateChosen.month &&
          fuel.year === dateChosen.year &&
          fuel.plate === dateChosen.plate && (
            <TableRow
              sx={{ "& > td": { textAlign: "center", padding: "10px 0" } }}
            >
              <TableCell>{fuel.plate}</TableCell>
              <TableCell>{fuel.costLPG} zł</TableCell>
              <TableCell>{fuel.quantityLPG} L</TableCell>
              <TableCell>{fuel.costPB} zł</TableCell>
              <TableCell>{fuel.quantityPB} L</TableCell>
            </TableRow>
          )}
      </>
    );
  }
}
