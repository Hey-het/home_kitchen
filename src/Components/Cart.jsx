"use client";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import Link from "next/link";

export default function CartPage({ orderSumbit, placeOrder, deleteItem, quantityUpdate}) {
  const [cartItems, setCartItems] = useState(orderSumbit);
  const [quantity, setQuantity] = useState(orderSumbit.map(item => item.quantity || 1));
  const [showForm, setShowForm] = useState(false);
  const [profile, setProfile] = useState({
    id: "",
    fullName: "",
    email: "",
    phone: "",
  });

  function handleDeleteItem(id) {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
    deleteItem(id);
  }

  const incrementQuantity = (index) => {
    const updatedItems = [...cartItems];
    const item = updatedItems[index];
    item.quantity = Number(item.quantity || 1) + 1;
    item.total_price = item.unit_price * item.quantity;
    setCartItems(updatedItems);
    quantityUpdate({
      id: item.id,
      quantity: item.quantity,
      total_price: item.total_price,
    });
  };

  const decrementQuantity = (index) => {
    const updatedItems = [...cartItems];
    const item = updatedItems[index];
    if ((item.quantity || 1) > 1) {
      item.quantity = item.quantity - 1;
      item.total_price = item.unit_price * item.quantity;
      setCartItems(updatedItems);
      quantityUpdate({
        id: item.id,
        quantity: item.quantity,
        total_price: item.total_price,
      });
    }
  };

  let sum = 0;
  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    sum += item.unit_price * (item.quantity || 1);
  }

  function handleFormChange(e) {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  }

  function handlePlaceOrder(e) {
    e.preventDefault();
    setShowForm(false);
    placeOrder(profile, cartItems);
    setCartItems([]);
  }

  return (
    <div className="pb-10 px-4 sm:px-10">
      <h1 className="text-3xl sm:text-4xl font-bold pt-20 text-center sm:text-left">Shopping Cart</h1>
      <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-4 mt-10">
        {/* Cart Items */}
        <div className="w-full sm:w-[60%] border rounded-lg shadow-lg p-6 bg-white">
          {cartItems.map((order, index) => (
            <div
              key={order.id}
              className="flex flex-col sm:flex-row justify-between border-b border-gray-200 py-4"
            >
              <div className="flex flex-row items-center mb-4 sm:mb-0">
                <img
                  src={order.img_src}
                  alt={order.prod_name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-md object-cover mr-4"
                />
                <h3 className="font-bold text-xl sm:text-2xl">{order.prod_name}</h3>
              </div>
              <div className="flex justify-between sm:flex-col sm:justify-start sm:items-start w-full sm:w-auto">
                <div className="flex flex-col items-center sm:items-start mb-2 sm:mb-4 sm:mr-6">
                  <h1 className="font-semibold">Price</h1>
                  <p className="text-lg font-bold text-gray-800">£{order.unit_price}</p>
                </div>
                <div className="flex flex-col items-center sm:items-start mb-2 sm:mb-4 sm:mr-6">
                  <h1 className="text-center font-semibold">Quantity</h1>
                  <div
                    className="inline-flex mt-1"
                    role="group"
                    aria-label="Button group border"
                  >
                    <button
                      className="btn btn-outline px-3 py-1"
                      onClick={() => decrementQuantity(index)}
                    >
                      -
                    </button>
                    <input
                      className="input input-bordered text-center w-12 sm:w-16"
                      type="number"
                      value={cartItems[index].quantity || 1}
                      readOnly
                    />
                    <button
                      className="btn btn-outline px-3 py-1"
                      onClick={() => incrementQuantity(index)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-center sm:items-start mb-2 sm:mb-4">
                  <h1 className="font-semibold">Total</h1>
                  <p className="text-lg font-semibold text-gray-600">
                    £{order.total_price}
                  </p>
                </div>
              </div>
              <div className="flex justify-end sm:justify-start mt-2 sm:mt-0">
                <button
                  onClick={() => handleDeleteItem(order.id)}
                  className="hover:text-red-700 transition-colors duration-150"
                >
                  <RiDeleteBin5Line size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="w-full sm:max-w-md mx-auto bg-white shadow-lg rounded-lg border border-gray-200 p-4">
          <div className="flex flex-row justify-between border-b border-stone-950">
            <h2 className="text-lg font-bold mb-4">Subtotal</h2>
            <h2 className="text-lg mb-4">£{sum}</h2>
          </div>
          <div className="flex flex-row border-b border-gray-200 space-x-4 py-4">
            <h2 className="text-lg font-bold mb-4">Shipping</h2>
            <p className="text-lg mb-4">Will be Calculated in Checkout</p>
          </div>
          <div className="flex flex-row justify-between">
            <h2 className="text-lg font-bold mb-4">Total</h2>
            <h2 className="text-lg mb-4">£{sum}</h2>
          </div>
          <button
            type="button"
            className="btn bg-black text-white w-full h-12 mt-6"
          >
            <Link href="/checkout" className="w-full h-full flex items-center justify-center">
              Checkout
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
