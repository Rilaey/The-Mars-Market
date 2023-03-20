import { useState } from 'react';
import { UPDATE_POST } from '../utils/mutations';
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_POST } from "../utils/queries";
import auth from "../utils/auth";
import { useParams, useNavigate } from "react-router-dom";

export default function CreatePost() {
    const navigate = useNavigate();
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { title, description, price, _id } = formState;
            const priceAsFloat = parseFloat(price);
            const { data } = await updatePost({
                variables: { updatePostId: _id, title, description, price: priceAsFloat },
            });
            console.log('Success!');
            navigate(`/profile/${auth.getProfile().data._id}`);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                {loading ? (
                    <p>Loading...</p>
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
                                    className="input input-bordered"
                                    name="title"
                                    value={formState.title}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="price"
                                    className="input input-bordered"
                                    name="price"
                                    value={formState.price}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea
                                    type="text"
                                    className="input input-bordered"
                                    name="description"
                                    value={formState.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary" type="submit">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}