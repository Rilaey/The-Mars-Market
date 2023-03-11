import { useNavigate } from "react-router-dom";
import glub from "../assets/glub.png";

function Header() {
    const navigate = useNavigate();
    return (
        <div className="navbar bg-base-100 ">
            <div className="flex-1">
                <a href="/" className="btn btn-ghost normal-case text-xl">Project 3</a>
            </div>
            <div className="flex-none gap-3">
                <div className="form-control">
                    <input type="text" placeholder="Search for item" className="input input-bordered" />
                    
                </div>
                <select className="select select-primary max-w-xs">
                    <option disabled selected>Categories</option>
                    <option>Electronics</option>
                    <option>Home</option>
                    <option>Music</option>
                    <option>Vehicles</option>
                </select>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={glub} />
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;
