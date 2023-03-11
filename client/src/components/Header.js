import { useNavigate } from "react-router-dom";
import glub from "../assets/glub.png";

function Header() {
    const navigate = useNavigate();
    return (
        <div className="navbar bg-base-100 fixed">
            <div className="flex-1">
                <a href="/" className="btn btn-ghost normal-case text-xl">Project 3</a>
            </div>
            <div className="flex-none gap-3">
                <div className="form-control hidden sm:flex">
                    <input type="text" placeholder="Search for item" className="input input-bordered" />
                </div>
                <button className="btn btn-ghost btn-circle flex sm:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
                <select className="select select-primary max-w-xs hidden sm:flex">
                    <option disabled>Categories</option>
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
                                <span className="badge">New</span>
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
