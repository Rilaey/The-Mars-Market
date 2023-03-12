import React from 'react';
import getProducts from '../data/products';
import Card from '../components/Card';
import glub from '../assets/glub.png';
import { BsPersonCircle } from 'react-icons/bs';
import { AiOutlineMail } from 'react-icons/ai'
import {HiPhone} from 'react-icons/hi';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';


export default function Profile() {
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { id: "640d61f015ce1b8438c66bd8"},
  });

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
                <p className="py-2 flex items-center"><HiPhone className='mr-[8px] text-[20px]' /> (786)-233-2222</p>
                <button className="my-2 btn btn-primary">New Post</button>
                <button className="my-2 mx-2 btn btn-primary">Edit Profile</button>
              </div>
            </div>
          </div><h1 className="flex justify-center pt-[12px] text-5xl font-bold">Your Items</h1><div className='card-container justify-center items-center flex flex-wrap'>
              {getProducts().map(product => (
                <Card className="card" key={product.id} title={product.title} description={product.description} price={product.price} image={product.image} />
              ))}
            </div></>
    </>
  )
}
