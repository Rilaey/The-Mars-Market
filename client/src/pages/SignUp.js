import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../utils/mutations";
import auth from "../utils/auth";

export default function SignUp() {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    // Validate first name
    if (!formState.firstName) {
      errors.firstName = "Please enter your first name";
    }

    // Validate last name
    if (!formState.lastName) {
      errors.lastName = "Please enter your last name";
    }

    // Validate email
    if (!formState.email) {
      errors.email = "Please enter your email address";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Validate phone number
    if (!formState.phoneNumber) {
      errors.phoneNumber = "Please enter your phone number";
    } else if (!/^\d{3}-\d{3}-\d{4}$/.test(formState.phoneNumber)) {
      errors.phoneNumber = "Please enter a valid phone number (e.g. 333-333-3333)";
    }

    // Validate username
    if (!formState.username) {
      errors.username = "Please enter a username";
    }

    // Validate password
    if (!formState.password) {
      errors.password = "Please enter a password";
    } else if (formState.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    setErrors(errors);

    // Return true if there are no errors, false otherwise
    return Object.keys(errors).length === 0;
  };

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    username: "",
    password: ""
  });

  const [createUser, { error, data }] = useMutation(CREATE_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    if (validateForm()) {
      try {
        const { data } = await createUser({
          variables: { ...formState },
        });

        auth.login(data.createUser.token);

        setFormState({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          username: "",
          password: "",
        });
      } catch (error) {
        console.error(error);
      }
    }
  };


  return (
    <div className="hero min-h-screen min-w-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
          <form onSubmit={handleFormSubmit} className="card-body">
            <div className="lg:flex">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className={`input input-bordered ${errors.firstName ? "border-error" : ""
                    }`}
                  name="firstName"
                  value={formState.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <small className="text-error">{errors.firstName}</small>
                )}
              </div>
              <div className="form-control lg:pl-2">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className={`input input-bordered ${errors.lastName && "input-error"}`}
                  name="lastName"
                  value={formState.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <small className="text-error">{errors.lastName}</small>
                )}
              </div>

            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className={`input input-bordered ${errors.email && "input-error"}`}
                name="email"
                value={formState.email}
                onChange={handleChange}
              />
              {errors.email && (
                <small className="text-error">{errors.email}</small>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="text"
                placeholder="Phone Number"
                className={`input input-bordered ${errors.phoneNumber && "input-error"}`}
                name="phoneNumber"
                value={formState.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && (
                <small className="text-error">{errors.phoneNumber}</small>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Username"
                className={`input input-bordered ${errors.username && "input-error"}`}
                name="username"
                value={formState.username}
                onChange={handleChange}
              />
              {errors.username && (
                <small className="text-error">{errors.username}</small>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className={`input input-bordered ${errors.password && "input-error"}`}
                name="password"
                value={formState.password}
                onChange={handleChange}
              />
              {errors.password && (
                <small className="text-error">{errors.password}</small>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <a href="/signin" className="label-text-alt link link-hover">
                  Already have an account?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Create Account</button>
            </div>
          </form>

          {error && (
            <div className="text-error flex justify-center pb-[20px] text-[16px]">{error.message.includes("email") ? "Email Already in Use" : "Username Already in Use"}</div>
          )}
        </div>
      </div>
    </div>
  );
}
