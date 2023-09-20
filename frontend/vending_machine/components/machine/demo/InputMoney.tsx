'use client';
import { Banknote, Coin } from '@/type/api/vending-machine/get-vm-list';
import { Button, Card, Tag } from 'antd';

interface Props {
    title: string;
    coins: (Coin | Banknote)[];
    setCoins: Function;
    moneyList: (Coin | Banknote)[];
}

export default function InputMoney(props: Props) {
    const handleRemoveCoin = (index: number) => {
        const newCoins = props.coins.filter((tag, i) => i !== index);
        props.setCoins(newCoins);
    };

    const onClickAddCoin = (coin: Coin | Banknote) => {
        props.setCoins([...props.coins, coin]);
    };

    const forMap = (tag: Coin | Banknote, index: number) => {
        const tagElem = (
            <Tag
                closable
                onClose={(e) => {
                    e.preventDefault();
                    handleRemoveCoin(index);
                }}
            >
                {tag}
            </Tag>
        );
        return <span key={index}>{tagElem}</span>;
    };

    const tagChild: JSX.Element[] = props.coins.map(forMap);

    return (
        <Card title={props.title} className="bg-white">
            <div className="flex">
                {props.moneyList.map((e, i) => {
                    return (
                        <Button
                            className="mr-2"
                            key={i}
                            type="primary"
                            onClick={() => onClickAddCoin(e)}
                        >
                            {e}
                        </Button>
                    );
                })}
            </div>
            <div className="p-2"> {tagChild}</div>
        </Card>
    );
}
