import React from "react";
import { Link } from "react-router";

const LatestProductsCard = ({ latestProduct }) => {
  const { _id, title, price_min, price_max, image } = latestProduct;
  return (
    <div className="card bg-base-200 w-96 shadow-sm">
      <figure className="p-3">
        <img
          className="w-full h-70 rounded-md"
          src="https://images.unsplash.com/photo-1742268351289-8ef991675c79?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=500"
          alt={image}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>
          Price: <span>{price_min}</span>-<span>{price_max}</span>
        </p>
        <div className="card-actions justify-end">
          <Link to={`/products/${_id}`} className="btn btn-primary w-full">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LatestProductsCard;
