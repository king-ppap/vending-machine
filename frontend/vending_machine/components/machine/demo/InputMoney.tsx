'use client';
import { MoneyType } from '@/type/api/stock/stock';
import { Banknote, Coin } from '@/type/api/vending-machine/get-vm-list';
import { Button, Card, Tag } from 'antd';

interface Props {
    title: string;
    moneyType: MoneyType;
    moneys: (Coin | Banknote)[];
    setMoneys: Function;
    moneyList: (Coin | Banknote)[];
    onAddMoney: Function;
}

export default function InputMoney(props: Props) {
    const onClickAddCoin = (money: Coin | Banknote) => {
        props.setMoneys([...props.moneys, money]);
        props.onAddMoney(money, props.moneyType);
    };

    const forMap = (tag: Coin | Banknote, index: number) => {
        const tagElem = <Tag>{tag}</Tag>;
        return <span key={index}>{tagElem}</span>;
    };

    const tagChild: JSX.Element[] = props.moneys.map(forMap);

    return (
        <Card title={props.title}>
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
