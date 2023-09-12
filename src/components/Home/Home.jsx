import React, { useEffect } from "react";
import MenuAppBar from "../Header/MenuAppBar";
import SuccessLoginAlert from "./SuccessLoginAlert";

export default function Home() {
  const isLogged = sessionStorage.getItem("isLogged");
  useEffect(() => {
    sessionStorage.setItem("isLogged", true);
  }, []);
  return (
    <>
      <MenuAppBar />
      {!isLogged && <SuccessLoginAlert />}
    </>
  );
}
