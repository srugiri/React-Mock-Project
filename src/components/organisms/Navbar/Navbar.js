import React, { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import Button from "../../atoms/Button";
import AppContext from "../../../context/AppContext";
import "./Navbar.css";
import toast from "react-hot-toast";
// import logo1 from "../../../logo1.jpg";
// import Img from "../../atoms/Img/Img";

export default function Navbar() {
  let contextData = useContext(AuthContext);
  let contextAppData = useContext(AppContext);

  let { id } = useParams();

  let navigate = useNavigate();
  // console.log(contextData.loggedIn);

  const onClickHandler = () => {
    contextData.setLoggedIn(false);
    sessionStorage.clear();
    localStorage.clear();
    toast.success("logged out");
  };
  const showAllBlogs = () => {
    contextAppData.setMyBlogs(false);
  };
  const showMyBlogs = () => {
    contextAppData.setMyBlogs(true);
  };
  const addBlog = () => {
    navigate("/addBlog");
  };

  return (
    <div>
      <div className="navbar ">
        <div className="menu ">
          <Link to="/">
            <Button bg="inherit" text="black" className="" aria-label="home">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-8 h-8"
              >
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
            </Button>
          </Link>
          <Link to="allBlogs" className="link hide">
            {sessionStorage.getItem("login") ? (
              <div className="list">
                <Button
                  aria-label="all-blogs"
                  bg="inherit"
                  text="white"
                  onClickHandler={showAllBlogs}
                >
                  All Blogs
                </Button>
              </div>
            ) : null}
          </Link>
          <Link to="myBlogs" className="link hide">
            {/* <Button
            bg="inherit"
            text="black"
            disabled={!sessionStorage.getItem('login')}
            onClickHandler={showMyBlogs}
          >
            My Blogs
          </Button> */}
            {sessionStorage.getItem("login") ? (
              <Button
                bg="inherit"
                text="white"
                aria-label="my-blogs"
                disabled={!sessionStorage.getItem("login")}
                onClickHandler={showMyBlogs}
              >
                My Blogs
              </Button>
            ) : null}
          </Link>
          <Link to="addBlog hide" className="link hide">
            {sessionStorage.getItem("login") ? (
              <Button
                bg="inherit"
                text="white"
                aria-label="add-blog"
                disabled={!sessionStorage.getItem("login")}
                onClickHandler={addBlog}
              >
                Add Blog
              </Button>
            ) : null}
            {/* <Button
            bg="inherit"
            text="black"
            disabled={!sessionStorage.getItem('login')}
            onClickHandler={addBlog}
          >
            Add Blog
          </Button> */}
          </Link>
        </div>

        <div className="flex items-center">
          {/* {sessionStorage.getItem('email')} */}
          {sessionStorage.getItem("login") ? (
            <span className="uppercase font-semibold mr-2 hide">
              {sessionStorage.getItem("name")}
            </span>
          ) : null}
          {sessionStorage.getItem("login") ? (
            <Link to={"userSettings/" + sessionStorage.getItem("user-id")}>
              <Button ariaLabel="settings" className="" bg="inherit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 01-.517.608 7.45 7.45 0 00-.478.198.798.798 0 01-.796-.064l-.453-.324a1.875 1.875 0 00-2.416.2l-.243.243a1.875 1.875 0 00-.2 2.416l.324.453a.798.798 0 01.064.796 7.448 7.448 0 00-.198.478.798.798 0 01-.608.517l-.55.092a1.875 1.875 0 00-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 01-.064.796l-.324.453a1.875 1.875 0 00.2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 01.796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 01.517-.608 7.52 7.52 0 00.478-.198.798.798 0 01.796.064l.453.324a1.875 1.875 0 002.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 01-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 001.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 01-.608-.517 7.507 7.507 0 00-.198-.478.798.798 0 01.064-.796l.324-.453a1.875 1.875 0 00-.2-2.416l-.243-.243a1.875 1.875 0 00-2.416-.2l-.453.324a.798.798 0 01-.796.064 7.462 7.462 0 00-.478-.198.798.798 0 01-.517-.608l-.091-.55a1.875 1.875 0 00-1.85-1.566h-.344zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </Link>
          ) : null}
          {/* <Link to={"userSettings/" + sessionStorage.getItem("user-id")}>
            <Button ariaLabel="settings" className="" bg="inherit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 01-.517.608 7.45 7.45 0 00-.478.198.798.798 0 01-.796-.064l-.453-.324a1.875 1.875 0 00-2.416.2l-.243.243a1.875 1.875 0 00-.2 2.416l.324.453a.798.798 0 01.064.796 7.448 7.448 0 00-.198.478.798.798 0 01-.608.517l-.55.092a1.875 1.875 0 00-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 01-.064.796l-.324.453a1.875 1.875 0 00.2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 01.796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 01.517-.608 7.52 7.52 0 00.478-.198.798.798 0 01.796.064l.453.324a1.875 1.875 0 002.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 01-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 001.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 01-.608-.517 7.507 7.507 0 00-.198-.478.798.798 0 01.064-.796l.324-.453a1.875 1.875 0 00-.2-2.416l-.243-.243a1.875 1.875 0 00-2.416-.2l-.453.324a.798.798 0 01-.796.064 7.462 7.462 0 00-.478-.198.798.798 0 01-.517-.608l-.091-.55a1.875 1.875 0 00-1.85-1.566h-.344zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </Link> */}
          {sessionStorage.getItem("login") ? (
            <Link to="/auth/login">
              <Button
                className="link hide"
                aria-label="logout"
                onClickHandler={() => {
                  onClickHandler();
                }}
              >
                Logout
              </Button>
            </Link>
          ) : (
            <Link to="/auth/signup" className="link">
              {id == "auth" ? null : (
                <Button
                  bg="#404040"
                  className="text-white"
                  aria-label="login-or-signup"
                >
                  Get Started
                </Button>
              )}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
