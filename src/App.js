import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/molecules/Login/Login";
import Signup from "./components/molecules/Signup/Signup";
import LoginHolder from "./components/organisms/LoginHolder/LoginHolder";
import HomePage from "./components/pages/HomePage/HomePage";
import AuthPage from "./components/pages/AuthPage/AuthPage";
import BlogList from "./components/organisms/BlogList/BlogList";
import RequireAuth from "./utils/RequireAuth";
// import Navbar from "./components/organisms/Navbar/Navbar";
import Navbar1 from "./components/organisms/Navbar/Navbar1";
import BlogPage from "./components/pages/BlogPage/BlogPage";
import UserSettings from "./components/pages/UserSettings/UserSettings";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Toaster />
      <Navbar1 />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/blog/:id" element={<BlogPage />} />

        <Route element={<RequireAuth />}>
          <Route path="/:id" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="/userSettings/:id" element={<UserSettings />} />
        </Route>

        <Route path="auth" element={<AuthPage />}>
          <Route
            index
            element={
              <LoginHolder>
                <Login />
              </LoginHolder>
            }
          />

          <Route
            path="login"
            element={
              <LoginHolder>
                <Login />
              </LoginHolder>
            }
          />

          <Route
            path="signup"
            element={
              <LoginHolder>
                <Signup />
              </LoginHolder>
            }
          />
        </Route>

        {/* <Route path="blog/:id" element={<BlogPage/>}/> */}
      </Routes>
    </>
  );
}
