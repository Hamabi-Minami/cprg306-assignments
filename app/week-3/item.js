

export function ItemComponent(props) {

    return(
        <div>
            <h2 className="font-bold text-2xl">{props.item.name}</h2>
            <p>{`buy ${props.item.quantity} in ${props.item.category}`}</p>
        </div>
    )
}