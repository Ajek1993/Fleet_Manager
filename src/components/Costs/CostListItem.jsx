import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

function CostListItemDetail({ cost }) {
  return (
    <TableRow sx={{ "& > td": { textAlign: "center", padding: "10px 0" } }}>
      <TableCell>{cost.plate}</TableCell>
      <TableCell>{cost.services} zł</TableCell>
      <TableCell>{cost.fuel} zł</TableCell>
      <TableCell>
        {!cost.distance
          ? "-"
          : ((+cost.fuel + +cost.services) / +cost.distance).toFixed(2) + " zł"}
      </TableCell>
    </TableRow>
  );
}

export default function CostListItem({ cost, dateChosen }) {
  if (cost !== undefined && (cost.services || cost.fuel)) {
    if (
      dateChosen.plate === "(wszystkie)" &&
      dateChosen.month === "(wszystkie)" &&
      dateChosen.year === "(wszystkie)"
    ) {
      return (
        <CostListItemDetail
          key={cost.plate + cost.year + cost.month}
          cost={cost}
        />
      );
    } else if (
      dateChosen.plate === cost.plate &&
      dateChosen.month === "(wszystkie)" &&
      dateChosen.year === "(wszystkie)"
    ) {
      return (
        <CostListItemDetail
          key={cost.plate + cost.year + cost.month}
          cost={cost}
        />
      );
    } else if (
      dateChosen.plate === "(wszystkie)" &&
      dateChosen.month === cost.month &&
      dateChosen.year === "(wszystkie)"
    ) {
      return (
        <CostListItemDetail
          key={cost.plate + cost.year + cost.month}
          cost={cost}
        />
      );
    } else if (
      dateChosen.plate === "(wszystkie)" &&
      dateChosen.month === "(wszystkie)" &&
      dateChosen.year === cost.year
    ) {
      return (
        <CostListItemDetail
          key={cost.plate + cost.year + cost.month}
          cost={cost}
        />
      );
    } else if (
      dateChosen.plate === cost.plate &&
      dateChosen.month === cost.month &&
      dateChosen.year === "(wszystkie)"
    ) {
      return (
        <CostListItemDetail
          key={cost.plate + cost.year + cost.month}
          cost={cost}
        />
      );
    } else if (
      dateChosen.plate === cost.plate &&
      dateChosen.month === "(wszystkie)" &&
      dateChosen.year === cost.year
    ) {
      return (
        <CostListItemDetail
          key={cost.plate + cost.year + cost.month}
          cost={cost}
        />
      );
    } else if (
      dateChosen.plate === "(wszystkie)" &&
      dateChosen.month === cost.month &&
      dateChosen.year === cost.year
    ) {
      return (
        <CostListItemDetail
          key={cost.plate + cost.year + cost.month}
          cost={cost}
        />
      );
    } else {
      return (
        <>
          {cost.plate === dateChosen.plate &&
            cost.month === dateChosen.month &&
            cost.year === dateChosen.year && (
              <CostListItemDetail
                key={cost.plate + cost.year + cost.month}
                cost={cost}
              />
            )}
        </>
      );
    }
  }
}
