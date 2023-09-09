import React, { useEffect, useState } from "react";
import MenuAppBar from "../Header/MenuAppBar";
import SuccessLoginAlert from "./SuccessLoginAlert";
import close from "./SuccessLoginAlert";

export default function Home() {
  return (
    <>
      <MenuAppBar />
      {close && <SuccessLoginAlert />}
    </>
  );
}
