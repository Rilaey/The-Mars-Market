import { useState, useEffect } from 'react';
import { UPDATE_POST } from '../utils/mutations';
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_POST } from "../utils/queries";
import auth from "../utils/auth";
import { useParams, useNavigate } from "react-router-dom";

export default function CreatePost() {
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        if (!formState.title) {
            errors.title = 'Title is required';
        }
        if (!formState.description) {
            errors.description = 'Description is required';
        }
        if (!formState.price || isNaN(formState.price)) {
            errors.price = 'Price is required and must be a number';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };


    const { id } = useParams();
    const { loading, data } = useQuery(QUERY_POST, {
        variables: { id: id },
    });

    const post = data?.post || {};
    let editedPost = { ...post };

    const [formState, setFormState] = useState({
        title: editedPost.title,
        description: editedPost.description,
        price: editedPost.price,
        _id: id
    });

    const [updatePost, { error }] = useMutation(UPDATE_POST);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleCancel = () => {
        navigate(`/profile/${auth.getProfile().data._id}`);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            try {
                const { title, description, price, _id } = formState;
                const priceAsFloat = parseFloat(price);
                const { data } = await updatePost({
                    variables: { updatePostId: _id, title, description, price: priceAsFloat },
                });
                navigate(`/profile/${auth.getProfile().data._id}`);
                window.location.reload();
            } catch (error) {
                console.error(error);
            }
        }
    };


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                {loading ? (
                    <div className="flex justify-center items-center text-center min-h-[95vh]">
                        <button className="btn btn-square loading"></button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="title"
                                    className={`input input-bordered ${formErrors.title ? 'input-error' : ''}`}
                                    name="title"
                                    value={formState.title}
                                    onChange={handleChange}
                                />
                                {formErrors.title && <p className="text-xs text-error">{formErrors.title}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="price"
                                    className={`input input-bordered ${formErrors.price ? 'input-error' : ''}`}
                                    name="price"
                                    value={formState.price}
                                    onChange={handleChange}
                                />
                                {formErrors.price && <p className="text-xs text-error">{formErrors.price}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea
                                    className={`input input-bordered ${formErrors.description ? 'input-error' : ''}`}
                                    name="description"
                                    placeholder="description"
                                    value={formState.description}
                                    onChange={handleChange}
                                />
                                {formErrors.description && <p className="text-xs text-error">{formErrors.description}</p>}
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary" type="submit">
                                    Save Changes
                                </button>
                                <button className="btn btn-error mt-4" onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}