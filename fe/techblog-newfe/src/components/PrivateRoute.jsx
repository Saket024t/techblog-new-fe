import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem("token");

  // If not authenticated, redirect to Login AND pass a "message" in state
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      state={{ message: "You must be logged in to view that page." }}
      replace
    />
  );
};

export default PrivateRoute;
