import { Item } from '@/type/api/vending-machine/stock';
import { Button } from 'antd';

interface Props {
    item: Item
}

export default function ItemProduct(props: Props) {
    return (
        <div className="flex flex-col ">
            <img src={props.item.product.image} alt={props.item.product.name} />
            <p>{props.item.product.name}</p>
            <Button>Add</Button>
        </div>
    );
}
