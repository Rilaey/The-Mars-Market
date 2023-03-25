import { React, useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { UPDATE_USER } from "../utils/mutations";
import auth from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
    const navigate = useNavigate();
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

        setErrors(errors);

        // Return true if there are no errors, false otherwise
        return Object.keys(errors).length === 0;
    };

    const { loading, data } = useQuery(QUERY_USER, {
        variables: { _id: auth.getProfile().data._id },
    });

    const user = data?.user || {};
    let editedUser = { ...user };

    const [formState, setFormState] = useState({
        firstName: editedUser.firstName,
        lastName: editedUser.lastName,
        email: editedUser.email,
        phoneNumber: editedUser.phoneNumber,
        username: editedUser.username,
        _id: auth.getProfile().data._id
    });

    const [updateUser, { error }] = useMutation(UPDATE_USER)

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            console.log(errors)
            return;
        }
        try {
            const { firstName, lastName, email, phoneNumber, username, _id } = formState;
            const { data } = await updateUser({
                variables: { firstName, lastName, email, phoneNumber, username, _id: auth.getProfile().data._id },
            });
            navigate(`/profile/${auth.getProfile().data._id}`)

            // Reset form data if desired
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // Get the user ID from the auth object
        const userId = auth.getProfile().data._id;
        console.log(`User ID: ${userId}`);
    }, []);

    const handleCancel = () => {
        navigate(`/profile/${auth.getProfile().data._id}`);
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
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" type="submit">Update Account Info</button>
                            <button className="btn btn-error mt-4" onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                    {errors && (
                        <div className="my-3 p-3 bg-danger text-white">{errors.message}</div>
                    )}
                </div>
            </div>
        </div>
    );
}