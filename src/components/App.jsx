import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import { PrivateRoute } from "./PrivateRoute";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/cars"
              element={
                <PrivateRoute>
                  <Cars />
                </PrivateRoute>
              }
            />
            <Route
              path="/services"
              element={
                <PrivateRoute>
                  <Services />
                </PrivateRoute>
              }
            />
            <Route
              path="/fuel"
              element={
                <PrivateRoute>
                  <Fuel />
                </PrivateRoute>
              }
            />
            <Route
              path="/costs"
              element={
                <PrivateRoute>
                  <Costs />
                </PrivateRoute>
              }
            />
            <Route
              path="/user"
              element={
                <PrivateRoute>
                  <User />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}
