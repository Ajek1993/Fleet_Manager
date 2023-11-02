import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useUser } from "../../providers/UserProvider";

function CostListItemDetail({ fuel }) {
  const { services } = useUser();

  const costSum = services
    .filter(
      (service) =>
        service.carPlate === fuel.plate &&
        +service.dateOfService.slice(0, 4) === fuel.year &&
        +service.dateOfService.slice(5, 7) === fuel.monthNum
    )
    .map((service) => service.costNetto)
    .reduce((a, c) => +a + +c, 0);

  return (
    <TableRow sx={{ "& > td": { textAlign: "center", padding: "10px 0" } }}>
      <TableCell>{fuel.plate}</TableCell>
      <TableCell>{costSum} zł</TableCell>
      <TableCell>{(+fuel.costLPG + +fuel.costPB).toFixed(2)} zł</TableCell>
      <TableCell>
        {((+fuel.costLPG + +fuel.costPB + +costSum) / +fuel.distance).toFixed(
          2
        )}{" "}
        zł
      </TableCell>
    </TableRow>
  );
}

export default function CostListItem({ fuel, dateChosen }) {
  if (
    dateChosen.plate === "(wszystkie)" &&
    dateChosen.month === "(wszystkie)" &&
    dateChosen.year === "(wszystkie)"
  ) {
    return <CostListItemDetail key={fuel.ID} fuel={fuel} />;
  } else if (
    dateChosen.plate === fuel.plate &&
    dateChosen.month === "(wszystkie)" &&
    dateChosen.year === "(wszystkie)"
  ) {
    return <CostListItemDetail key={fuel.ID} fuel={fuel} />;
  } else if (
    dateChosen.plate === "(wszystkie)" &&
    dateChosen.month === fuel.month &&
    dateChosen.year === "(wszystkie)"
  ) {
    return <CostListItemDetail key={fuel.ID} fuel={fuel} />;
  } else if (
    dateChosen.plate === "(wszystkie)" &&
    dateChosen.month === "(wszystkie)" &&
    dateChosen.year === fuel.year
  ) {
    return <CostListItemDetail key={fuel.ID} fuel={fuel} />;
  } else if (
    dateChosen.plate === fuel.plate &&
    dateChosen.month === fuel.month &&
    dateChosen.year === "(wszystkie)"
  ) {
    return <CostListItemDetail key={fuel.ID} fuel={fuel} />;
  } else if (
    dateChosen.plate === fuel.plate &&
    dateChosen.month === "(wszystkie)" &&
    dateChosen.year === fuel.year
  ) {
    return <CostListItemDetail key={fuel.ID} fuel={fuel} />;
  } else if (
    dateChosen.plate === "(wszystkie)" &&
    dateChosen.month === fuel.month &&
    dateChosen.year === fuel.year
  ) {
    return <CostListItemDetail key={fuel.ID} fuel={fuel} />;
  } else {
    return (
      <>
        {fuel.plate === dateChosen.plate &&
          fuel.month === dateChosen.month &&
          fuel.year === dateChosen.year && (
            <CostListItemDetail key={fuel.ID} fuel={fuel} />
          )}
      </>
    );
  }
}
