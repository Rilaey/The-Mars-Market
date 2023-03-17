import { AiOutlineMail } from "react-icons/ai";
import { HiPhone } from "react-icons/hi";
import { useParams, useNavigate } from "react-router-dom";
import { QUERY_POST, QUERY_POSTS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import Card from "../components/Card";
import Slide from "../components/Slide";

export default function Item() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, data } = useQuery(QUERY_POST, {
    variables: { id: id }
  });

  const query2Result = useQuery(QUERY_POSTS);

  if (query2Result.loading || loading) {
    //insert loading bar
    return <div>LOADING</div>;
  }

  const post = data?.post || {};

  return (
    <>
      <div className="pt-[24px] hero bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          {/* <img src={post?.postImgs[0]} className="max-w-sm rounded-lg shadow-2xl w-[345px]" /> */}
          <div className="carousel w-full">
            {post.postImgs.map(function (image, i) {
              if (post.postImgs.length === 1) {
                return (
                  <Slide key={i} index={i} postImg={image} singleImg={true} />
                );
              }
              if (i === 0) {
                return (
                  <Slide
                    key={i}
                    index={i}
                    postImg={image}
                    singleImg={false}
                    previous={post.postImgs.length - 1}
                    next={i + 1}
                  />
                );
              }
              if (i === post.postImgs.length - 1) {
                return (
                  <Slide
                    key={i}
                    index={i}
                    postImg={image}
                    singleImg={false}
                    previous={i - 1}
                    next={0}
                  />
                );
              }
              return (
                <Slide
                  key={i}
                  index={i}
                  postImg={image}
                  singleImg={false}
                  previous={i - 1}
                  next={i + 1}
                />
              );
            })}
          </div>
          <div>
            <h1 className="text-5xl font-bold flex items-center">
              {post.title}
            </h1>
            <div className="divider"></div>
            <div className="pb-2 flex items-center">${post.price}</div>
            <p className="py-2 flex items-center">{post.description}</p>
            <p className="py-2 flex items-center">
              <AiOutlineMail className="mr-[8px] text-[20px]" />{" "}
              {post.user.email}
            </p>
            <p className="py-2 flex items-center">
              <HiPhone className="mr-[8px] text-[20px]" />{" "}
              {post.user.phoneNumber}
            </p>
            <div>
              <button className="my-2 mx-3 btn btn-primary">Buy Now</button>
              <button className="my-2 btn btn-primary" onClick={() => {
                navigate(`/profile/${post.user._id}`)
              }}>Seller's Profile</button>
            </div>
          </div>
        </div>
      </div>
      <h2 className="flex justify-center pt-[12px] text-3xl font-bold">
        Featured items you may like
      </h2>
      <div className="card-container justify-center items-center flex flex-wrap">
        {query2Result.data.posts.map((product) => {
          if (product._id === id) return "";
          return (
            <Card
              className="card"
              post={product._id}
              key={product._id}
              title={product.title}
              description={product.description}
              price={product.price}
              image={product?.postImgs[0]}
            />
          );
        })}
      </div>
    </>
  );
}
