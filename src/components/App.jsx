import React from "react";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import UserProvider from "../providers/UserProvider";
import Navigation from "./Home/Navigation";
import Signout from "./Signout/Signout";
import CarsList from "./CarsList";

export default function App() {
  return (
    <div>
      <UserProvider>
        <Navigation />
        <Login />
        <Signup />
        <Signout />
        <CarsList />
      </UserProvider>
    </div>
  );
}
