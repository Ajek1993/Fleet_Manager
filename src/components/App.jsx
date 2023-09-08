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
import Home from "./Home/Home";
import NotFound from "./NotFound";
import SignIn from "./Signin/Signin";
import SignUp from "./Signup/Signup";
import Cars from "./Cars/Cars";
import Services from "./Cars/Cars";
import Fuel from "./Fuel/Fuel";
import Costs from "./Costs/Costs";
import User from "./User/User";

export default function App() {
  return (
    <div>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/services" element={<Services />} />
            <Route path="/fuel" element={<Fuel />} />
            <Route path="/costs" element={<Costs />} />
            <Route path="/user" element={<User />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}
