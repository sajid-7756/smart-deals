import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home";
import AllProducts from "../Pages/AllProducts";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import MyProducts from "../Pages/MyProducts";
import MyBids from "../Pages/MyBids";
import PrivateRoute from "./PrivateRoute";
import ProductDetails from "../Pages/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/all-products",
        Component: AllProducts,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/products/:id",
        Component: ProductDetails,
        loader: ({params})=> fetch(`http://localhost:3000/products/${params.id}`)
      },
      {
        path: "/my-products",
        element: (
          <PrivateRoute>
            <MyProducts></MyProducts>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-bids",
        element: (
          <PrivateRoute>
            <MyBids></MyBids>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
export default router;
