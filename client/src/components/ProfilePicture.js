import FileBase64 from 'react-file-base64';
import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PROFILE_PICTURE } from "../utils/mutations";
import auth from "../utils/auth";

export default function ProfilePicture() {
  const [formState, setFormState] = useState({
    addProfilePictureId: auth.getProfile().data._id,
    profilePicture: ""
  });

  const [addProfilePicture, { error, data }] = useMutation(ADD_PROFILE_PICTURE);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleFormSubmit = async (event) => {
    //  event.preventDefault();
    console.log(formState);

      try {
        const { data } = await addProfilePicture({
          variables: { ...formState },
        });

          console.log(data)
      } catch (error) {
        console.error(error);
      }
    }

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="hidden" onChange={handleChange} value={auth.getProfile().data._id}/>
      <FileBase64
          type="file"
          multiple={false}
          onDone={({ base64 }) => setFormState({ addProfilePictureId: auth.getProfile().data._id, profilePicture: base64 })}
        />
      <button className="btn btn-primary">Upload Profile Picture</button>
    </form>
  );
}
