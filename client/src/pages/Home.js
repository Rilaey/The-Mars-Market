import React from 'react';
import getProducts from '../data/products';
import Card from '../components/Card';
import { QUERY_POSTS } from '../utils/queries';
import { useQuery } from '@apollo/client';

export default function Home() {
    
  const { loading, data } = useQuery(QUERY_POSTS);
  
    if (loading) {
      return <div>LOADING</div>
    }
    const posts = data?.posts || {};

  return (

    <div className='card-container justify-center items-center flex flex-wrap'>
      {posts.map(product => (
        <Card className="card" post={product._id} key={product._id} title={product.title} description={product.description} price={product.price} image={product?.image}/>
      ))}
    </div>
  )
}
