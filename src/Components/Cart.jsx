
"use client";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import Link from "next/link";


export default function CartPage({ orderSumbit, placeOrder, deleteItem, quantityUpdate}) {
  const [cartItems, setCartItems] = useState(orderSumbit);
  const [quantity, setQuantity] = useState(orderSumbit.map(item => item.quantity || 1));
  // const totalPrice = orderSumbit.reduce((acc, item) => acc + item.total_price, 0);
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

    item.quantity = Number(item.quantity || 1) + 1; // ✅ handles missing quantity
    item.total_price = item.unit_price * item.quantity;

    setCartItems(updatedItems); // ✅ updates state, UI will re-render

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


  // let sum = 0;
  // for (let i = 0; i < cartItems.length; i++) {
  //   sum += Number(cartItems[i].total_price); // ✅ No * quantity[i]
  // }
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
    e.preventDefault(); // prevent default form submission
    setShowForm(false);
    placeOrder(profile, cartItems);
    setCartItems([]);
  }

  return (
    <div className="pb-10">
      <h1 className="text-4xl ml-24 font-bold pt-20 ">Shopping Cart</h1>
      <div className="flex flex-row space-x-4 m-10">
        {/* Cart Items */}
        <div className="w-[60%] border rounded-lg shadow-lg p-6 bg-white m-10">
          {cartItems.map((order, index) => (
            <div
              key={order.id}
              className="flex flex-row justify-between border-b border-gray-200"
            >
              <div className="flex flex-col">
                <br />
                <div className="flex flex-row">
                  <img
                    src={order.img_src}
                    alt={order.prod_name}
                    className="w-20 h-20 rounded-md object-cover mr-4"
                  />
                  <h3 className="font-bold text-2xl mt-0">{order.prod_name}</h3>
                </div>
              </div>
              <div className="flex flex-col">
                <h1>Price</h1>
                <p className="text-1xl font-bold text-gray-800">
                  £{order.unit_price}

                </p>
              </div>
              <div className="flex flex-col">
                <h1 className="text-center">Quantity</h1>
                <div
                  className="inline-flex"
                  role="group"
                  aria-label="Button group border "
                >
                  <button
                    className="btn btn-outline"
                  onClick={() => decrementQuantity(index)}
                  >
                    -
                  </button>
                  <input
                    className="input input-bordered text-center w-16"
                    type="number"
                    value={cartItems[index].quantity || 1}
                    readOnly
                  />
                  <button
                    className="btn btn-outline"
                    onClick={() => incrementQuantity(index)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col">
                <h1>Total</h1>
                <p className="text-xl font-semibold text-gray-600">
                  £{order.total_price}
                  {/* £{(order.total_price * quantity[index]).toFixed(2)} */}

                </p>
              </div>
              <div>
                <button
                  onClick={() => handleDeleteItem(order.id)}
                  className="hover:text-red-700 transition-colors duration-150"
                >
                  <RiDeleteBin5Line />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg border border-gray-200 p-4">
          <div className="flex flex-row justify-between border-b border-stone-950">
            <h2 className="text-lg font-bold mb-4">Subtotal</h2>
            <h2 className="text-lg mb-4">£{sum}</h2>
          </div>
          <br />
          <div className="flex flex-row border-b border-gray-200 space-x-4">
            <h2 className="text-lg font-bold mb-4">Shipping</h2>
            <p className="text-lg mb-4">Will be Calculated in Checkout</p>
          </div>
          <br />
          <div className="flex flex-row justify-between">
            <h2 className="text-lg font-bold mb-4">Total</h2>
            <h2 className="text-lg mb-4">£{sum}</h2>
          </div>
          <br />
         <Link href="/checkout">
          <button
            type="button"
            className="btn bg-black text-white w-full h-12"
            // onClick={() => setShowForm(true)}
            
          >
            Checkout
          </button>
          </Link>
        </div>
      </div>

      {/* Profile Details Form */}
      {/* {showForm && (
        <CheckoutForm 
         profile={profile}
          setProfile={setProfile}
          onCancel={() => setShowForm(false)}
          onSubmit={handlePlaceOrder}
        />
        // <div className="fixed inset-0 bg-transparent bg-opacity-40 flex items-center justify-center z-50">
        //   <div className="bg-white p-8 rounded shadow-lg w-[400px]">
        //     <h2 className="text-2xl font-bold mb-4">Enter Your Details</h2>
        //     <form onSubmit={handlePlaceOrder}>
        //       <input
        //         type="text"
        //         name="fullName"
        //         placeholder="Full Name"
        //         value={profile.fullName}
        //         onChange={handleFormChange}
        //         className="input input-bordered w-full mb-2"
        //         required
        //       />
        //       <input
        //         type="email"
        //         name="email"
        //         placeholder="Email"
        //         value={profile.email}
        //         onChange={handleFormChange}
        //         className="input input-bordered w-full mb-2"
        //         required
        //       />
        //       <input
        //         type="tel"
        //         name="phone"
        //         placeholder="Phone Number"
        //         value={profile.phone}
        //         onChange={handleFormChange}
        //         className="input input-bordered w-full mb-4"
        //         required
        //       />
        //       <div className="flex justify-end space-x-2">
        //         <button
        //           type="button"
        //           className="btn btn-outline"
        //           onClick={() => setShowForm(false)}
        //         >
        //           Cancel
        //         </button>
        //         <button type="submit" className="btn btn-primary">
        //           Place Order
        //         </button>
        //       </div>
        //     </form>
        //   </div>
        // </div>
      )} */}
    </div>
  );
}