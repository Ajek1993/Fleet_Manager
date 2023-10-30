import React from "react";
import MenuAppBar from "../Header/MenuAppBar";
import SuccessLoginAlert from "./SuccessLoginAlert";
import { useUser } from "../../providers/UserProvider";
import Welcome from "./Welcome";
import { isLogged } from "../../providers/UserProvider";

export default function Home() {
  const { user } = useUser();

  return (
    <>
      <MenuAppBar />
      {!isLogged && user && <SuccessLoginAlert />}
      <Welcome />
    </>
  );
}
