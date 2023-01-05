import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const RedirectRoute = ({ children }) => {
  const { user } = UserAuth();

  if (user) {
    return <Navigate to="/account" />;
  }
  return children;
};

export default RedirectRoute;
