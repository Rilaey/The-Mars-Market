import { React, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import auth from "../utils/auth";

export default function SignIn() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const [errors, setErrors] = useState({ email: "", password: "" }); // new state for form errors

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    // check if email is empty or not a valid email format
    if (!formState.email || !/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // check if password is empty
    if (!formState.password) {
      newErrors.password = "Please enter a password.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    if (validateForm()) {
      try {
        const { data } = await login({
          variables: { ...formState }
        });

        auth.login(data.login.token);

        setFormState({
          email: "",
          password: ""
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleFormSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Email"
                className={`input input-bordered ${errors.email ? 'input-error' : ''}`} // add input-error class if there's an error
                name="email"
                value={formState.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-xs text-error">{errors.email}</p>} {/* show error message */}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className={`input input-bordered ${errors.password ? 'input-error' : ''}`} // add input-error class if there's an error
                name="password"
                value={formState.password}
                onChange={handleChange}
              />
              {errors.password && <p className="text-xs text-error">{errors.password}</p>} {/* show error message */}
              <label className="label">
                <a href="/signup" className="label-text-alt link link-hover">
                  Create an account
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
