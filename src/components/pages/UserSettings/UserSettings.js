import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ImageContext from "../../../context/ImageContext";
import { getUser } from "../../../redux/actions/blogs.action";
import Button from "../../atoms/Button";
import Form from "../../atoms/Form/Form";
import Img from "../../atoms/Img/Img";
import Input from "../../atoms/Input/Input";
import Label from "../../atoms/Label/Label";
import "./UserSettings.css";

export default function UserSettings() {
  let { id } = useParams();
  let dispatch = useDispatch();
  let { user } = useSelector((state) => state.users);

  const contextData = useContext(ImageContext);
  let [featuredImage, setFeaturedImage] = useState();
  // let [signupForm, setSignupForm] = useState({});
  let [imageUrl, setImageUrl] = useState();
  let [name, setName] = useState();
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
  let [avatar, setAvatar] = useState();
  // let [validatePassword, setValidatePassword] = useState(true);
  useEffect(() => {
    // console.log(featuredImage);
  }, [featuredImage]);

  useEffect(() => {
    dispatch(getUser(id));
  }, []);

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setPassword(user?.password);
    setAvatar(user?.avatarImg);
  }, [user]);

  const convert = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      // console.log(reader.result);
      setImageUrl(reader.result);
      setAvatar(reader.result); //base64encoded string
    };

    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const updateUserData = async () => {
    if (name == "") {
      toast.error("Cannot Keep Name Empty");
    } else {
      let emailresponse = await fetch(
        `http://localhost:3000/users?email=${email}`,
        {
          method: "GET",
          headers: { "Content-type": "Application/json" },
        }
      );
      let user_exist = await emailresponse.json();
      // console.log(user_exist[0].email)
      if (user_exist.length == 0 || user_exist[0].email == user?.email) {
        let res = await fetch(`http://localhost:3000/users/${user?.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            avatarImg: avatar,
          }),
        });
        // let data = await res.json();
        // console.log(data);
        toast.success("Details Updated");
      } else {
        toast.error("User with same email exist");
      }
    }
  };

  return (
    <div className="pt-28 flex justify-center">
      <Form
        className="userForm border-2 border-black w-fit p-4 rounded-md"
        onSubmitHandler={() => updateUserData()}
      >
        <div className="userSection">
          <Label HTMLfor="name" className="label">
            Name
          </Label>
          <Input
            // required={true}
            className="userInput"
            name="name"
            id="name"
            onChangeHandler={(e) => {
              setName(e.target.value);
            }}
            type="text"
            value={name}
          />
        </div>
        <div className="userSection">
          <Label HTMLfor="username" className="label">
            Username
          </Label>
          <Input
            //   required={true}
            disabled={true}
            className="userInput"
            name="username"
            id="username"
            value={user?.username}
            type="text"
          />
        </div>
        <div className="userSection">
          <Label HTMLfor="email" className="label">
            Email
          </Label>
          <Input
            required={true}
            className="userInput"
            name="email"
            id="email"
            onChangeHandler={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            type="email"
          />
        </div>
        <div className="userSection">
          <Label HTMLfor="button-file" className="label">
            Profile Picture
          </Label>
          <input
            accept="image/*"
            id="button-file"
            type="file"
            onChange={convert}
          />
        </div>
        <div className="userSection">
          <Img src={avatar} alt="avatarImg" className="w-full h-full" />
        </div>
        <div className="userSection">
          <Label HTMLfor="password" className="label">
            Password
          </Label>
          <Input
            required={true}
            className="userInput"
            name="password"
            id="password"
            onChangeHandler={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            value={password}
          />
        </div>

        <Button disabled={false} className="bg-black text-black my-3">
          Update User
        </Button>
      </Form>
    </div>
  );
}
