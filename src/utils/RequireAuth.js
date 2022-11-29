import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireAuth() {

  let loggedIn = sessionStorage.getItem("login");

  return loggedIn ? <Outlet /> : <Navigate to="/" replace />;
}
