"use Client";

import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";
// import { useState } from "react";
// import { useSearchParams } from "next/navigation";

export default function Checkout({ handelSumbit, orderSumbit }) {

    return (
        <>
            <Link href={'/'} className="flex flex-row mb-4">
                <IoIosArrowBack className="mt-1" /> Back
            </Link>

            <h1 className="text-2xl font-bold mb-6">Checkout Page</h1>

            <div className="flex flex-row space-x-4">
                <div className="w-[60%] border rounded-lg shadow-lg p-6 bg-white">
                    <form action={handelSumbit}>
                        <label htmlFor="full_name" className="block text-lg font-semibold mb-2">Full Name</label>
                        <input
                            type="text"
                            name="full_name"
                            id="full_name"
                            placeholder="Full Name"
                            className="input input-bordered w-full"
                        />
                        <label htmlFor="email" className="block text-lg font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email Address"
                            className="input input-bordered w-full"
                        />
                        <label htmlFor="phone_number" className="block text-lg font-semibold mb-2">Phone Number</label>
                        <input
                            type="number"
                            name="phone_number"
                            id="phone_number"
                            placeholder="1234567890"
                            className="input input-bordered w-full"
                            min={0}
                        />
                        <button type="submit" className="btn btn-wide bg-black text-white mt-4">Continue</button>
                    </form>
                </div>
                <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg border border-gray-200 p-4">
                    <h2 className="text-lg font-bold mb-4">Order Summary</h2>

                    {orderSumbit.map((order) => (
                        <div
                            key={order.id}
                            className="">


                            <div className="flex  mb-4 border-b border-gray-200 ">
                                <img
                                    src={order.img_src}
                                    alt={order.prod_name}
                                    className="w-20 h-20 rounded-md object-cover mr-4"
                                />
                                <h3 className="font-bold text-2xl mt-0">{order.prod_name}</h3>

                                <div className="ml-10 text-center"><p className="text-1xl font-bold text-gray-800"> £{order.unit_price}</p></div>
                            </div>
                            <div className=" border-b border-gray-200">
                                <br />

                                <p className="text-xl font-semibold text-gray-600">Quantity: {order.quantity}</p>
                            </div>
                            <br />
                            <br />
                            <div className="border-b border-gray-200">
                                <p className="text-xl font-semibold text-gray-600">Total:  £{order.total_price}</p>
                            </div>
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="btn bg-black text-white w-full h-12">
                        Checkout
                    </button>
                </div>

            </div>
        </>
    );
}
