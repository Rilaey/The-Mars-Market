import { useState } from 'react';
import { CREATE_POST } from '../utils/mutations';
import { useMutation } from "@apollo/client";

export default function CreatePost() {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        postImgs: [],
    });

    const [createPost, { error, data }] = useMutation(CREATE_POST)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { title, description, price, postImgs } = formData;
            const priceAsFloat = parseFloat(price)
            const { data } = await createPost({
                variables: { title, description, price: priceAsFloat, postImgs },
            });
            console.log(data);
            // Reset form data if desired
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center">
                    <h1 className="text-2xl font-bold pb-2">Upload an Image!</h1>
                    <input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
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
                                    value={formData.title}
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
                                    value={formData.price}
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
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary" type="submit">Create Post</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
}
