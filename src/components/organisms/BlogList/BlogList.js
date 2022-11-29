import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getAllBlogs,
  getCategory,
  getCategoryBlogs,
  getMyBlogs,
  getSearchBlogs,
  getUser,
} from "../../../redux/actions/blogs.action";
import Button from "../../atoms/Button";
import Blog from "../../molecules/Blog/Blog";
import AddBlog from "../AddBlog/AddBlog";
import AppContext from "../../../context/AppContext";
import Input from "../../atoms/Input/Input";
import Label from "../../atoms/Label/Label";
import Img from "../../atoms/Img/Img";
import "./BlogList.css";

export default function BlogList() {
  let { allBlogs, categories, allBlogs_loaded } = useSelector(
    (state) => state.allBlogs
  );

  let { myBlogs, myBlogs_loaded } = useSelector((state) => state.allBlogs);
  let { user } = useSelector((state) => state.users);
  // let { users } = useSelector((state) => state.users);
  // console.log(users[0]?.name);

  let { id } = useParams();
  let dispatch = useDispatch();
  let contextData = useContext(AppContext);
  // let [title, setTitle] = useState("");
  let [currentPage, SetCurrentPage] = useState(1);
  let [page, SetPage] = useState([]);
  let totalpages = 10;

  let userId = sessionStorage.getItem("user-id");

  useEffect(() => {
    dispatch(getAllBlogs(id, userId, currentPage));
    dispatch(getMyBlogs(userId, currentPage));
    dispatch(getCategory());
    dispatch(getUser(userId));
    console.log(currentPage);
  }, [id, allBlogs_loaded, myBlogs_loaded, currentPage]);

  useEffect(() => {
    dispatch(getAllBlogs(id, userId));
    dispatch(getCategory());
  }, []);

  const selectCategory = (category) => {
    contextData.setCategory(category);
  };

  useEffect(() => {
    dispatch(getCategoryBlogs(contextData.category));
  }, [contextData.category]);

  const handleInputChange = (e) => {
    contextData.setTitle(e);
  };
  useEffect(() => {
    SetPage(Array.from(Array(totalpages + 1).keys()));
  }, []);

  useEffect(() => {
    if (contextData.title == "") {
      dispatch(getAllBlogs());
    } else {
      // handleInputChange()
      dispatch(getSearchBlogs(contextData.title));
    }
  }, [contextData.title]);

  return (
    <div className="pt-16 max-mobile:max-w-full blogList">
      <div className="mainBlog">
        <div className="blogs">
          {id !== "addBlog" ? (
            id == "myBlogs" ? (
              myBlogs?.map((blog) => {
                return <Blog blog={blog} key={blog.id} />;
              })
            ) : (
              allBlogs?.map((blog) => {
                return <Blog blog={blog} key={blog.id} />;
              })
            )
          ) : (
            <AddBlog />
          )}
        </div>

        {allBlogs.length == 0 && id != "addBlog" ? (
          <div className="availability">No Blogs Available</div>
        ) : null}

        {id == "allBlogs" || id == null ? (
          <div className="description">
            <div className="fixed w-80 top-24 right-16 max-md:w-36 max-md:right-3 max-lg:w-58 max-mobile:hidden">
              <Label className="hidden" HTMLfor="search">
                Search
              </Label>

              <Input
                type="text"
                id="search"
                placeholder="Search"
                className="search px-2 py-1 mt-8"
                onChangeHandler={(e) => {
                  handleInputChange(e.target.value);
                }}
              />
            </div>
            <div className="fixed flex flex-wrap justify-center items-center top-48  max-mobile:hidden">
              {categories?.map((category) => {
                return (
                  <Button
                    ariaLabel="category"
                    key={category}
                    onClickHandler={() => {
                      selectCategory(category);
                      // contextData.setCat(category);
                    }}
                    // bg="#88c8fc"
                    bg={
                      contextData.category === category
                        ? "rgb(0,0,0)"
                        : "#808080"
                    }
                    text={
                      contextData.category === category
                        ? "#808080"
                        : "rgb(0,0,0)"
                    }
                    className="px-5 py-2 my-2 shadow-md category"
                  >
                    {category}
                  </Button>
                );
              })}
            </div>
          </div>
        ) : null}

        {id == "myBlogs" ? (
          <div className="myBlogs pt-0">
            <div className=" max-mobile:hidden">
              <span>
                <Img
                  src={user?.avatarImg}
                  alt="avatarImg"
                  className="w-60 rounded-full max-mobile:hidden"
                />
              </span>

              <div className=" max-mobile:hidden">
                <strong>Name : </strong>
                {user?.name}
              </div>

              <div className=" max-mobile:hidden">
                <strong>Email : </strong>
                {user?.email}
              </div>

              <div className=" max-mobile:hidden">
                <strong>Username : </strong>
                {user?.username}
              </div>
            </div>
            {/* <div className="my-2 max-mobile:hidden">
              <span className="text-2xl font-bold">Other Users</span>
              {users?.slice(0, 4).map((user) => {
                return (
                  <span
                    key={user.id}
                    className="text-black flex items-center mb-2"
                  >
                    <span>
                      <Img
                        src={user.avatarImg}
                        alt="avatar-img"
                        className="w-14 h-14 rounded-full"
                      />
                    </span>
                    <span className="px-2">{user.name}</span>
                  </span>
                );
              })}
            </div> */}
          </div>
        ) : null}
      </div>
      {id !== "addBlog" ? (
        <div className="flex justify-center paginate max-mobile:text-xs">
          <button
            className="mx-4 bg-black text-white px-2 py-1 rounded-md"
            onClick={() => {
              SetCurrentPage(1);
            }}
            disabled={currentPage === 1 ? true : false}
          >
            {" "}
            First
          </button>
          <button
            aria-labelledby="previous page"
            aria-label="previous page"
            className=" bg-black text-white px-2 py-1 rounded-md"
            onClick={() => {
              SetCurrentPage(currentPage - 1);
            }}
            disabled={currentPage === 1 ? true : false}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
              />
            </svg>
            <span className="hidden">prev</span>
          </button>

          {page.map((item) => {
            if (
              item !== 0 &&
              item >= currentPage - 1 &&
              item <= currentPage + 1
            ) {
              return (
                <button
                  key={item}
                  className={`text-white mx-2 px-2 rounded-lg ${
                    item === currentPage ? "bg-gray-600" : "bg-black "
                  }`}
                  onClick={() => {
                    SetCurrentPage(item);
                  }}
                >
                  {item}
                </button>
              );
            }
          })}

          <button className="">...</button>
          {page.map((item) => {
            if (item !== 0 && item >= totalpages - 1) {
              return (
                <button
                  key={item}
                  className={`text-white mx-2 px-2 rounded-lg ${
                    item === currentPage ? "bg-gray-500" : "bg-black"
                  }`}
                  onClick={() => {
                    SetCurrentPage(item);
                  }}
                >
                  {item}
                </button>
              );
            }
          })}
          <button
            aria-labelledby="next page"
            aria-label="next page"
            className="bg-black text-white px-2 py-1 rounded-md"
            onClick={() => {
              SetCurrentPage(currentPage + 1);
            }}
            disabled={currentPage === totalpages ? true : false}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
              />
            </svg>
            <span className="hidden">next</span>
          </button>
          <button
            aria-labelledby="Last Page"
            className="mx-4 bg-black text-white px-2 py-1 rounded-md"
            onClick={() => {
              SetCurrentPage(10);
            }}
            disabled={currentPage === 10 ? true : false}
          >
            {" "}
            Last
          </button>
        </div>
      ) : null}
    </div>
  );
}
