"use client";
// import { useParams } from 'next/navigation';
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

export default function Checkout({ placeOrder, orderSumbit}) {
    // console.log(orderSumbit)
    const [cartItems, setCartItems] = useState(orderSumbit)
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [profile, setProfile] = useState({
        id: "",
        fullName: "",
        email: "",
        phone: "",
    });

    //   console.log(menudetails);


    function handleFormChange(e) {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    }

    function handlePlaceOrder(e) {
        e.preventDefault(); // prevent default form submission
        placeOrder(profile, cartItems);
        setCartItems([]);
        setOrderSuccess(true);
      
    }

    let sum = 0;
    if (orderSumbit && orderSumbit.length > 0) {
        for (let i = 0; i < orderSumbit.length; i++) {
            sum += Number(orderSumbit[i].total_price);
        }
    }


    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <Link href='/menu' className="flex items-center text-gray-600 mb-6 hover:underline">
                <IoIosArrowBack className="mr-1" />
                Back
            </Link>

            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left: Form */}
                {orderSuccess ? (
                    <div className="md:col-span-3 bg-green-100 border border-green-400 rounded-lg shadow p-6 text-center">
                        <h2 className="text-2xl font-bold mb-4">Thank you!</h2>
                        <p>Your order has been submitted successfully.</p>
                    </div>
                ) : (

                    <div className="md:col-span-2 bg-white border-2 border-gray-50  shadow p-6">
                        <h2 className="text-lg font-semibold mb-1">1. Contact info</h2>
                        <p className="text-sm text-gray-500 mb-6">For billing and order information only</p>

                        <form onSubmit={handlePlaceOrder}
                            className="space-y-4">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    id="fullName"
                                    placeholder="Full Name"
                                    className="w-full input border-2 border-gray-50 p-2"
                                    value={profile.fullName}
                                    onChange={handleFormChange}
                                    required

                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email Address"
                                    className="w-full input border-2 border-gray-50 p-2"
                                    value={profile.email}
                                    onChange={handleFormChange}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                                <input
                                    type="number"
                                    name="phone"
                                    id="phone"
                                    placeholder="1234567890"
                                    className="w-full input border-2 border-gray-50 p-2"
                                    value={profile.phone}
                                    onChange={handleFormChange}
                                    min={0}
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                            <button
                                type="submit" 
                                className="btn bg-neutral-400 text-white p-3 w-[230px] ">
                                Continue
                            </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Right: Order Summary */}
                <div className="bg-white  border-2 border-gray-50  p-6">
                    <h2 className="text-lg font-bold mb-4">Order summary</h2>

                    {orderSumbit.map((order) => (
                        <div key={order.id} className="mb-4 border-b pb-4">
                            <div className="flex items-center mb-2">
                                <img
                                    src={order.img_src}
                                    alt={order.prod_name}
                                    className="w-20 h-20 object-cover rounded mr-4"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold">{order.prod_name}</h3>
                                    <p className="text-sm text-gray-500">Quantity: {order.quantity}</p>
                                </div>
                                <div className="font-bold text-lg">£{order.total_price}</div>
                            </div>
                        </div>
                    ))}

                    <div className="text-sm text-gray-600 mb-2">Your message for the merchant</div>
                    <div className="text-sm text-gray-600 mb-2">Discount Code</div>

                    <div className="mt-4 border-t pt-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>{sum}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>£0.00</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg border-t pt-2">
                            <span>Total</span>
                            <span>{sum}</span>
                        </div>
                        <div className="text-xs text-gray-500">incl. £0.00 VAT</div>
                    </div>

                    {/* <button className="btn bg-black text-white w-full mt-6 h-12">
                        Checkout
                    </button> */}
                </div>
            </div>
        </div>
    );
}
