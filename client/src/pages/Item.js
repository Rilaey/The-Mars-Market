import { useState, useEffect } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { HiPhone } from "react-icons/hi";
import { useParams, useNavigate } from "react-router-dom";
import { QUERY_POST, QUERY_POSTS } from "../utils/queries";
import { DELETE_POST } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import Card from "../components/Card";
import Slide from "../components/Slide";
import auth from "../utils/auth";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Item() {

  const [checkout, setCheckout] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, data } = useQuery(QUERY_POST, {
    variables: { id: id }
  });

  const query2Result = useQuery(QUERY_POSTS);

  const [deletePost, { loading: loading_delete, error }] =
    useMutation(DELETE_POST);

  if (query2Result.loading || loading) {
    //insert loading bar
    return (
      <div className="flex justify-center items-center text-center min-h-[95vh]">
        <button className="btn btn-square loading"></button>
      </div>
    );
  }

  const post = data?.post || {};

  const handleDelete = () => {
    deletePost({ variables: { deletePostId: id } })
      .then(() => {
        navigate("/"); // Reloads the page after the mutation is completed
        window.location.reload();
        alert(`Transaction sent!`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const amount = post.price;
  const currency = "USD";
  const style = {
    shape: "pill",
    color: "white",
    layout: "vertical",
    label: "paypal"
  };

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
          <div className="lg:w-1/2">
            <h1 className="text-5xl font-bold flex items-center">
              {post.title}
            </h1>
            <div className="divider"></div>
            <div className="pb-2 flex items-center">${post.price}</div>
            <p className="py-2 flex items-center">{post.description}</p>
            <a
              href={`mailto:${post.user.email}`}
              className="py-2 flex items-center link link-hover link-primary"
            >
              <AiOutlineMail className="mr-[8px] text-[20px]" />{" "}
              {post.user.email}
            </a>
            <p className="py-2 flex items-center">
              <HiPhone className="mr-[8px] text-[20px]" />{" "}
              {post.user.phoneNumber}
            </p>
            <div>
              {auth.loggedIn() ? (
                checkout ? (
                  <PayPalScriptProvider
                    options={{
                      "client-id": process.env.REACT_APP_PAYPAL_CLIENT
                    }}
                  >
                    <PayPalButtons
                      className="paypal-button-container"
                      style={style}
                      disabled={false}
                      forceReRender={[amount, currency, style]}
                      fundingSource={undefined}
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              description: post.description,
                              amount: {
                                currency_code: currency,
                                value: amount
                              }
                            }
                          ]
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order.capture().then(() => {
                          handleDelete();
                        });
                      }}
                    />
                  </PayPalScriptProvider>
                ) : (
                  <button
                    className="my-2 mx-2 btn btn-primary"
                    onClick={() => {
                      setCheckout(true);
                    }}
                  >
                    Buy Now!
                  </button>
                )
              ) : (
                <button
                  className="my-2 btn btn-primary"
                  onClick={() => {
                    navigate("/signin");
                  }}
                >
                  Log in to Buy Now!
                </button>
              )}

              {auth.loggedIn() ? (
                <button
                  className="my-2 btn btn-primary"
                  onClick={() => {
                    navigate(`/profile/${post.user._id}`);
                  }}
                >
                  Seller's Profile
                </button>
              ) : (
                <button
                  className="my-2 btn btn-primary"
                  onClick={() => {
                    navigate(`/signin`);
                  }}
                >
                  Log in to view sellers profile
                </button>
              )}
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
