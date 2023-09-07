import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  NavLink,
  Outlet,
} from "react-router-dom";
import UserProvider from "../providers/UserProvider";
import MenuAppBar from "./Header/MenuAppBar";
import Home from "./Home/Home";
import NotFound from "./NotFound";
import SignIn from "./Signin/Signin";
import SignUp from "./Signup/Signup";
import CarsList from "./CarsList";

export default function App() {
  return (
    <div>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* {        <CarsList /> } */}
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}
