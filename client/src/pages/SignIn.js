import { React, useState } from "react";
import { useMutation } from "@apollo/client";

import auth from "../utils/auth";

export default function SignIn(props) {
  //  TODO need to add mutation for login
  const [formState, setFormState] = useState({ email: "", password: "" });

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    });
  };
    // TODO add mutation to uncomment this
    // submit form
    // const handleFormSubmit = async (event) => {
    //   event.preventDefault();
    //   console.log(formState);
    //   try {
    //     const { data } = await login({
    //       variables: { ...formState },
    //     });

    //     Auth.login(data.login.token);
    //   } catch (e) {
    //     console.error(e);
    //   }

    //   // clear form values
    //   setFormState({
    //     email: '',
    //     password: '',
    //   });
    // };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                placeholder="password"
                className="input input-bordered"
              />
              <label className="label">
                <a href="/signup" className="label-text-alt link link-hover">
                  Create an account
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
