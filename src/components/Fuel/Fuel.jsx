import React, { useState } from "react";
import MenuAppBar from "../Header/MenuAppBar";
import FuelHeader from "./FuelHeader";
import FuelForm from "./FuelForm";
import FuelList from "./FuelList";

export default function Fuel() {
  const [formOpen, setFormOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const handleFormOpen = () => {
    setFormOpen((prev) => !prev);
  };

  const handleFilterOpen = () => {
    setFilterOpen((prev) => !prev);
  };

  return (
    <div>
      <MenuAppBar />
      <FuelHeader
        handleFormOpen={handleFormOpen}
        handleFilterOpen={handleFilterOpen}
      />
      {formOpen && <FuelForm handleFormOpen={handleFormOpen} />}
      {!formOpen && <FuelList filterOpen={filterOpen} />}
    </div>
  );
}
