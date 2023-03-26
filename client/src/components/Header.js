import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_TAGS, QUERY_USER } from "../utils/queries";
import { SET_DARK_MODE, REMOVE_DARK_MODE } from "../utils/mutations";
import { Link } from "react-router-dom";
import auth from "../utils/auth";
import logo from "../assets/logo.png";

function Header() {
  // The following code below is functionality for our future dark mode interaction. 
  // const [theme, setTheme] = useState("cupcake");
  // const toggleTheme = () => {
  //   setTheme(theme === "dark" ? "cupcake" : "dark");
  // };
  // initially set the theme and "listen" for changes to apply them to the HTML tag
  // useEffect(() => {
  //   document.querySelector("html").setAttribute("data-theme", theme);
  // }, [theme]);

  // const [setDarkMode, { loading: loading_set, data: data_set }] = useMutation(SET_DARK_MODE, {
  //   variables: { id: auth.getProfile().data._id }
  // });

  // const [removeDarkMode, { loading: loading_remove, data: data_remove }] = useMutation(REMOVE_DARK_MODE, {
  //   variables: { id: auth.getProfile().data._id }
  // });

  // const changeToDarkMode = () => {
  //   if (auth.getProfile().data.isDarkMode === false) {
  //     setDarkMode()
  //   }
  // };

  const navigate = useNavigate();
  const logout = (event) => {
    event.preventDefault();
    auth.logout();
  };

  // get user
  const { loading: loading_user, data: data_user } = useQuery(QUERY_USER, {
    variables: { _id: auth.loggedIn() ? auth.getProfile().data._id : "" }
  });
  const currentUser = data_user?.user || {};

  if (loading_user) {
    return <div></div>;
  }
  return (
    <div className="navbar bg-base-100 fixed z-10">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-xl p-0">
          <img className="w-[50px] h-[50px]" src={logo} />
        The Mars Market
        </a>
      </div>
      <div className="flex-none gap-3">

        {auth.loggedIn() ? (
          // This is the swap for dark/light mode. This will be implemented in our future development.
          // <>
          //   <label className="swap swap-rotate">
          //     <input type="checkbox" />
          //     <svg
          //       className="swap-on fill-current w-10 h-10"
          //       // onClick={() => changeToDarkMode()}
          //       xmlns="http://www.w3.org/2000/svg"
          //       viewBox="0 0 24 24"
          //     >
          //       <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          //     </svg>

          //     <svg
          //       className="swap-off fill-current w-10 h-10"
          //       // onClick={() => changeToDarkMode()}
          //       xmlns="http://www.w3.org/2000/svg"
          //       viewBox="0 0 24 24"
          //     >
          //       <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          //     </svg>
          //   </label>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  {auth.getProfile().data.profilePicture ? (
                    <img src={currentUser.profilePicture} />
                  ) : (
                    <img
                      src={
                        "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png"
                      }
                    />
                  )}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <li key={"profile-1"}>
                  <button
                    onClick={() => {
                      navigate(`/profile/${auth.getProfile().data._id}`);
                    }}
                  >
                    Profile
                  </button>
                </li>
                <li key={"logout-2"}>
                  <Link onClick={logout}>Logout</Link>
                </li>
              </ul>
            </div>
        ) : (
          <>
            <Link to="/signin">
              <button className="btn btn-outline btn-success">Login</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
