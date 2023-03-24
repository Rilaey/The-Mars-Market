import React, { useState } from "react";
import { QUERY_USERS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import MasterCard from "../components/Card";
import ProfileCard from "../components/Card";

export default function MasterPage() {
  const { loading, data } = useQuery(QUERY_USERS);

  if (loading) {
    return (
      <div className="flex justify-center items-center text-center min-h-[95vh]">
        <button className="btn btn-square loading"></button>
      </div>
    );
  }
  const user = data?.user || {};

  return (
    <div className="card-container justify-center items-center flex flex-wrap">
      {user.posts.map((product) => (
        <ProfileCard
          className="card"
          edit={product._id}
          delete={product._id}
          key={product._id}
          title={product.title}
          description={product.description}
          price={product.price}
          image={product.postImgs[0]}
        />
      ))}
    </div>
  );
}
