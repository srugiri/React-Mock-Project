import AppContext from "./AppContext";
import React, { useState } from "react";

export default function AppState(props) {
  let [myBlogs, setMyBlogs] = useState(false);
  let [allBlog, setAllBlogs] = useState(true);
  let [liked, setLiked] = useState(false);
  let [category, setCategory] = useState([]);
  let [cat, setCat] = useState("");
  let [title, setTitle] = useState("");
  //   let [user, setUser] = useState(true)
  return (
    <AppContext.Provider
      value={{
        myBlogs,
        setMyBlogs,
        allBlog,
        setAllBlogs,
        liked,
        setLiked,
        category,
        setCategory,
        cat,
        setCat,
        title,
        setTitle,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
