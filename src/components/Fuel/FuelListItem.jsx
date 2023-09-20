import React from "react";

export default function FuelListItem({ fuel, dateChosen }) {
  console.log(fuel);
  console.log(dateChosen);
  return (
    <>
      {fuel.month === dateChosen.month && fuel.year === dateChosen.year && (
        <div style={{ marginBottom: "20px" }}>
          <p>Rejestracja: {fuel.plate}</p>
          <p>miesiąc: {fuel.month}</p>
          <p>rok: {fuel.year}</p>
          <p>netto LPG: {fuel.costLPG}</p>
          <p>ilość LPG: {fuel.quantityLPG}</p>
          <p>netto PB: {fuel.costPB}</p>
          <p>ilość PB: {fuel.quantityPB}</p>
        </div>
      )}
    </>
  );
}
