import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_POST } from '../utils/mutations';
import { useNavigate } from "react-router-dom";

export default function ProfileCard(props) {
    const navigate = useNavigate();

    function currencyFormat(num) {
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

        const [deletePost, { loading, error }] = useMutation(DELETE_POST);

        const handleDelete = () => {
            deletePost({ variables: { deletePostId: props.delete } })
            .then(() => {
                window.location.reload(); // Reloads the page after the mutation is completed
              })
              .catch((err) => {
                console.log(err);
              });
        };

        return (
            <div className="card sm:w-96 glass m-[24px] w-[21rem]" style={{ marginTop: "20px"}}>
                <div className="flex justify-end p-2">
                    <button onClick={handleDelete} className="btn btn-circle btn-outline btn-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <figure><img className="h-[256.67px]" src={props.image} alt="Seller Image" /></figure>
                <div className="card-body">
                    <div className="flex justify-between">
                        <h2 className="card-title" style={{ fontSize: "55px"}}>{props.title}</h2>
                    </div>
                    <p>{currencyFormat(props.price)}</p>
                    <p className="overflow-hidden text-ellipsis whitespace-nowrap">{props.description}</p>
                </div>
            </div>
        );
    }