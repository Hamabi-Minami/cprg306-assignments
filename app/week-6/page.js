"use client"
import data from './items.json';
import {useState} from "react";

import ItemList from "@/app/week-6/item-list";

export default function Page() {

    const [shoppingList, setShoppingList] = useState([...data]);
    const [grouped, setGrouped] = useState(false);

    const orderByName = () => {
        setGrouped(false);
        const sortedList = [...shoppingList].sort((a, b) =>
            a.name.localeCompare(b.name)
        );
        setShoppingList(sortedList);
    }

    const orderByCategory = () => {
        setGrouped(false);
        const sortedList = [...shoppingList].sort((a, b) =>
            a.category.localeCompare(b.category)
        );
        setShoppingList(sortedList);
    }

    const groupByCategory = () => {
        setGrouped(true);
        const sortedList = [...shoppingList].sort((a, b) => {
            if (a.category !== b.category) {
                return a.category.localeCompare(b.category);
            }
            return a.name.localeCompare(b.name);
        });
        setShoppingList(sortedList);
    }

    return (
        <div className="bg-gray-950 min-h-screen p-8 text-white">

            <h1 className="text-3xl font-bold mb-6">Shopping List</h1>
            <div className="mb-6 flex space-x-4 items-end">
                <span className="text-white">Sort by:</span>

                <button
                    className="px-4 py-2  text-white w-24 text-base font-medium bg-orange-600 hover:bg-orange-700 text-center"
                    onClick={orderByName}>
                    Name
                </button>

                <button
                    className="px-4 py-2 text-white w-24  text-base font-medium bg-orange-600 hover:bg-orange-700 text-center"
                    onClick={orderByCategory}>
                    Category
                </button>

                <button
                    className="px-4 py-2 text-white  w-24 text-base font-medium bg-orange-600 hover:bg-orange-700 text-center whitespace-normal"
                    onClick={groupByCategory}>
                    Grouped Category
                </button>
            </div>


            <div className="space-y-4">
                {grouped ? (
                    Object.entries(
                        shoppingList.reduce((acc, item) => {
                            if (!acc[item.category]){
                                acc[item.category] = [];
                            }
                            acc[item.category].push(item);
                            return acc;
                        }, {})
                    ).map(([category, items]) => (
                        <div key={category}>
                            <h2 className="text-xl font-bold mb-2">{category}</h2> {/* Category Header */}
                            <div className="pl-6 border-gray-700">  {/* Add Indent & Left Border */}
                                <ItemList shoppingList={items} />
                            </div>
                        </div>
                    ))
                ) : (
                    <ItemList shoppingList={shoppingList}/>
                )
                }
            </div>
        </div>
    )
}