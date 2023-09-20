'use client';
import { Banknote, Coin } from '@/type/api/vending-machine';
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
            <div className={`grid grid-cols-${props.moneyList.length} grid-flow-col gap-2`}>
                <p>Add: </p>
                {props.moneyList.map((e, i) => {
                    return (
                        <Button
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
