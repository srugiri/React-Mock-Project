import React from "react";
import "./LoginHolder.css";

export default function LoginHolder({ children }) {
  return (
    <div className="loginHolder">
      <div className="border-2 border-white p-2 rounded-lg shadow-lg shadow-black">{children}</div>
    </div>
  );
}
