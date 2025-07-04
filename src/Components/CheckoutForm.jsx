"use client";

import { useState } from "react";

import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs";

export default function CheckoutForm({  onCancel, onSubmit, placeOrder }) {
  const [profile, setProfile] = useState({
    id: "",
    fullName: "",
    email: "",
    phone: "",
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  function handlePlaceOrder(e) {
    e.preventDefault(); // prevent default form submission
    // setShowForm(false);
    placeOrder(profile, cartItems);
    setCartItems([]);
  }

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-lg w-[400px]">
        {/* <SignedIn> */}
          <h2 className="text-2xl font-bold mb-4">Enter Your Details</h2>
          <form onSubmit={handlePlaceOrder}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={profile.fullName}
              onChange={handleChange}
              className="input input-bordered w-full mb-2"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={profile.email}
              onChange={handleChange}
              className="input input-bordered w-full mb-2"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={profile.phone}
              onChange={handleChange}
              className="input input-bordered w-full mb-4"
              required
            />
            <div className="flex justify-end space-x-2">
              <button type="button" className="btn btn-outline" onClick={onCancel}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Place Order
              </button>
            </div>
          </form>
        {/* </SignedIn> */}

        {/* <SignedOut> */}
          <h2 className="text-2xl font-bold mb-4">Please sign in to place your order</h2>
          <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
          <button type="button" className="btn btn-outline mt-4" onClick={onCancel}>
            Cancel
          </button>
        {/* </SignedOut> */}
      </div>
    </div>
  );
}
