"use client";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";
import Link from "next/link";

export default function CartPage({ orderSumbit, placeOrder, deleteItem, quantityUpdate }) {
  const [cartItems, setCartItems] = useState(orderSumbit);
  const [showForm, setShowForm] = useState(false);
  const [profile, setProfile] = useState({ id: "", fullName: "", email: "", phone: "" });

  const handleDeleteItem = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
    deleteItem(id);
  };

  const incrementQuantity = (index) => {
    const updatedItems = [...cartItems];
    const item = updatedItems[index];
    item.quantity = Number(item.quantity || 1) + 1;
    item.total_price = item.unit_price * item.quantity;
    setCartItems(updatedItems);
    quantityUpdate({ id: item.id, quantity: item.quantity, total_price: item.total_price });
  };

  const decrementQuantity = (index) => {
    const updatedItems = [...cartItems];
    const item = updatedItems[index];
    if ((item.quantity || 1) > 1) {
      item.quantity -= 1;
      item.total_price = item.unit_price * item.quantity;
      setCartItems(updatedItems);
      quantityUpdate({ id: item.id, quantity: item.quantity, total_price: item.total_price });
    }
  };

  const sum = cartItems.reduce((acc, item) => acc + item.unit_price * (item.quantity || 1), 0);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setShowForm(false);
    placeOrder(profile, cartItems);
    setCartItems([]);
  };

  return (
    <div className="pb-10 px-4 md:px-10">
      <h1 className="text-4xl font-bold pt-10 pb-6">Shopping Cart</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Cart Items */}
        <div className="w-full md:w-[60%] space-y-4">
          {cartItems.map((order, index) => (
            <div key={order.id} className="border rounded-xl shadow-sm bg-white p-4 flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-40">
                <img src={order.img_src} alt={order.prod_name} className="w-14 h-14 rounded-md object-cover" />
                <div>
                  <h3 className="font-bold text-sm">{order.prod_name}</h3>
                  <p className="text-xs text-gray-500">£{order.unit_price}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="btn btn-outline btn-sm" onClick={() => decrementQuantity(index)}>-</button>
                <input
                  type="number"
                  readOnly
                  value={cartItems[index].quantity || 1}
                  className="input input-bordered input-sm w-12 text-center"
                />
                <button className="btn btn-outline btn-sm" onClick={() => incrementQuantity(index)}>+</button>
              </div>
              <p className="text-sm font-semibold w-16 text-center">£{order.total_price}</p>
              <button onClick={() => handleDeleteItem(order.id)} className="text-red-500 hover:text-red-700">
                <RiDeleteBin5Line size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="w-full md:w-[35%] bg-white border rounded-lg shadow-lg p-6">
          <div className="flex justify-between border-b pb-2">
            <h2 className="text-md font-bold">Subtotal</h2>
            <span>£{sum}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <h2 className="text-md font-bold">Shipping</h2>
            <span className="text-sm">Will be Calculated in Checkout</span>
          </div>
          <div className="flex justify-between pt-2">
            <h2 className="text-md font-bold">Total</h2>
            <span className="font-bold">£{sum}</span>
          </div>
          <Link href="/checkout" className="block mt-4">
            <button type="button" className="btn bg-black text-white w-full h-12">Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
