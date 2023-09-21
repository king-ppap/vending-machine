import { IItemProduct } from '@/type/api/stock/stock';
import { Button } from 'antd';

interface Props {
    item: IItemProduct;
    money: number;
    onClickBuy: Function;
}

export default function ItemProduct(props: Props) {
    return props.item.count > 0 ? (
        <div className="flex flex-col justify-center items-center text-white">
            <img
                className="w-[100px] h-[100px] object-cover"
                src={props.item.product.image}
                alt={props.item.product.name}
            />
            <p className="mt-2">{props.item.product.name} ({props.item.count})</p>
            <p>฿ {props.item.product.price}</p>
            <Button
                className="mt-2"
                type="primary"
                shape="round"
                disabled={props.money < props.item.product.price}
                onClick={() => props.onClickBuy(props.item)}
            >
                Buy
            </Button>
        </div>
    ) : (
        <></>
    );
}
