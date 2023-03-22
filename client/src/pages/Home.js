import { React, useState } from "react";
import Card from "../components/Card";
import { QUERY_POSTS } from "../utils/queries";
import { useQuery } from "@apollo/client";

export default function Home() {
  const [query, setQuery] = useState("");

  const { loading, data } = useQuery(QUERY_POSTS);

  if (loading) {
    return (
      <div className="flex justify-center items-center text-center min-h-[95vh]">
        <button className="btn btn-square loading"></button>
      </div>
    );
  }
  const posts = data?.posts || {};

  const getFilteredItems = (query, items) => {
    if (!query) {
      return items;
    }
    return items.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredItems = getFilteredItems(query, posts);

  return (
    <>
      <div className="min-h-screen bg-base-200">
        <div className="flex items-center form-control pt-[48px]">
          <input
            type="text"
            placeholder="Search for item"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="card-container justify-center items-center flex flex-wrap">
          {filteredItems.map((product) => (
            <Card
              className="card"
              post={product._id}
              key={product._id}
              title={product.title}
              description={product.description}
              price={product.price}
              image={product?.postImgs[0]}
            />
          ))}
        </div>
      </div>
    </>
  );
}
