import { Item } from '@/type/api/vending-machine/stock';
import { Button } from 'antd';
import Image from 'next/image';

interface Props {
    item: Item
}

export default function Item(props: Props) {
    return (
        <div className="flex flex-col ">
            <Image src={props.item.product.image} alt={props.item.product.name} />
            <p>{props.item.product.name}</p>
            <Button>Add</Button>
        </div>
    );
}
