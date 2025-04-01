export function ItemComponent({ item, onSelect, onDelete }) {
    return (
        <div
            className="p-2 bg-gray-900 text-white rounded-lg shadow cursor-pointer hover:bg-gray-700 flex justify-between items-center"
            onClick={() => onSelect(item)}
        >
            <div>
                <h2 className="font-bold text-2xl">{item.name}</h2>
                <p>{`buy ${item.quantity} in ${item.category}`}</p>
            </div>
            {onDelete && (
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // prevent onSelect
                        onDelete(item.id);
                    }}
                    className="ml-4 text-red-500 hover:underline"
                >
                    Delete
                </button>
            )}
        </div>
    );
}
