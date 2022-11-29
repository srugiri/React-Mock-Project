import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "../../atoms/Button";
import Img from "../../atoms/Img/Img";
import ImageConverter from "../../ImageConverter";
import ImageContext from "../../../context/ImageContext";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Label from "../../atoms/Label/Label";
import "./AddBlog.css";
import { getMyBlogs } from "../../../redux/actions/blogs.action";

export default function AddBlog() {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [featuredImage, setFeaturedImage] = useState();
  const [category, setCategory] = useState([]);
  const contextData = useContext(ImageContext);
  let [contentError, setContentError] = useState(false);
  let [add, setAdd] = useState("");

  let { categories } = useSelector((state) => state.allBlogs);

  let navigate = useNavigate();

  useEffect(() => {
    console.log(featuredImage);
  }, [featuredImage]);

  useEffect(() => {
    getMyBlogs();
  }, [add]);

  const saveData = async (inputForm) => {
    let res = await fetch("http://localhost:3000/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputForm),
    });
    let data = await res.json();
    console.log(data);
    setAdd("Added Successfully");
    toast.success("Blog has been Added Successfully");
  };

  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "header",
    "blockquote",
    "code-block",
    "indent",
    "list",
    "direction",
    "align",
    "link",
    "image",
    "video",
    "formula",
  ];

  // const imgModules ={
  //   toolbar: [
  //     ['image'],
  //   ]
  // }

  let modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formik = useFormik({
    initialValues: {
      content: "",
      title: "",
      blogger_id: parseInt(sessionStorage.getItem("user-id")),
      likes: [],
      username: sessionStorage.getItem("username"),
      date_created: new Date(),
      shortDescription: "",
    },
    onSubmit: function () {
      let data = {
        title: formik.values.title,
        content: value,
        blog_img: contextData.blogImage,
        category: category,
        blogger_id: formik.values.blogger_id,
        likes: formik.values.likes,
        username: formik.values.username,
        date_created: formik.values.date_created,
        shortDescription: formik.values.shortDescription,
      };
      if (data.content === "") {
        setContentError(true);
      } else {
        setContentError(false);
        saveData(data);
        navigate("/myBlogs");
      }
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
    }),
  });

  return (
    <div className="blogForm max-mobile:m-0">
      <form onSubmit={formik.handleSubmit}>
        <Label HTMLfor="title" className="text-2xl hidden">
          Post Title
        </Label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          className="blogTitleInput"
          //
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        {formik.touched.title && formik.errors.title && (
          <span className="text-red-500">{formik.errors.title}</span>
        )}
        <div className="select">
          <select
            className="blogSelect"
            onChange={(e) => {
              console.log(e.target.value);
              setCategory([...category, e.target.value]);
              console.log(category);
            }}
            name="categoy"
          >
            <option>---Select your Category---</option>
            {categories?.map((category) => {
              return (
                <option value={category} key={category}>
                  {category}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          {category.length === 0
            ? ""
            : category.map((item) => {
                return (
                  <span className="m-1 p-1 bg-black rounded text-white">
                    {item}
                  </span>
                );
              })}
        </div>
        <Label HTMLfor="Image" className="text-lg font-semibold mt-2">
          Featured Image
        </Label>
        <ImageConverter />
        <Img
          id="image"
          src={contextData.blogImage}
          alt={contextData.blogImage}
          ariaLabel="blog image"
          className="w-52 h-52"
          // width="200px"
          // height="200px"
        />
        <Label
          HTMLfor="short-description"
          className="text-lg font-semibold mt-2"
        >
          Short Description
        </Label>
        <div>
          <textarea
            type="text"
            id="short-description"
            name="shortDescription"
            rows="2"
            cols="58"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.shortDescription}
            className="blogDes"
          ></textarea>
        </div>
        <Label HTMLfor="content" className="text-lg font-semibold mt-2">
          Post Content
        </Label>
        <ReactQuill
          theme="snow"
          id="content"
          value={value}
          modules={modules}
          onChange={setValue}
          formats={formats}
          className="border border-black py-4 w-full"
        />
        {contentError == true ? (
          <span className="text-red-500">Content cannot be empty</span>
        ) : null}
        <Button
          className="mt-2"
          aria-label="add-blog"
          onClickHandler={() => {
            // saveData();
            // navigate("/allBlogs");
          }}
        >
          Add Blog
        </Button>
        {/* <Post/> */}
      </form>
    </div>
  );
}
