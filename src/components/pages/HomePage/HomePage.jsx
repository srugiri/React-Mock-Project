import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import BlogList from "../../organisms/BlogList/BlogList";

export default function HomePage() {
  let contextData = useContext(AuthContext);
  console.log(contextData.loggedIn);

  return (
    <div>
      <BlogList />

      <Outlet />
    </div>
  );
}

///Homepage

//login
