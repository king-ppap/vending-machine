'use client';
import Machine from '@/components/machine/Machine';
import InputMoney from '@/components/machine/demo/InputMoney';
import { Banknote, Coin } from '@/type/api/vending-machine/get-vm-list';
import { Button, Card, Switch, Tag } from 'antd';
import { useEffect, useState } from 'react';

export default function Page({ params }: { params: { uuid: string } }) {
    const [isShowDebug, setIsShowDebug] = useState(true);
    const [coins, setCoins] = useState<Coin[]>([]);
    const [banknotes, setBanknotes] = useState<Banknote[]>([]);
    const [sumMoney, setSumMoney] = useState<number>(0);
    const [refundMoney, setRefundMoney] = useState<(Coin | Banknote)[]>([]);

    useEffect(() => {
        let sum = 0;
        if (coins.length) sum = sum + coins.reduce((a, b) => a + b);
        if (banknotes.length) sum = sum + banknotes.reduce((a, b) => a + b);
        setSumMoney(sum);
    }, [coins, banknotes]);

    const onChangeDebug = (checked: boolean) => {
        setIsShowDebug(checked);
    };

    const onClickRefund = () => {
        setRefundMoney([...coins, ...banknotes]);
        setCoins([]);
        setBanknotes([]);
    };

    const forMap = (tag: Coin | Banknote, index: number) => {
        const tagElem = <Tag color="blue">{tag}</Tag>;
        return <span key={index}>{tagElem}</span>;
    };
    const tagRefundMoney: JSX.Element[] = refundMoney.map(forMap);

    return (
        <div className="w-full h-[100vh]">
            <div>
                {isShowDebug ? (
                    <div className="w-full flex bg-slate-300">
                        <p className="mr-2">Debug:</p>
                        <Switch
                            onChange={onChangeDebug}
                            defaultChecked
                        ></Switch>
                        <p className="ml-2">Machine ID: {params.uuid}</p>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <div className="w-full h-full flex justify-between">
                <Machine
                    uuid={params.uuid}
                    coins={coins}
                    banknotes={banknotes}
                    sumMoney={sumMoney}
                />
                {isShowDebug ? (
                    <div className="max-w-[400px] min-w-[400px] bg-slate-300 p-2">
                        <Card>
                            <p>Money: {sumMoney}</p>
                            <Button className="my-2" onClick={onClickRefund}>
                                Refund
                            </Button>
                            <p>Refund box: {tagRefundMoney}</p>
                        </Card>
                        <div className="mt-2"></div>
                        <InputMoney
                            title="Input Coin"
                            coins={coins}
                            setCoins={setCoins}
                            moneyList={[Coin.COIN_1, Coin.COIN_5, Coin.COIN_10]}
                        />
                        <div className="mt-2"></div>
                        <InputMoney
                            title="Input Banknote"
                            coins={banknotes}
                            setCoins={setBanknotes}
                            moneyList={[
                                Banknote.BANKNOTE_20,
                                Banknote.BANKNOTE_50,
                                Banknote.BANKNOTE_100,
                                Banknote.BANKNOTE_500,
                                Banknote.BANKNOTE_1000,
                            ]}
                        />
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
