import React from "react";
import { Link, Outlet } from "react-router-dom";
import Button from "../../atoms/Button";
import "./AuthPage.css";

export default function AuthPage() {
  return (
    <div className="main">
      <Outlet />
    </div>
  );
}
