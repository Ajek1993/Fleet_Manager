import React, { useState } from "react";
import MenuAppBar from "../Header/MenuAppBar";
import CostsHeader from "./CostsHeader";
import CostList from "./CostList";

export default function Costs() {
  const [filterOpen, setFilterOpen] = useState(false);

  const handleFilterOpen = () => {
    setFilterOpen((prev) => !prev);
  };

  return (
    <>
      <MenuAppBar />
      <CostsHeader handleFilterOpen={handleFilterOpen} />
      <CostList filterOpen={filterOpen} />
    </>
  );
}
