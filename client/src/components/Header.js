import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_TAGS } from "../utils/queries";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import glub from "../assets/glub.png";

function Header() {
  const { loading, data } = useQuery(QUERY_ALL_TAGS);
  const tags = data?.getAllTags || [];

  const navigate = useNavigate();
  return (
    <div className="navbar bg-base-100 fixed z-10">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-xl">
          Marketplace
        </a>
      </div>
      <div className="flex-none gap-3">
        <select className="select select-primary max-w-xs sm:flex overflow-y-scroll">
          {loading ? (
            <option>Loading...</option>
          ) : (
            tags.map((name) => <option key={name._id}>{name.tagName}</option>)
          )}
        </select>

        {Auth.loggedIn() ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={glub} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li key={"profile-1"}>
                <Link>
                  Profile
                </Link>
              </li>
              <li key={"logout-2"}>
                <Link>Logout</Link>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link to='/signup'>
              <button className="btn btn-outline btn-success">Login</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
