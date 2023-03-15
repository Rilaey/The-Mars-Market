import React from 'react';
import Card from '../components/Card';
import glub from '../assets/glub.png';
import { BsPersonCircle } from 'react-icons/bs';
import { AiOutlineMail } from 'react-icons/ai'
import {HiPhone} from 'react-icons/hi';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { useNavigate } from 'react-router-dom';


export default function Profile() {
  const navigate = useNavigate();
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { userId: "641107fa49013e5ccc7336bf"},
  });

  if (loading) {
    return <div>Loading...</div>
  }

  const user = data?.user || {};

  return (
    <>
      <><div className="pt-[24px] hero bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
              <img src={glub} className="max-w-sm rounded-lg shadow-2xl w-[345px]" />
              <div>
                <h1 className="text-5xl font-bold flex items-center">{user?.firstName + " " + user?.lastName}</h1>
                <div className="divider"></div>
                <div className="pb-2 flex items-center"><BsPersonCircle className='mr-[8px] text-[20px]' />{user?.username}</div>
                <p className="py-2 flex items-center"><AiOutlineMail className='mr-[8px] text-[20px]' />{user?.email}</p>
                <p className="py-2 flex items-center"><HiPhone className='mr-[8px] text-[20px]' /> {user?.phoneNumber}</p>
                <button className="my-2 btn btn-primary">New Post</button>
                <button onClick={() => { navigate("/editprofile/" + user._id)}} className="my-2 mx-2 btn btn-primary">Edit Profile</button>
              </div>
            </div>
          </div><h1 className="flex justify-center pt-[12px] text-5xl font-bold">Your Items</h1><div className='card-container justify-center items-center flex flex-wrap'>
              {user.posts.map(product => (
                <Card className="card" key={product._id} title={product.title} description={product.description} price={product.price} image={product.postImgs[0]} />
              ))}
            </div></>
    </>
  )
}
