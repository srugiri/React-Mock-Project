import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ImageContext from "../../../context/ImageContext";
import { getBlog, getComments } from "../../../redux/actions/blogs.action";
import Button from "../../atoms/Button";
import Img from "../../atoms/Img/Img";
import Input from "../../atoms/Input/Input";
import ImageConverter from "../../ImageConverter";
import CommentSection from "../../organisms/CommentSection/CommentSection";
import Label from "../../atoms/Label/Label";
import toast from "react-hot-toast";
import "./BlogPage.css";

export default function BlogPage() {
  let { blog } = useSelector((state) => state.allBlogs);

  const [title, setTitle] = useState(blog?.title);
  const [featuredImage, setFeaturedImage] = useState();
  const [category, setCategory] = useState([]);
  const [value, setValue] = useState("");
  let [showComment, setshowComment] = useState(false);

  let { categories } = useSelector((state) => state.allBlogs);
  // console.log(categories);

  const contextData = useContext(ImageContext);

  let { id } = useParams();
  // console.log(id);
  let dispatch = useDispatch();
  let [edit, setEdit] = useState(false);
  let [update, setUpdate] = useState("");
  let navigate = useNavigate();

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

  useEffect(() => {
    dispatch(getBlog(id));
  }, [id, edit]);

  useEffect(() => {
    setTitle(blog?.title);
    // console.log(title)
    setValue(blog?.content);
    setFeaturedImage(blog?.blog_img);
    // setSmallDescription(blog.small_description);
    setCategory(blog?.category);
    // contextData.setBlogImage(blog?.blog_img)
    // console.log(contextData.blog.blog_img)
  }, [blog]);

  const saveData = async () => {
    let res = await fetch(`http://localhost:3000/blogs/${blog.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: value,
        blog_img: contextData.blogImage,
        category: category,
        blogger_id: parseInt(sessionStorage.getItem("user-id")),
        likes: blog?.likes,
        username: sessionStorage.getItem("username"),
        date_created: new Date(),
      }),
    });
    let data = await res.json();
    console.log(data);
    toast.success("Updated Successfully");
    setUpdate("Updated Successfully");
  };
  useEffect(() => {
    console.log(update);
  }, [update]);

  const Opencomment = () => {
    setshowComment(true);

    dispatch(getComments(blog.id));
  };

  const Closecomment = () => {
    setshowComment(false);
  };
  const today = new Date(blog.date_created);
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  let month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "Nov",
    "Dec",
  ];
  let date = dd + " " + month[mm - 1];

  return (
    <div className="pt-12 bg-white">
      {!edit ? (
        <div className="flex justify-between h-full">
          <div className="pt-8 flex justify-center items-center max-mobile:pt-0">
            <span className=" basis-2/3 h-full bg-white w-full max-mobile:basis-5/6">
              <div className="m-4 p-4 flex flex-col max-w-72">
                <h1 className="text-4xl font-semibold pb-4">{blog?.title}</h1>
                <Img
                  src={blog?.blog_img}
                  alt={blog.title}
                  // width="1050px"
                  // height="1050px"
                  className="mb-10 w-96 h-80 max-mobile:w-60 max-mobile:h-52"
                />
                <div
                  className="text-xl w-full break-all"
                  dangerouslySetInnerHTML={{ __html: blog?.content }}
                ></div>
              </div>
            </span>
            <span className="basis-1/3 text-lg font-bold font-sans h-full ml-12 max-mobile:flex-col max-mobile:basis-1/6 max-mobile:ml-1">
              <span className="flex flex-col pt-32 w-full max-w-52 max-mobile:hidden">
                <span>Created By:- {blog?.username}</span>
                <span>Created On:- {date}</span>
              </span>

              <span className="pt-20 max-mobile:fixed">
                <span className="edit">
                  {sessionStorage.getItem("user-id") == blog?.blogger_id ? (
                    <Button bg="inherit" onClickHandler={() => setEdit(true)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="black"
                        className="w-8 h-8"
                        stroke="black"
                      >
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                        <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                      </svg>
                    </Button>
                  ) : null}
                </span>
                <span>
                  <Button
                    bg="inherit"
                    className="ml-1"
                    disabled={!sessionStorage.login}
                    onClickHandler={Opencomment}
                    ariaLabel="comment-box"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="black"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                      />
                    </svg>
                  </Button>
                  <div>
                    {showComment ? (
                      <CommentSection
                        blog={blog}
                        Opencomment={Opencomment}
                        Closecomment={Closecomment}
                        showComment={showComment}
                      />
                    ) : null}
                  </div>
                </span>
              </span>
            </span>
          </div>
        </div>
      ) : (
        <div className="pt-12 text-black w-full max-w-3xl">
          <div className="m-8 p-4">
            <div className="flex flex-col">
              <Label HTMLfor="blogTitle" className="text-3xl">
                Blog Title
              </Label>
              <Input
                id="blogTitle"
                type="text"
                name="blogTitle"
                value={title}
                onChangeHandler={(e) => {
                  setTitle(e.target.value);
                }}
                className="focus:outline-none focus:bg-slate-200 py-1 bg-inherit border-b-2 border-b-black focus:bg-opacity-0 focus:border-b-4 text-xl"
              />
            </div>
            <div className="flex flex-col py-4">
              <Label className="text-3xl">Category</Label>
              <select
                className="border-b-2 bg-inherit pt-2 border-b-black mb-2"
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
              <div>
                {category.length === 0
                  ? ""
                  : category.map((item) => {
                      return (
                        <span className="my-4 px-2 py-1 bg-black rounded text-white">
                          {item}
                        </span>
                      );
                    })}
              </div>
            </div>
            <div></div>
            <div className="flex flex-col">
              <Label className="text-3xl">Featured Image</Label>
              <ImageConverter />
              <Img src={contextData.blogImage} className="w-80" />
            </div>
            <div className="flex flex-col py-4">
              <Label className="text-2xl pb-2 font-semibold">
                Post Content
              </Label>
              <ReactQuill
                theme="snow"
                value={value}
                modules={modules}
                onChange={setValue}
                formats={formats}
                className="border border-black"
              />
            </div>
            <button
              bg="white"
              onClick={() => {
                saveData();
                setEdit(false);
              }}
              className="my-3 text-md font-semibold bg-gray-700 text-white px-5 rounded-md py-1"
            >
              Update Blog
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
