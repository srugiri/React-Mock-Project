import ImageContext from "./ImageContext";
import React, { useState } from "react";

export default function ImageState(props) {
  let [blogImage, setBlogImage] = useState(false);
  let [avatar, setAvatar] = useState(false);
//   let [user, setUser] = useState(true)
  return (
    <ImageContext.Provider
      value={{ blogImage,setBlogImage,avatar, setAvatar }}
    >
      {props.children}
    </ImageContext.Provider>
  );
  }