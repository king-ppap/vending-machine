'use client';
import { Button, Card, Tag } from 'antd';
import { useState } from 'react';

enum Coin {
    COIN_1 = 1,
    COIN_5 = 5,
    COIN_10 = 10,
}

export default function InputCoin() {
    let [coins, setCoins] = useState<Coin[]>([]);

    const handleRemoveCoin = (index: number) => {
        const newCoins = coins.filter((tag, i) => i !== index);
        setCoins(newCoins);
    };

    const onClickAddCoin = (coin: Coin) => {
        setCoins([...coins, coin]);
    };

    const forMap = (tag: Coin, index: number) => {
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

    const tagChild = coins.map(forMap);

    return (
        <Card title="Input Coin" className="bg-white">
            <div className="grid grid-cols-4 grid-flow-col gap-2">
                <p>Add coin: </p>
                <Button
                    type="primary"
                    onClick={() => onClickAddCoin(Coin.COIN_1)}
                >
                    1
                </Button>
                <Button
                    type="primary"
                    onClick={() => onClickAddCoin(Coin.COIN_5)}
                >
                    5
                </Button>
                <Button
                    type="primary"
                    onClick={() => onClickAddCoin(Coin.COIN_10)}
                >
                    10
                </Button>
            </div>
            <div className="p-2"> {tagChild}</div>
        </Card>
    );
}
