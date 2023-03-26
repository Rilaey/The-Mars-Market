import FileBase64 from "react-file-base64";
import { useState, useEffect } from "react";
import { CREATE_POST } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import auth from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    price: "",
    postImgs: [],
    user: auth.getProfile().data._id
  });


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

  const [createPost, { error, data }] = useMutation(CREATE_POST);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
    try {
      const { title, description, price, postImgs, user } = formState;
      const priceAsFloat = parseFloat(price);
      const { data } = await createPost({
        variables: {
          title,
          description,
          price: priceAsFloat,
          postImgs,
          user: auth.getProfile().data._id
        }
      });
      navigate(`/profile/${auth.getProfile().data._id}`);
      window.location.reload();
      // Reset form data if desired
    } catch (error) {
      console.error(error);
    }
  }
  };

  const handleCancel = () => {
    navigate(`/profile/${auth.getProfile().data._id}`);
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center">
          {/* <h1 className="text-2xl font-bold pb-2">Upload an Image!</h1> */}
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
                  type="text"
                  placeholder="description"
                  className={`input input-bordered ${formErrors.description ? 'input-error' : ''}`}
                  name="description"
                  value={formState.description}
                  onChange={handleChange}
                />
                {formErrors.description && <p className="text-xs text-error">{formErrors.description}</p>}
              </div>
              <div className="input-file">
              <FileBase64
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setFormState({
                    title: formState.title,
                    description: formState.description,
                    price: formState.price,
                    postImgs: base64,
                    user: auth.getProfile().data._id
                  })
                }
              />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" type="submit">
                  Create Post
                </button>
                <button className="btn btn-error mt-4" onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
