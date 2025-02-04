import {ItemComponent} from "@/app/week-3/item";

export default function ItemList() {
    const item1 = {
        name: "milk, 4 L 🥛",
        quantity: 1,
        category: "dairy",
    };

    const item2 = {
        name: "bread 🍞",
        quantity: 2,
        category: "bakery",
    };

    const item3 = {
        name: "eggs, dozen 🥚",
        quantity: 2,
        category: "dairy",
    };

    const item4 = {
        name: "bananas 🍌",
        quantity: 6,
        category: "produce",
    };

    const item5 = {
        name: "broccoli 🥦",
        quantity: 3,
        category: "produce",
    };

    const item6 = {
        name: "chicken breasts, 1 kg 🍗",
        quantity: 1,
        category: "meat",
    };

    const item7 = {
        name: "pasta sauce 🍝",
        quantity: 3,
        category: "canned goods",
    };

    const item8 = {
        name: "spaghetti, 454 g 🍝",
        quantity: 2,
        category: "dry goods",
    };

    const item9 = {
        name: "toilet paper, 12 pack 🧻",
        quantity: 1,
        category: "household",
    };

    const item10 = {
        name: "paper towels, 6 pack",
        quantity: 1,
        category: "household",
    };

    const item11 = {
        name: "dish soap 🍽️",
        quantity: 1,
        category: "household",
    };

    const item12 = {
        name: "hand soap 🧼",
        quantity: 4,
        category: "household",
    };
    const items = [item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item11, item12];

    return (
        <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="bg-gray-900 text-white p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300"
                    >
                        <ItemComponent item={item} />
                    </div>
                ))}
            </div>
        </div>
    )
}