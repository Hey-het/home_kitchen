"use client";
import { useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import toast from "react-hot-toast";


export default function Quantity({ product, handleBuyNow, addToCart }) {

    const [quantity, setQuantity] = useState(1);

    const totalPrice = product.unit_price * quantity

    function incrementQuantity() {
        setQuantity(quantity + 1);
    }

    function decrementQuantity() {
        if (quantity > 1) setQuantity(quantity - 1);
    }

    // Pass data dynamically to the parent function
    function handleButtonClick() {
        handleBuyNow(quantity, totalPrice, product.food_id);
    };

    async function handleAddToCart() {
        addToCart(quantity, totalPrice, product.food_id
        )
        toast.success("Added to cart", {
            duration: 5000,
            style: {
                background: "#1E7F3D", // match your green color
                color: "white",
                width: "1000vw",
                borderRadius: "0px",
                padding: "16px 0",
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "bold",
            },
        });
    }

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
                    onClick={handleAddToCart}
                    className="btn bg-white border-1 text-black w-full h-12 flex items-center justify-center gap-2">
                    <span>Add to Cart</span>
                    <CiShoppingCart className="w-6 h-6" />
                </button>

                <br />
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
