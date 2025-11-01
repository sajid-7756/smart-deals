import React, { use } from "react";
import LatestProductsCard from "./LatestProductsCard";

const LatestProducts = ({ latestProductsPromise }) => {
  const latestProducts = use(latestProductsPromise);
  console.log(latestProducts);
  return (
    <div className="my-10 space-y-10">
    <h1 className="text-center text-4xl font-bold">Recent <span className="text-primary">Products</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {latestProducts.map((latestProduct) => (
          <LatestProductsCard
            key={latestProduct._id}
            latestProduct={latestProduct}
          ></LatestProductsCard>
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
