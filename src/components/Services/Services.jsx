import React, { useState } from "react";
import MenuAppBar from "../Header/MenuAppBar";
import ServicesHeader from "./ServicesHeader";
import ServicesForm from "./ServicesForm";

export default function Services() {
  const [formOpen, setFormOpen] = useState(false);

  const handleFormOpen = () => {
    setFormOpen((prev) => !prev);
  };
  return (
    <>
      <MenuAppBar />
      <ServicesHeader handleFormOpen={handleFormOpen} />
      {formOpen && <ServicesForm handleFormOpen={handleFormOpen} />}
    </>
  );
}
