import {ItemComponent} from "@/app/week-6/item";

export default function ItemList({shoppingList}) {
    return(
        <div className="w-full max-w-sm">
            {shoppingList.map((item, index) => (
                <div
                    key={index}
                    className="bg-gray-900 text-white p-1 rounded-lg shadow w-full mb-3"
                >
                    <ItemComponent item={item} />
                </div>
            ))}
        </div>
    )
}
