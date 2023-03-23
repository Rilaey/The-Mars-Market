import React from "react";
import auth from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";

export default function MasterButton() {
  console.log(auth.getProfile());
  return (
    <>
      {auth.getProfile().data.isAdmin === true ? (
        <Link to={process.env.REACT_APP_MASTER_PAGE}>
          <button className="my-2 mx-2 btn btn-primary">Master Page</button>
        </Link>
      ) : (
        ""
      )}
    </>
  );
}
