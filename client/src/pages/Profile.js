import React, { useState, useEffect } from 'react';
import ProfileCard from '../components/ProfileCard';
import Card from '../components/Card';
import { BsPersonCircle } from 'react-icons/bs';
import { AiOutlineMail } from 'react-icons/ai'
import {HiPhone} from 'react-icons/hi';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { useParams } from 'react-router-dom';
import auth from "../utils/auth";
import ProfilePicture from '../components/ProfilePicture';
import { useNavigate } from "react-router-dom";


export default function Profile() {
  useEffect(() => {
    console.log("working")
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const { profileId } = useParams()

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { _id: profileId },
  });

  const user = data?.user || {};

  if(loading) {
    return <div className='flex justify-center items-center text-center min-h-[95vh]'>
    <button className="btn btn-square loading"></button>
    </div>
  }

  return (
    <>
      <>{auth.getProfile().data._id === user._id ? <><div className="pt-[24px] hero bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          {user.profilePicture ?
            <img src={user.profilePicture} className="max-w-sm rounded-lg shadow-2xl w-[345px]" />
            :
            <img src="https://t3.ftcdn.net/jpg/00/57/04/58/360_F_57045887_HHJml6DJVxNBMqMeDqVJ0ZQDnotp5rGD.jpg" className="max-w-sm rounded-lg shadow-2xl w-[345px]" />}
          <div>
            <h1 className="text-5xl font-bold flex items-center">{user?.firstName + " " + user.lastName}</h1>
            <div className="divider"></div>
            <div className="pb-2 flex items-center"><BsPersonCircle className='mr-[8px] text-[20px]' />{user.username}</div>
            <a href={`mailto:${user.email}`} className="py-2 flex items-center link link-hover link-primary"><AiOutlineMail className='mr-[8px] text-[20px]' />{user.email}</a>
            <p className="py-2 flex items-center"><HiPhone className='mr-[8px] text-[20px]' /> {user.phoneNumber}</p>
            <button onClick={() => {
              navigate("/createpost/" + profileId)
            }} className="my-2 btn btn-primary">New Post</button>
            <button className="my-2 mx-2 btn btn-primary" onClick={() => {
              navigate("/editprofile/" + profileId)
            }}>Edit Profile Info</button>
              <ProfilePicture />
          </div>
        </div>
      </div><h1 className="flex justify-center pt-[12px] text-5xl font-bold">Your Items</h1><div className='card-container justify-center items-center flex flex-wrap'>
          {user.posts.map(product => (
            <ProfileCard className="card" post={product._id} edit={product._id} delete={product._id} key={product._id} title={product.title} description={product.description} price={product.price} image={product.postImgs[0]} />
          ))}
        </div></> : <><div className="pt-[24px] hero bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          {user.profilePicture ?
            <img src={user.profilePicture} className="max-w-sm rounded-lg shadow-2xl w-[345px]" />
            :
            <img src="https://t3.ftcdn.net/jpg/00/57/04/58/360_F_57045887_HHJml6DJVxNBMqMeDqVJ0ZQDnotp5rGD.jpg" className="max-w-sm rounded-lg shadow-2xl w-[345px]" />}
          <div>
            <h1 className="text-5xl font-bold flex items-center">{user?.firstName + " " + user.lastName}</h1>
            <div className="divider"></div>
            <div className="pb-2 flex items-center"><BsPersonCircle className='mr-[8px] text-[20px]' />{user.username}</div>
            <a href={`mailto:${user.email}`} className="py-2 flex items-center link link-hover link-primary"><AiOutlineMail className='mr-[8px] text-[20px]' />{user.email}</a>
            <p className="py-2 flex items-center"><HiPhone className='mr-[8px] text-[20px]' /> {user.phoneNumber}</p>
          </div>
        </div>
      </div><h1 className="flex justify-center pt-[12px] text-5xl font-bold">Seller's Items</h1><div className='card-container justify-center items-center flex flex-wrap'>
          {user.posts.map(product => (
            <Card className="card" post={product._id} key={product._id} title={product.title} description={product.description} price={product.price} image={product.postImgs[0]} />
          ))}
        </div></>}</>
    </>
  )
}
