import React, { useState } from "react";
import MenuAppBar from "../Header/MenuAppBar";
import FuelHeader from "./FuelHeader";
import FuelForm from "./FuelForm";
import FuelList from "./FuelList";

export default function Fuel() {
  const [formOpen, setFormOpen] = useState(false);

  const handleFormOpen = () => {
    setFormOpen((prev) => !prev);
  };

  return (
    <div>
      <MenuAppBar />
      <FuelHeader handleFormOpen={handleFormOpen} />
      {formOpen && <FuelForm handleFormOpen={handleFormOpen} />}
      {!formOpen && <FuelList />}
    </div>
  );
}
