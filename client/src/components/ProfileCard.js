import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_POST } from '../utils/mutations';
import { useNavigate } from "react-router-dom";



export default function ProfileCard(props) {
    const navigate = useNavigate();
    const [showModal, setShowModal] = React.useState(false);

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
        <div className="card sm:w-96 bg-base-100 shadow-xl m-[24px] w-[21rem]">
            <div className="flex justify-end p-2">
                <>
                    <button onClick={() => setShowModal(true)} type="button" className="btn btn-circle btn-outline btn-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                    {showModal ? (
                        <>
                            <div
                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                            >
                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                    {/*content*/}
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-base-100 outline-none focus:outline-none">
                                        {/*header*/}
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                            <h3 className="text-3xl font-bold">
                                                Are you sure you want to delete this item?
                                            </h3>
                                        </div>
                                        {/*body*/}
                                        <div className="relative p-6 flex-auto">
                                            <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                                Once you delete it, all associated data will be permanently removed and cannot be retrieved. This action cannot be undone. Please ensure that you have selected the correct item for deletion before proceeding. If you are unsure, please cancel and double-check before proceeding with the deletion. By clicking 'Confirm', you acknowledge that you understand the consequences of deleting this item and accept full responsibility for any data loss that may occur.
                                            </p>
                                        </div>
                                        {/*footer*/}
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                            <button
                                                className="btn btn-ghost mx-2"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="btn btn-error"
                                                type="button"
                                                onClick={() => {
                                                    handleDelete();
                                                    setShowModal(false)
                                                }
                                                }
                                            >
                                                Confirm
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}
                </>
            </div>
            <figure><img
                className="h-[256.67px]"
                src={props.image}
                alt="Seller's Item"
                onClick={() => {
                    navigate("/item/" + props.post)
                    window.scrollTo(0, 0);
                }}
                style={{ cursor: 'pointer' }} /></figure>
            <div className="card-body">
                <div className="flex justify-between">
                    <h2 className="card-title">{props.title}</h2>
                </div>
                <p>{currencyFormat(props.price)}</p>
                <p className="overflow-hidden text-ellipsis whitespace-nowrap">{props.description}</p>
                <div className="card-actions justify-end">
                    <button onClick={() => {
                        setTimeout(() => {
                            navigate(`/editpost/${props.edit}`);
                        }, 1000);
                        navigate(`/loading/${props.post}`);
                    }} className="btn btn-primary">Edit</button>
                </div>
            </div>
        </div>
    );
}
