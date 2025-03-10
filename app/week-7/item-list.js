import {ItemComponent} from "@/app/week-7/item";

export default function ItemList({items}) {
    return(
        <div className="w-full max-w-sm">
            {items.map((item) => (
                <div
                    key={item.id}
                    className="bg-gray-900 text-white p-1 rounded-lg shadow w-full mb-3"
                >
                    <ItemComponent item={item} />
                </div>
            ))}
        </div>
    )
}
