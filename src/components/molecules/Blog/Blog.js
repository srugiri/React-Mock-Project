import React, { useContext, useEffect, useState } from "react";
import Img from "../../atoms/Img/Img";
import Button from "../../atoms/Button/Button";
import LikeButton from "../../atoms/LikeButton/LikeButton";
import CommentSection from "../../organisms/CommentSection/CommentSection";
import { getComments, getUsers } from "../../../redux/actions/blogs.action";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import DeleteBlog from "../../organisms/DeleteBlog/DeleteBlog";
import "./Blog.css";

export default function Blog({ blog }) {
  const { id } = useParams();
  let { users, users_loaded } = useSelector((state) => state.users);
  let [user, setUser] = useState({});

  const addLike = async (addLike) => {
    let res = await fetch(`http://localhost:3000/blogs/${blog.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: addLike }),
    });
    // let data = await res.json();
    // console.log(data);
  };
  let arr;
  let [liked, setLiked] = useState(
    blog.likes.filter((like) => like == sessionStorage.getItem("user-id"))
      .length
      ? true
      : false
  );

  const likeBlog = () => {
    // console.log("clicked");

    if (liked) {
      setLiked(false);
      arr = blog.likes.filter((like) => {
        return like != sessionStorage.getItem("user-id");
      });
    } else {
      setLiked(true);
      arr = blog.likes;
      arr.push(parseInt(sessionStorage.getItem("user-id")));
    }

    function removeDuplicates(arr) {
      return [...new Set(arr)];
    }

    blog.likes = removeDuplicates(arr);
    addLike(removeDuplicates(arr));
  };

  let dispatch = useDispatch();
  let [showComment, setshowComment] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
  }, [users_loaded]);

  useEffect(() => {
    users.length !== 0 &&
      setUser(
        users?.find((user) => {
          return user?.id == blog?.blogger_id;
        })
      );
    // console.log(user);
  }, [users]);

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

  // const formattedToday = dd + "/" + mm + "/" + yyyy;

  return (
    <div>
      <div className=" blog-card max-mobile:w-80">
        <div className="w-3/4 min-h-40 m-3 max-mobile:max-h-44 ">
          <div className="flex items-center">
            <span className="rounded-full object-contain">
              <Img
                src={user?.avatarImg}
                alt="user profile"
                className="rounded-full w-12 h-12"
              />
            </span>
            <span className="pl-2">
              <span>{user?.name}</span>
              <div>Date:{date}</div>
            </span>
          </div>
          <div>
            <Link to={"/blog/" + blog.id}>
              <div className="title max-mobile:text-sm overflow-hidden">
                {blog.title}
              </div>
            </Link>
            {/* <div>{blog.id}</div> */}
            {/* <div dangerouslySetInnerHTML={{ __html: blog.content }}></div> */}

            <div className="mt-1.5">
              Category:
              {blog.category.map((cat) => (
                <span key={cat} className="blogCategory">
                  {cat}
                </span>
              ))}
            </div>
            <div className="shortDescription max-mobile:text-xs">
              {blog.shortDescription}
            </div>
            <span className="flex mt-4">
              <LikeButton
                className="flex"
                liked={liked}
                onClickHandler={likeBlog}
                disabled={!sessionStorage.login}
                aria-label="Like"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 max-mobile:w-6 max-mobile:h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                    />
                  </svg>
                </span>
                <span className="text-lg font-bold">{blog.likes.length}</span>
              </LikeButton>
              <Button
                bg="inherit"
                className="ml-1"
                disabled={!sessionStorage.login}
                onClickHandler={Opencomment}
                ariaLabel="comment"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="blue"
                  className="w-8 h-8  max-mobile:w-6 max-mobile:h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
              </Button>
              {id == "myBlogs" ? <DeleteBlog id={blog.id} /> : null}
            </span>
          </div>
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
        </div>
        <div className="m-3 meta max-mobile:max-h-28">
          <Link to={"/blog/" + blog.id}>
            <Img
              src={blog.blog_img}
              alt="blogImage"
              // width="300px"
              // height="300px"
              className="photo"
            />
          </Link>
          {/* <ul className="details"> */}
          {/* <li className="profileImg">
              <Img
                src={user?.avatarImg}
                alt="user profile"
                className="rounded-full w-12 h-12"
              />
            </li> */}
          {/* <li className="author">{user?.name}</li>
            <li className="date">{date}</li> */}
          {/* </ul> */}
        </div>
      </div>
    </div>
  );
}
