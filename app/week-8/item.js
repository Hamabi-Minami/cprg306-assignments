export function ItemComponent({item, onSelect}) {

    return(
        <div
            className="p-2 bg-gray-900 text-white rounded-lg shadow cursor-pointer hover:bg-gray-700"
            onClick={() => onSelect(item)}
        >
            <h2 className="font-bold text-2xl">{item.name}</h2>
            <p>{`buy ${item.quantity} in ${item.category}`}</p>
        </div>
    )
}