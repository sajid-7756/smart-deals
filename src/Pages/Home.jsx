import React, { Suspense } from "react";
import Hero from "../Components/Hero/Hero";
import LatestProducts from "../Components/Latest Products/LatestProducts";

const latestProductsPromise = fetch(
  "http://localhost:3000/latest-products"
).then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <section className="flex flex-col justify-center items-center">
        <Suspense fallback={"Loading..."}>
          <LatestProducts
            latestProductsPromise={latestProductsPromise}
          ></LatestProducts>
        </Suspense>
      </section>
    </div>
  );
};

export default Home;
