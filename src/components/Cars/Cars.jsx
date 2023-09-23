import React, { useState } from "react";
import MenuAppBar from "../Header/MenuAppBar";
import CarsList from "./CarsList";
import CarsForm from "./CarsForm";
import CarsHeader from "./CarsHeader";

export default function Cars() {
  const [formOpen, setFormOpen] = useState(false);

  const handleFormOpen = () => {
    setFormOpen((prev) => !prev);
  };

  return (
    <>
      <MenuAppBar />
      <CarsHeader handleFormOpen={handleFormOpen} />
      {formOpen && <CarsForm handleFormOpen={handleFormOpen} />}
      {!formOpen && <CarsList />}
    </>
  );
}
