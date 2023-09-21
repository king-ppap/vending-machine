import { IItemProduct } from '@/type/api/stock/stock';
import { Button, Card } from 'antd';

interface Props {
    item: IItemProduct;
    money: number;
    onClickBuy: Function;
}

export default function ItemProduct(props: Props) {
    return props.item.count > 0 ? (
        <div className="p-3 rounded-2xl flex flex-col justify-center items-center bg-[#ffffff89] text-white">
            <div className='text-center'>
                <img
                    className="w-[100px] h-[100px] object-cover"
                    src={props.item.product.image}
                    alt={props.item.product.name}
                />
                <p className="mt-2">
                    {props.item.product.name} ({props.item.count})
                </p>
                <p>฿ {props.item.product.price}</p>
            </div>
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
