import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLoaderData } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const showModalRef = useRef(null);
  const { user, loading } = useContext(AuthContext);
  const [bids, setBids] = useState([]);

  const product = useLoaderData();
  const {
    _id: productId,
    title,
    category,
    condition,
    created_at,
    description,
    email,
    // image,
    location,
    price_min,
    price_max,
    seller_contact,
    // seller_image,
    seller_name,
    status,
    usage,
  } = product;

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const bid = e.target.bid.value;
    const contact = e.target.contact.value;

    console.log({ name, email, contact, productId, bid });

    const newBid = {
      product: productId,
      buyer_name: name,
      buyer_email: email,
      buyer_image: user?.photoURL,
      buyer_contact: contact,
      bid_price: bid,
      status: "pending",
    };

    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          console.log("after post bid", data);
          showModalRef.current.close();

          Swal.fire({
            title: "Bid Success!",
            icon: "success",
            draggable: true,
          });

          newBid._id = data.insertedId;
          const newBids = [...bids, newBid];
          newBids.sort((a, b) => b.bid_price - a.bid_price);

          setBids(newBids);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch(`http://localhost:3000/products/bids/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setBids(data);
      })
      .catch((err) => console.log(err));
  }, [productId]);

  console.log(bids);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-base-200 shadow-md rounded-lg my-10">
        <Link to={"/"} className="text-xl font-bold cursor-pointer">
          <span className="text-primary">←</span> Go back
        </Link>
        {/* Product Image */}
        <div className="flex justify-center mb-6">
          <img
            src="https://images.unsplash.com/photo-1742268351289-8ef991675c79?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=500"
            alt={title}
            className="w-full max-w-md rounded-lg object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Category:</span> {category}
          </p>
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Condition:</span> {condition}
          </p>
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Usage:</span> {usage}
          </p>
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Status:</span> {status}
          </p>
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Price Range:</span> ${price_min} - $
            {price_max}
          </p>
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Location:</span> {location}
          </p>
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Created At:</span>{" "}
            {new Date(created_at).toLocaleDateString()}
          </p>
          <p className="text-neutral mt-4">{description}</p>
        </div>

        {/* Seller Info */}
        <div className="flex items-center justify-between gap-4 border-t pt-4">
          <div>
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880"
              alt={seller_name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">{seller_name}</p>
              <p className="text-gray-600">{email}</p>
              <p className="text-gray-600">{seller_contact}</p>
            </div>
          </div>
          <div>
            <button
              onClick={() => showModalRef.current.showModal()}
              className="btn btn-xl btn-primary"
            >
              Buy Now
            </button>
            <dialog
              ref={showModalRef}
              id="my_modal_5"
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="flex justify-center items-center min-h-screen p-4">
                <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
                  {/* Header */}
                  <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                    Give Seller Your Offered Price
                  </h2>

                  <form onSubmit={handleBidSubmit}>
                    {/* Buyer Name & Buyer Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {/* Buyer Name */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-neutral">
                            Buyer Name
                          </span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          readOnly
                          defaultValue={user.displayName}
                          className="input input-bordered w-full"
                        />
                      </div>

                      {/* Buyer Email */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-neutral">
                            Buyer Email
                          </span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          readOnly
                          defaultValue={user.email}
                          placeholder="Your Email"
                          className="input input-bordered w-full"
                        />
                      </div>
                    </div>

                    {/* Place your Price */}
                    <div className="form-control mb-4">
                      <label className="label">
                        <span className="label-text text-neutral">
                          Place your Price
                        </span>
                      </label>
                      <input
                        type="number"
                        name="bid"
                        placeholder="e.g. Artisan Roasters"
                        className="input input-bordered w-full"
                      />
                    </div>

                    {/* Contact Info */}
                    <div className="form-control mb-8">
                      <label className="label">
                        <span className="label-text text-neutral">
                          Contact Info
                        </span>
                      </label>
                      <input
                        type="tel" // Changed to tel for phone numbers
                        name="contact"
                        placeholder="e.g. +1-555-1234"
                        className="input input-bordered w-full"
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          showModalRef.current.close();
                        }}
                        className="btn btn-ghost text-primary hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button className="btn btn-primary">Submit Bid</button>
                    </div>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
      {/* bids list  */}
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-3xl font-bold">
          Bids For This Product{" "}
          <span className="text-primary">{bids.length}</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <p>SL NO</p>
                  </label>
                </th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Bid Price</th>
                <th>Actions</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {bids.map((bid, index) => (
                <tr key={bid._id}>
                  <td>
                    <div className="flex items-center gap-5">
                      <th>{index + 1}</th>
                    </div>
                  </td>
                  <th>
                    <div className="avatar flex items-center gap-2">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={
                            bids?.buyer_image ||
                            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880"
                          }
                          alt={bid.buyer_name}
                        />
                      </div>
                      <p className="font-bold">{bid?.buyer_name}</p>
                    </div>
                  </th>
                  <th>
                    <button>{bid?.buyer_email}</button>
                  </th>
                  <th>
                    <button>{bid?.bid_price || 50}</button>
                  </th>
                  <th>
                    <button>{bid?.buyer_email}</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
