"use client";

import itemsData from './items.json';
import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import ItemList from "@/app/week-8/item-list";
import NewItemForm from "@/app/week-8/new-item";
import MealIdeas from "@/app/week-8/meal-ideas";

export default function Page() {
    const { user } = useUserAuth();
    const [shoppingList, setShoppingList] = useState([]);
    const [grouped, setGrouped] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        if (user) {
            setShoppingList([...itemsData]);
        }
    }, [user]);

    if (!user) {
        return (
            <main className="flex items-center justify-center h-screen text-red-600 text-xl font-semibold">
                You need to be signed in to view this page.
            </main>
        );
    }

    const orderByName = () => {
        setGrouped(false);
        const sortedList = [...shoppingList].sort((a, b) =>
            a.name.localeCompare(b.name)
        );
        setShoppingList(sortedList);
    };

    const orderByCategory = () => {
        setGrouped(false);
        const sortedList = [...shoppingList].sort((a, b) =>
            a.category.localeCompare(b.category)
        );
        setShoppingList(sortedList);
    };

    const groupByCategory = () => {
        setGrouped(true);
        const sortedList = [...shoppingList].sort((a, b) => {
            if (a.category !== b.category) {
                return a.category.localeCompare(b.category);
            }
            return a.name.localeCompare(b.name);
        });
        setShoppingList(sortedList);
    };

    const handleAddItem = (newItem) => {
        setGrouped(false);
        setShoppingList([...shoppingList, newItem]);
    };

    const handleItemSelect = (newItem) => {
        let name = newItem.name.split(",")[0].trim().replace(/[\uD800-\uDFFF]/g, "");
        console.log('trimmed item name:', name);
        setSelectedItem(name);
    };

    return (
        <div className="bg-gray-950 min-h-screen p-8 text-white flex">
            <div className="flex-2">
                <h1 className="text-3xl font-bold mb-6">Shopping List</h1>
                <NewItemForm onAddItem={handleAddItem} />
                <div className="mb-6 flex space-x-4 items-end">
                    <span className="text-white">Sort by:</span>

                    <button
                        className="px-4 py-2 text-white w-24 text-base font-medium bg-orange-600 hover:bg-orange-700 text-center"
                        onClick={orderByName}
                    >
                        Name
                    </button>

                    <button
                        className="px-4 py-2 text-white w-24 text-base font-medium bg-orange-600 hover:bg-orange-700 text-center"
                        onClick={orderByCategory}
                    >
                        Category
                    </button>

                    <button
                        className="px-4 py-2 text-white w-24 text-base font-medium bg-orange-600 hover:bg-orange-700 text-center whitespace-normal"
                        onClick={groupByCategory}
                    >
                        Grouped Category
                    </button>
                </div>

                <div className="space-y-4">
                    {grouped ? (
                        Object.entries(
                            shoppingList.reduce((acc, item) => {
                                if (!acc[item.category]) {
                                    acc[item.category] = [];
                                }
                                acc[item.category].push(item);
                                return acc;
                            }, {})
                        ).map(([category, items]) => (
                            <div key={category}>
                                <h2 className="text-xl font-bold mb-2">{category}</h2>
                                <div className="pl-6 border-gray-700">
                                    <ItemList items={items} onSelectItem={handleItemSelect} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <ItemList items={shoppingList} onSelectItem={handleItemSelect} />
                    )}
                </div>
            </div>

            <div className="flex-[1] ml-4">
                <MealIdeas ingredient={selectedItem} />
            </div>
        </div>
    );
}
