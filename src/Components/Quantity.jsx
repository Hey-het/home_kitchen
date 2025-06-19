"use client";
import { useState } from "react";


export default function Quantity({ product, handleBuyNow }){
   console.log(product)
    const [quantity, setQuantity] = useState(1);
   
    const totalPrice = product.unit_price * quantity

    function incrementQuantity() {
        setQuantity(quantity + 1);
    }

    function decrementQuantity() {
        if (quantity > 1) setQuantity(quantity - 1);
    }

    // Pass data dynamically to the parent function
    function handleButtonClick(){
        handleBuyNow(quantity, totalPrice, product.food_id);
    };

    return (
        <>
            <div className="flex flex-col space-y-4 items-start">
                <div className="flex items-center space-x-4">
                    <button className="btn btn-outline" onClick={decrementQuantity}>
                        -
                    </button>
                    <input
                        className="input input-bordered text-center w-16"
                        type="number"
                        value={quantity}
                        readOnly
                    />
                    <button className="btn btn-outline" onClick={incrementQuantity}>
                        +
                    </button>
                </div>
                <p className="text-lg font-bold">
                    Total: £{totalPrice}
                </p>

                <button
                    className="btn bg-black text-white w-full h-12"
                    onClick={handleButtonClick}
                >
                    BUY Now
                </button>
            </div>
        </>
    );
}
