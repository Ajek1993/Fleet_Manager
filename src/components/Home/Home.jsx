import React from "react";
import MenuAppBar from "../Header/MenuAppBar";
import SuccessLoginAlert from "./SuccessLoginAlert";

export default function Home() {
  return (
    <>
      <MenuAppBar />
      <SuccessLoginAlert />
    </>
  );
}
