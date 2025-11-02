import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import Swal from "sweetalert2";

const MyBids = () => {
  const { user } = useContext(AuthContext);
  const [bids, setBids] = useState([]);

  console.log(bids);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/bids?email=${user.email}`, {})
        .then((res) => res.json())
        .then((data) => {
          setBids(data);
        })
        .catch((err) => console.log(err));
    }
  }, [user?.email]);

  const handleRemoveBid = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete your bid?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/bids/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              console.log("data after delete", data);
              Swal.fire({
                title: "Deleted!",
                text: "Your bid has been deleted.",
                icon: "success",
              });
              setBids((prevBids) => prevBids.filter((e) => e._id !== id));
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <div className="flex flex-col justify-center items-center my-10">
      <h3 className="text-3xl font-bold">
        My Bids <span className="text-primary">{bids.length}</span>
      </h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL NO</th>
              <th>Product</th>
              <th>Seller</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
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
                  {bid.status === "pending" ? (
                    <div className="badge badge-warning">{bid.status}</div>
                  ) : (
                    <div className="badge badge-success">{bid.status}</div>
                  )}
                </th>
                <th>
                  <button
                    onClick={() => handleRemoveBid(bid?._id)}
                    className="btn btn-outline btn-error"
                  >
                    Remove Bid
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBids;
