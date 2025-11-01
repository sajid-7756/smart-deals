import { Outlet } from "react-router";
import { Suspense } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import ScrollToTop from "../Components/ScrollToTop/ScrollToTop";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={'Loading...'}>
          <ScrollToTop></ScrollToTop>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
