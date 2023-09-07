import React from "react";
import UserProvider from "../providers/UserProvider";
import MenuAppBar from "./Header/MenuAppBar";
import CarsList from "./CarsList";
import SignIn from "./Signin/Signin";
import SignUp from "./Signup/Signup";

export default function App() {
  return (
    <div>
      <UserProvider>
        <MenuAppBar />
        <SignIn />
        <SignUp />
        {/* {        <CarsList /> } */}
      </UserProvider>
    </div>
  );
}
