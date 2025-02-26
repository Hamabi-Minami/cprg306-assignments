"use client"

import {useState} from "react";
import NewItemForm from "./new-item";

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
        <div className="flex flex-col items-center space-y-6">
            <NewItemForm />
        </div>
    )
}