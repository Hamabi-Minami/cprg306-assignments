"use client"

import {useState} from "react";


export default function Page()
{
    const [quantity, setQuantity] = useState(1);

    const increment = () => {
        if (quantity < 20) {
            setQuantity(quantity + 1);
        }
    };

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return(
        <div className="flex justify-center">
            <div className="flex items-center bg-white w-40 p-2 rounded-md shadow-md">
                <span className="text-base font-bold text-black">{quantity}</span>
                <div className="flex ml-auto space-x-2">
                    <button
                        onClick={decrement}
                        disabled={quantity === 1}
                        className={`px-2 py-0.5 rounded-md text-sm ${
                            quantity === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-500 hover:bg-gray-700"
                        } text-white`}
                    >
                        -
                    </button>
                    <button
                        onClick={increment}
                        disabled={quantity === 20}
                        className={`px-2 py-0.5 rounded-md text-sm ${
                            quantity === 20 ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
                        } text-white`}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    )
}