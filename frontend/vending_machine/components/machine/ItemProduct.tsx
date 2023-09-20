import { Item } from '@/type/api/stock/stock';
import { Button } from 'antd';

interface Props {
    item: Item;
    money: number;
}

export default function ItemProduct(props: Props) {
    return (
        <div className="flex flex-col justify-center items-center text-white">
            <img
                className="w-[100px] h-[100px]"
                src={props.item.product.image}
                alt={props.item.product.name}
            />
            <p>{props.item.product.name}</p>
            <p>฿ {props.item.product.price}</p>
            <Button
                type="primary"
                shape="round"
                disabled={props.money < props.item.product.price}
            >
                Buy
            </Button>
        </div>
    );
}
