import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

function FuelListItemDetail({ fuel }) {
  return (
    <TableRow sx={{ "& > td": { textAlign: "center", padding: "10px 0" } }}>
      <TableCell>{fuel.plate}</TableCell>
      <TableCell>{fuel.costLPG} zł</TableCell>
      <TableCell>{fuel.quantityLPG} L</TableCell>
      <TableCell>{fuel.costPB} zł</TableCell>
      <TableCell>{fuel.quantityPB} L</TableCell>
    </TableRow>
  );
}

export default function FuelListItem({ fuel, dateChosen }) {
  if (
    dateChosen.plate === "(wszystkie)" &&
    dateChosen.month === "(wszystkie)" &&
    dateChosen.year === "(wszystkie)"
  ) {
    return <FuelListItemDetail key={fuel.ID} fuel={fuel} />;
  } else if (
    dateChosen.plate === fuel.plate &&
    dateChosen.month === "(wszystkie)" &&
    dateChosen.year === "(wszystkie)"
  ) {
    return <FuelListItemDetail key={fuel.ID} fuel={fuel} />;
  } else if (
    dateChosen.plate === "(wszystkie)" &&
    dateChosen.month === fuel.month &&
    dateChosen.year === "(wszystkie)"
  ) {
    return <FuelListItemDetail key={fuel.ID} fuel={fuel} />;
  } else if (
    dateChosen.plate === "(wszystkie)" &&
    dateChosen.month === "(wszystkie)" &&
    dateChosen.year === fuel.year
  ) {
    return <FuelListItemDetail key={fuel.ID} fuel={fuel} />;
  } else if (
    dateChosen.plate === fuel.plate &&
    dateChosen.month === fuel.month &&
    dateChosen.year === "(wszystkie)"
  ) {
    return <FuelListItemDetail key={fuel.ID} fuel={fuel} />;
  } else if (
    dateChosen.plate === fuel.plate &&
    dateChosen.month === "(wszystkie)" &&
    dateChosen.year === fuel.year
  ) {
    return <FuelListItemDetail key={fuel.ID} fuel={fuel} />;
  } else if (
    dateChosen.plate === "(wszystkie)" &&
    dateChosen.month === fuel.month &&
    dateChosen.year === fuel.year
  ) {
    return <FuelListItemDetail key={fuel.ID} fuel={fuel} />;
  } else {
    return (
      <>
        {fuel.plate === dateChosen.plate &&
          fuel.month === dateChosen.month &&
          fuel.year === dateChosen.year && (
            <FuelListItemDetail key={fuel.ID} fuel={fuel} />
          )}
      </>
    );
  }
}
