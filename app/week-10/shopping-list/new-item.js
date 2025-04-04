"use client";

import { useState } from "react";

export default function NewItemForm({ onAddItem }) {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("produce");
    const [loading, setLoading] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        const item = { name: name.trim(), quantity, category };
        setLoading(true);
        try {
            await onAddItem(item);
            setName("");
            setQuantity(1);
            setCategory("produce");
        } catch (error) {
            console.error("Failed to add item:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-gray-900 p-4 rounded-lg w-96 space-y-4 text-white"
        >
            <input
                type="text"
                placeholder="Item name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2 rounded-md bg-gray-800 text-white placeholder-gray-400"
                disabled={loading}
            />

            <div className="flex items-center space-x-2">
                <div className="flex items-center bg-white p-2 rounded-md">
                    <button
                        type="button"
                        onClick={decrement}
                        disabled={quantity === 1 || loading}
                        className={`px-2 py-0.5 rounded-md text-sm ${
                            quantity === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-500 hover:bg-gray-700"
                        } text-white`}
                    >
                        -
                    </button>
                    <span className="mx-2 text-black">{quantity}</span>
                    <button
                        type="button"
                        onClick={increment}
                        disabled={quantity === 20 || loading}
                        className={`px-2 py-0.5 rounded-md text-sm ${
                            quantity === 20 ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
                        } text-white`}
                    >
                        +
                    </button>
                </div>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-2 rounded-md bg-gray-800 text-white"
                    disabled={loading}
                >
                    {["Produce", "Dairy", "Bakery", "Meat", "Frozen Foods", "Canned Goods", "Dry Goods", "Beverages", "Snacks", "Household", "Other"].map((cat) => (
                        <option key={cat} value={cat.toLowerCase()}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md text-lg"
                disabled={loading}
            >
                {loading ? "Adding..." : "+"}
            </button>
        </form>
    );
}
