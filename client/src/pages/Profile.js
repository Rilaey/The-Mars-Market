import React from 'react';
import ProfileCard from '../components/ProfileCard';
import Card from '../components/Card';
import { BsPersonCircle } from 'react-icons/bs';
import { AiOutlineMail } from 'react-icons/ai'
import {HiPhone} from 'react-icons/hi';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { useParams } from 'react-router-dom';
import auth from "../utils/auth";


export default function Profile() {
  const { profileId } = useParams()

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { _id: profileId },
  });

  const user = data?.user || {};

  if(loading) {
    return <div>Loading...</div>
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
            <p className="py-2 flex items-center"><AiOutlineMail className='mr-[8px] text-[20px]' />{user.email}</p>
            <p className="py-2 flex items-center"><HiPhone className='mr-[8px] text-[20px]' /> {user.phoneNumber}</p>
            <button className="my-2 btn btn-primary">New Post</button>
            <button className="my-2 mx-2 btn btn-primary">Edit Profile Info</button>
            <button className="my-2 mx-2 btn btn-primary">Edit Profile Picture</button>
          </div>
        </div>
      </div><h1 className="flex justify-center pt-[12px] text-5xl font-bold">Your Items</h1><div className='card-container justify-center items-center flex flex-wrap'>
          {user.posts.map(product => (
            <ProfileCard className="card" key={product._id} title={product.title} description={product.description} price={product.price} image={product.postImgs[0]} />
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
            <p className="py-2 flex items-center"><AiOutlineMail className='mr-[8px] text-[20px]' />{user.email}</p>
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
