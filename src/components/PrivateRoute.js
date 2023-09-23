import React from "react";
import { useUser } from "../providers/UserProvider";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { user } = useUser();

  if (!user) return <Navigate to="/login" />;

  return children;
};
