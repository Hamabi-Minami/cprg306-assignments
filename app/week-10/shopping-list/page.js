"use client";

import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import ItemList from "@/app/week-8/item-list";
import NewItemForm from "@/app/week-8/new-item";
import MealIdeas from "@/app/week-8/meal-ideas";
import { getItems, addItem, deleteItem } from "../_services/shopping-list-service";

export default function Page() {
    const { user } = useUserAuth();
    const [shoppingList, setShoppingList] = useState([]);
    const [grouped, setGrouped] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Load shopping list items from Firestore
    const loadItems = async () => {
        if (user) {
            const fetchedItems = await getItems(user.uid);
            setShoppingList(fetchedItems);
        }
    };

    // Fetch data when component mounts or when user changes
    useEffect(() => {
        loadItems();
    }, [user]);

    if (!user) {
        return (
            <main className="flex items-center justify-center h-screen text-red-600 text-xl font-semibold">
                You need to be signed in to view this page.
            </main>
        );
    }

    // Sort by item name
    const orderByName = () => {
        setGrouped(false);
        const sortedList = [...shoppingList].sort((a, b) =>
            a.name.localeCompare(b.name)
        );
        setShoppingList(sortedList);
    };

    // Sort by category
    const orderByCategory = () => {
        setGrouped(false);
        const sortedList = [...shoppingList].sort((a, b) =>
            a.category.localeCompare(b.category)
        );
        setShoppingList(sortedList);
    };

    // Group items by category
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

    // Add new item to Firestore and local state
    const handleAddItem = async (newItem) => {
        if (!user) return;
        const id = await addItem(user.uid, newItem);
        setGrouped(false);
        setShoppingList([...shoppingList, { id, ...newItem }]);
    };

    // Delete item from Firestore and local state
    const handleDeleteItem = async (itemId) => {
        if (!user) return;
        await deleteItem(user.uid, itemId);
        setShoppingList(shoppingList.filter((item) => item.id !== itemId));
    };

    // Select item and trim name
    const handleItemSelect = (newItem) => {
        let name = newItem.name.split(",")[0].trim().replace(/[\uD800-\uDFFF]/g, "");
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
                                    <ItemList
                                        items={items}
                                        onSelectItem={handleItemSelect}
                                        onDeleteItem={handleDeleteItem}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <ItemList
                            items={shoppingList}
                            onSelectItem={handleItemSelect}
                            onDeleteItem={handleDeleteItem}
                        />
                    )}
                </div>
            </div>

            <div className="flex-[1] ml-4">
                <MealIdeas ingredient={selectedItem} />
            </div>
        </div>
    );
}
