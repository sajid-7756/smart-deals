import React, { useRef } from "react";
import { Link, useLoaderData } from "react-router";

const ProductDetails = () => {
  const showModalRef = useRef(null);

  const product = useLoaderData();
  const {
    _id,
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

  return (
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
        <p className="text-gray-700 mt-4">{description}</p>
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
            <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
              <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
                {/* Header */}
                <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                  Give Seller Your Offered Price
                </h2>

                <form>
                  {/* Buyer Name & Buyer Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Buyer Name */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-gray-700">
                          Buyer Name
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Your name"
                        className="input input-bordered w-full"
                      />
                    </div>

                    {/* Buyer Email */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-gray-700">
                          Buyer Email
                        </span>
                      </label>
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>

                  {/* Buyer Image URL */}
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text text-gray-700">
                        Buyer Image URL
                      </span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://...your_img_url"
                      className="input input-bordered w-full"
                    />
                  </div>

                  {/* Place your Price */}
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text text-gray-700">
                        Place your Price
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Artisan Roasters"
                      className="input input-bordered w-full"
                    />
                  </div>

                  {/* Contact Info */}
                  <div className="form-control mb-8">
                    <label className="label">
                      <span className="label-text text-gray-700">
                        Contact Info
                      </span>
                    </label>
                    <input
                      type="tel" // Changed to tel for phone numbers
                      placeholder="e.g. +1-555-1234"
                      className="input input-bordered w-full"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end gap-4">
                    <button className="btn btn-ghost text-primary hover:bg-gray-100">
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
  );
};

export default ProductDetails;
