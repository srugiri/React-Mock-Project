import React, { useContext, useState } from "react";
import StyledButton from "../../atoms/Button/StyledButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import Button from "../../atoms/Button";
import AppContext from "../../../context/AppContext";
import { clear } from "@testing-library/user-event/dist/clear";
import toast from "react-hot-toast";

export default function Navbar1() {
  const [navbar, setNavbar] = useState(false);
  let contextData = useContext(AuthContext);
  let contextAppData = useContext(AppContext);
  let navigate = useNavigate();
  let { id } = useParams();
  // console.log(id);
  const onClickHandler = () => {
    contextData.setLoggedIn(false);
    sessionStorage.clear();
    localStorage.clear();
    toast.success("logged out");
  };
  const showAllBlogs = () => {
    contextAppData.setMyBlogs(false);
    contextAppData.setTitle("");
    contextAppData.setCategory("");
  };
  const showMyBlogs = () => {
    contextAppData.setMyBlogs(true);
  };
  const addBlog = () => {
    navigate("/addBlog");
  };
  return (
    <div className="fixed z-40 w-full opacity-90">
      <nav className="w-full bg-black shadow ">
        <div className="justify-between px-2 mx-auto my-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between md:py-5 md:block">
              <Link to="/" className="flex items-center">
                <span
                  onClick={showAllBlogs}
                  className="text-white uppercase font-bold text-xl"
                >
                  Blog
                </span>
                {/* <Button
                  bg="inherit"
                  text="black"
                  role="button"
                  aria-label="home"
                  aria-labelledby="home"
                >
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-8 h-8"
                  >
                    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                  </svg> */}
                  <span className="hidden">Home</span>
                {/* </Button> */}
              </Link>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <ul className="items-center justify-center md:flex md:space-x-6 md:space-y-0">
                <li className="text-white hover:text-indigo-200">
                  <Link to="/allBlogs">
                    {sessionStorage.getItem("login") ? (
                      <Button
                        bg="inherit"
                        text="inherit"
                        onClickHandler={showAllBlogs}
                      >
                        All Blogs
                      </Button>
                    ) : null}
                  </Link>
                </li>
                <li className="text-white hover:text-indigo-200">
                  <Link to="myBlogs">
                    {sessionStorage.getItem("login") ? (
                      <Button
                        bg="inherit"
                        text="inherit"
                        disabled={!sessionStorage.getItem("login")}
                        onClickHandler={showMyBlogs}
                      >
                        My Blogs
                      </Button>
                    ) : null}
                  </Link>
                </li>
                <li className="text-white hover:text-indigo-200">
                  <Link to="addBlog">
                    {sessionStorage.getItem("login") ? (
                      <Button
                        bg="inherit"
                        text="inherit"
                        disabled={!sessionStorage.getItem("login")}
                        onClickHandler={addBlog}
                      >
                        Add Blog
                      </Button>
                    ) : null}
                  </Link>
                </li>
              </ul>

              <div className="space-y-2 md:hidden flex flex-col">
                {sessionStorage.getItem("login") ? (
                  <span className="uppercase font-semibold mr-2 hide">
                    {sessionStorage.getItem("name")}
                  </span>
                ) : null}
                {sessionStorage.getItem("login") ? (
                  <Link
                    to={"userSettings/" + sessionStorage.getItem("user-id")}
                  >
                    <Button
                      ariaLabel="settings"
                      className="text-white"
                      bg="inherit"
                      text="white"
                    >
                      Settings
                    </Button>
                  </Link>
                ) : null}
                {sessionStorage.getItem("login") ? (
                  <Link to="/auth/login">
                    <Button
                      bg="inherit"
                      onClickHandler={() => {
                        onClickHandler();
                      }}
                      className=""
                      text="white"
                    >
                      Logout
                    </Button>
                  </Link>
                ) : (
                  <Link to="/auth/signup">
                    <Button bg="#404040" className="">
                      Get Started
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="hidden space-x-2 md:flex items-center">
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
                    fill=""
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </Button>
              </Link>
            ) : null}
            {sessionStorage.getItem("login") ? (
              <Link to="/auth/login">
                <Button
                  onClickHandler={() => {
                    onClickHandler();
                  }}
                  className=""
                >
                  Logout
                </Button>
              </Link>
            ) : (
              <Link to="/auth/signup">
                <Button bg="#404040" className="">
                  Get Started
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
