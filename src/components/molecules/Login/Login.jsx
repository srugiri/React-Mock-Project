import React, { useContext, useState } from "react";
import Form from "../../atoms/Form/Form";
import Input from "../../atoms/Input/Input";
import Label from "../../atoms/Label/Label";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import Button from "../../atoms/Button/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import "./Login.css";

export default function Login() {
  let navigate = useNavigate();
  let [loginForm, setLoginForm] = useState({});
  let contextData = useContext(AuthContext);

  // const onChangeHandler = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;

  //   setLoginForm({
  //     ...loginForm,
  //     [name]: value,
  //   });
  //   console.log(loginForm);
  // };
  const checkLogin = async (loginForm) => {
    try {
      let response = await fetch(
        `http://localhost:3000/users/?email=${formik.values.email}&password=${formik.values.password}`
      );
      let data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  };
  const onSubmitHandler = () => {
    // alert("clicked");
    checkLogin(loginForm).then((data) => {
      console.log(data);
      if (data.length) {
        toast.success("Loggedin Succefullly!");
        contextData.setLoggedIn(true);
        sessionStorage.setItem("login", true);
        sessionStorage.setItem("user-id", data[0].id);
        sessionStorage.setItem("username", data[0].username);
        sessionStorage.setItem("name", data[0].name);
        navigate("/allBlogs");
      } else {
        toast.error("incorrect email or password!");
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: onSubmitHandler,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email is not in proper format")
        .required("Email is required"),
      password: Yup.string().required("Password is needed"),
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      //   "Must contain 8 chatacters, one Uppercase, One Lowercase, One Digit and One Special Character"
      // ),
    }),
  });

  return (
    <div className="loginForm">
      <div>
        <span className="font-semibold">If you are new User Please</span>
        <Link to="/auth/signup">
          <Button
            className="linkBtn text-green-700"
            bg="none"
            text="green"
            aria-label="signup"
          >
            Signup
          </Button>
        </Link>
      </div>
      <h2 className="heading">
        <span className="first-letter:">Login</span>{" "}
        <span className="fontColor">Form</span>
      </h2>
      <Form className="form" onSubmitHandler={formik.handleSubmit}>
        <div className="content">
          <Label HTMLfor="email" className="label">
            Email
          </Label>
          <input
            className="input"
            // onChangeHandler={(e) => {
            //   onChangeHandler(e);
            // }}
            name="email"
            type="email"
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <span className="text-red-500">{formik.errors.email}</span>
          )}
        </div>
        <div className="content">
          <Label HTMLfor="password" className="label">
            Password
          </Label>
          <input
            className="input"
            // onChangeHandler={(e) => {
            //   onChangeHandler(e);
            // }}
            name="password"
            type="password"
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <span className="text-red-500">{formik.errors.password}</span>
          )}
        </div>
        <Button type="submit" className="btn" ariaLabel="login">
          Login
        </Button>
      </Form>
    </div>
  );
}
