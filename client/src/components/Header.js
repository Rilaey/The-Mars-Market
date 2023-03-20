import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_TAGS, QUERY_USER } from "../utils/queries";
import { Link } from "react-router-dom";
import auth from "../utils/auth";

function Header() {
  const navigate = useNavigate();
  const logout = (event) => {
    event.preventDefault();
    auth.logout();
  };

  // get all tags
  const { loading:loading_tags, data:data_tags } = useQuery(QUERY_ALL_TAGS);
  const tags = data_tags?.getAllTags || [];

  // get user
  const { loading:loading_user, data:data_user } = useQuery(QUERY_USER, {
    variables: { _id: auth.loggedIn() ? auth.getProfile().data._id : "" },
  });
  const currentUser = data_user?.user || {}


  return (
    <div className="navbar bg-base-100 fixed z-10">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-xl">
        The Mars Market
        </a>
      </div>
      <div className="flex-none gap-3">
        <select className="select select-primary -sm:w-[50%] max-w-xs sm:flex overflow-y-scroll">
          {loading_tags ? (
            <option>Loading...</option>
          ) : (
            tags.map((name) => <option key={name._id}>{name.tagName}</option>)
          )}
        </select>

        {auth.loggedIn() ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {auth.loggedIn() ? (<img src={currentUser.profilePicture} />) : <img src={"https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png"} />}

              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li key={"profile-1"}>
                <button onClick={() => {
                  navigate(`/profile/${auth.getProfile().data._id}`)
                }}>Profile</button>
              </li>
              <li key={"logout-2"}>
                <Link onClick={logout}>Logout</Link>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/signup">
              <button className="btn btn-outline btn-success">Login</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
