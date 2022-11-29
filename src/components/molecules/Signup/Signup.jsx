import React, { useContext, useEffect, useState } from "react";
import Form from "../../atoms/Form/Form";
import Input from "../../atoms/Input/Input";
import Label from "../../atoms/Label/Label";
import Button from "../../atoms/Button/Button";
import ImageContext from "../../../context/ImageContext";
import Img from "../../atoms/Img/Img";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import "../Login/Login.css";

export default function Signup() {
  let [signupForm, setSignupForm] = useState({});
  const [featuredImage, setFeaturedImage] = useState();
  let [imageURL, setImageURL] = useState("");
  let navigate = useNavigate();

  const contextData = useContext(ImageContext);

  useEffect(() => {
    console.log(featuredImage);
  }, [featuredImage]);

  // const onChangeHandler = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;

  //   setSignupForm({
  //     ...signupForm,
  //     [name]: value,
  //     avatarImg: contextData.avatar,
  //   });
  //   console.log(signupForm);
  // };

  const postUser = async (signupForm) => {
    try {
      let emailresponse = await fetch(
        `http://localhost:3000/users?email=${formik.values.email}`,
        {
          method: "GET",
          headers: { "Content-type": "Application/json" },
        }
      );
      let user_exist = await emailresponse.json();
      if (user_exist.length == 0) {
        let response = await fetch(`http://localhost:3000/users`, {
          method: "POST",
          headers: { "Content-type": "Application/json" },
          body: JSON.stringify(signupForm),
        });
        let message = await response.json();
        toast.success("User Registered");
        navigate("/auth/login");
        return message;
      } else {
        toast.error("User with same email exist");
      }
    } catch (error) {
      return error;
    }
  };

  // const onSubmitHandler = (e) => {
  //   e.preventDefault();
  //   postUser(signupForm).then((data) => {
  //     console.log(data);
  //     navigate("/auth");
  //   });
  // };

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: function () {
      let data = {
        name: formik.values.name,
        username: formik.values.username,
        email: formik.values.email,
        password: formik.values.password,
        avatarImg: contextData.avatar,
      };
      postUser(data).then((signup) => {
        console.log(signup);
      });

      // postUser(data);
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .test(
          "is-full-name",
          "Please enter both First and Last Name",
          (value) => {
            if (value != null) {
              let nameArray = value.split(" ");
              return nameArray.length >= 2;
            }
          }
        ),
      username: Yup.string().required("UserName is required"),
      email: Yup.string()
        .email("Email is not in proper format")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is needed")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must contain 8 chatacters, one Uppercase, One Lowercase, One Digit and One Special Character"
        ),
      confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("password"), null], "Passwords Does not Match"),
    }),
  });

  const convert = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      console.log(reader.result);
      setImageURL(reader.result);
      // contextData.setBlogImage(reader.result); //base64encoded string
      contextData.setAvatar(reader.result); //base64encoded string
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  return (
    <div className="loginForm">
      <div>
        <span className="font-semibold">
          If you are already registered Please
        </span>
        <Link to="/auth/login">
          <Button
            className="linkBtn text-green-700"
            bg="none"
            text="green"
            aria-label="login"
          >
            Login
          </Button>
        </Link>
      </div>
      <h2 className="heading">SignUp Form</h2>
      <Form className="form" onSubmitHandler={formik.handleSubmit}>
        <div className="content">
          <Label HTMLfor="name" className="label">
            Name
          </Label>
          <input
            // required={true}
            className="input"
            name="name"
            id="name"
            // onChangeHandler={(e) => {
            //   onChangeHandler(e);
            // }}
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <span className="text-red-500">{formik.errors.name}</span>
          )}
        </div>
        <div className="content">
          <Label HTMLfor="username" className="label">
            Username
          </Label>
          <input
            // required={true}
            className="input"
            name="username"
            id="username"
            // onChangeHandler={(e) => {
            //   onChangeHandler(e);
            // }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username && (
            <span className="text-red-500">{formik.errors.username}</span>
          )}
        </div>
        <div className="content">
          <Label HTMLfor="email" className="label">
            email
          </Label>
          <input
            // required={true}
            className="input"
            name="email"
            id="email"
            // onChangeHandler={(e) => {
            //   onChangeHandler(e);
            // }}
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <span className="text-red-500">{formik.errors.email}</span>
          )}
        </div>
        <div className="content">
          <Label HTMLfor="button-file">Profile</Label>
          <input
            accept="image/*"
            id="button-file"
            type="file"
            onChange={convert}
          />
          <Img
            src={contextData.avatar}
            alt="profile"
            // width="96px"
            // height="96px"
          />
        </div>
        <div className="content">
          <Label HTMLfor="password" className="label">
            password
          </Label>
          <input
            // required={true}
            className="input"
            name="password"
            id="password"
            // onChangeHandler={(e) => {
            //   onChangeHandler(e);
            // }}
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <span className="text-red-500">{formik.errors.password}</span>
          )}
        </div>
        <div className="content">
          <Label HTMLfor="confirmPassword" className="label">
            Confirm Password
          </Label>
          <input
            // required={true}
            className="input"
            name="confirmPassword"
            id="confirmPassword"
            // onChangeHandler={(e) => {
            //   onChangeHandler(e);
            // }}
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <span className="text-red-500">
              {formik.errors.confirmPassword}
            </span>
          )}
        </div>
        <Button
          disabled={false}
          className="btn"
          type="submit"
          aria-label="sign-up"
        >
          Signup
        </Button>
      </Form>
    </div>
  );
}
