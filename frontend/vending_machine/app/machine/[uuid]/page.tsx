'use client';
import { fetcher } from '@/api';
import { useStock } from '@/api/stock';
import { useApiVendingMachineDetail } from '@/api/vending-machine';
import useSWR from 'swr';
import Machine from '@/components/machine/Machine';
import InputMoney from '@/components/machine/demo/InputMoney';
import { IItemProduct, MoneyType } from '@/type/api/stock/stock';
import { Banknote, Coin } from '@/type/api/vending-machine/get-vm-list';
import { Alert, Button, Card, Switch, Tag, Input } from 'antd';
import { useEffect, useState } from 'react';
import { IGetVendingMachineDetailResponse } from '@/type/api/vending-machine/get-vm-detail';
const { TextArea } = Input;

export default function Page({ params }: { params: { uuid: string } }) {
    const [vmDetail, set่VmDetail] =
        useState<IGetVendingMachineDetailResponse | null>(null);

    useEffect(() => {
        useApiVendingMachineDetail(params.uuid).then((res) => {
            set่VmDetail(res);
        });
    }, []);

    const stock = useStock(params.uuid);
    if (stock.error)
        return (
            <div className="w-full bg-slate-700 flex justify-center items-center">
                {stock.error && (
                    <Alert
                        message="Error: Can not get stock"
                        type="error"
                        showIcon
                    />
                )}
            </div>
        );

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
    const onClickBuy = (item: IItemProduct) => {
        item.product.price;
        const change = sumMoney - item.product.price;
        const changeMoney = calChange(change);
        console.log('onClickBuy', changeMoney);
    };
    const calChange = (changeAmount: number) => {
        let coins = [];
        let banknotes = [];

        let {
            banknotes_100,
            banknotes_1000,
            banknotes_20,
            banknotes_50,
            banknotes_500,
            coin_1,
            coin_10,
            coin_5,
        } = vmDetail;

        while (changeAmount > 0) {
            if (changeAmount >= 1000) {
                banknotes.push(1000);
                changeAmount -= 1000;
            } else if (changeAmount >= 500) {
                banknotes.push(500);
                changeAmount -= 500;
            } else if (changeAmount >= 100) {
                banknotes.push(100);
                changeAmount -= 100;
            } else if (changeAmount >= 50) {
                banknotes.push(50);
                changeAmount -= 50;
            } else if (changeAmount >= 20) {
                banknotes.push(20);
                changeAmount -= 20;
            } else if (changeAmount >= 10) {
                coins.push(10);
                changeAmount -= 10;
            } else if (changeAmount >= 5) {
                coins.push(5);
                changeAmount -= 5;
            } else if (changeAmount >= 1) {
                coins.push(1);
                changeAmount -= 1;
            }
        }

        return {
            coins,
            banknotes,
        };
    };

    const onAddMoney = (money: Coin | Banknote, moneyType: MoneyType) => {
        const moneyKey = `${moneyType}_${money}`;
        if (!vmDetail) return;

        fetcher(`/vending-machine/${params.uuid}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                [moneyKey]: Number(vmDetail[moneyKey]) + 1,
            }),
        }).then((res) => {
            set่VmDetail(res);
        });
    };

    const forMapTagRefundMoney = (tag: Coin | Banknote, index: number) => {
        const tagElem = <Tag color="blue">{tag}</Tag>;
        return <span key={index}>{tagElem}</span>;
    };
    const tagRefundMoney = refundMoney.map(forMapTagRefundMoney);

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
                {vmDetail && (
                    <Machine
                        vmDetail={vmDetail}
                        stock={stock}
                        uuid={params.uuid}
                        coins={coins}
                        banknotes={banknotes}
                        sumMoney={sumMoney}
                        onClickBuy={onClickBuy}
                    />
                )}
                {isShowDebug && (
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
                            moneyType="coin"
                            moneys={coins}
                            setMoneys={setCoins}
                            moneyList={[Coin.COIN_1, Coin.COIN_5, Coin.COIN_10]}
                            onAddMoney={onAddMoney}
                        />
                        <div className="mt-2"></div>
                        <InputMoney
                            title="Input Banknote"
                            moneyType="banknote"
                            moneys={banknotes}
                            setMoneys={setBanknotes}
                            moneyList={[
                                Banknote.BANKNOTE_20,
                                Banknote.BANKNOTE_50,
                                Banknote.BANKNOTE_100,
                                Banknote.BANKNOTE_500,
                                Banknote.BANKNOTE_1000,
                            ]}
                            onAddMoney={onAddMoney}
                        />
                        <div className="mt-2"></div>
                        <Card>
                            <TextArea
                                rows={13}
                                value={JSON.stringify(vmDetail, null, ' ')}
                            ></TextArea>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
