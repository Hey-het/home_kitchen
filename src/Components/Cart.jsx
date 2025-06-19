"use client"
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";

export default function CartPage({ orderSumbit }) {
    const [quantity, setQuantity] = useState(1);
    function incrementQuantity() {
        setQuantity(quantity + 1);
    }

    function decrementQuantity() {
        if (quantity > 1) setQuantity(quantity - 1);
    }

    let sum = 0;
    for (let i = 0; i < orderSumbit.length; i++) {
        sum = Number(sum) + Number(orderSumbit[i].total_price);

    }

    // console.log(sum);
    // console.log(orderSumbit[0].total_price);
    // console.log(orderSumbit[1].total_price);
    return (
        <>
            <h1 className="text-4xl ml-24 font-bold ">Shopping Cart</h1>
            <div className="flex flex-row space-x-4 m-10">

                <div className="w-[60%] border rounded-lg shadow-lg p-6 bg-white m-10 ">
                    {orderSumbit.map((order) => (
                        <div key={order.id}
                            className="flex flex-row justify-between border-b border-gray-200"
                        >
                            <div className="flex flex-col">
                                <h1>item</h1>
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
                                <p className="text-1xl font-bold text-gray-800"> £{order.unit_price}</p>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-center">Quantity</h1>
                                <div className="inline-flex" role="group" aria-label="Button group border ">
                                    <button onClick={decrementQuantity} 
                                    className="h-10 px-5 transition-colors duration-150  rounded-lg ">-</button>
                                    <button className="h-10 px-5 transition-colors duration-150  rounded-lg  ">{order.quantity}</button>
                                    <button onClick={incrementQuantity} 
                                    className="h-10 px-5  transition-colors duration-150  rounded-lg ">+</button>
                                </div>
                                {/* <p className="text-xl font-semibold text-gray-600">{order.quantity}</p> */}
                            </div>
                            <div className="flex flex-col">
                                <h1>Total</h1>
                                <p className="text-xl font-semibold text-gray-600">£{order.total_price}</p>
                            </div>
                            <div>
                                <h1><RiDeleteBin5Line /></h1>
                            </div>

                        </div>
                    ))
                    }
                </div>
                <div className="max-w-md  mx-auto bg-white shadow-lg rounded-lg border border-gray-200 p-4">

                    <div className=" flex flex-row justify-between border-b border-stone-950">

                        <h2 className="text-lg font-bold mb-4">Subtotal  </h2>
                        <h2 className="text-lg mb-4"> £{sum}</h2>

                    </div>
                    <br />
                    <br />
                    <div className="flex flex-row border-b border-gray-200 space-x-4">

                        <h2 className="text-lg font-bold mb-4 ">Shipping </h2>
                        <p className="text-lg mb-4">Will be Calculated in Checkout</p>

                    </div>
                    <br />
                    <br />
                    <div className="flex flex-row justify-between">

                        <h2 className="text-lg font-bold mb-4">Total  £{sum}</h2>
                        <h2 className="text-lg mb-4">£{sum}</h2>

                    </div>
                    <br />

                    <button
                        className="btn bg-black text-white w-full h-12">Checkout</button>
                </div>

            </div>


        </>
    );
}



