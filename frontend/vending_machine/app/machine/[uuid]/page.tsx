'use client';
import { fetcher } from '@/api';
import { useStock } from '@/api/stock';
import {
    apiGetVendingMachinePatchDetail,
    useApiVendingMachineDetail,
} from '@/api/vending-machine';
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
    const [refundMoney, setRefundMoney] = useState<{
        coins: Coin[];
        banknotes: Banknote[];
    }>({ coins: [], banknotes: [] });

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
        setRefundMoney({ coins, banknotes });
        setCoins([]);
        setBanknotes([]);
    };
    const onClickBuy = (item: IItemProduct) => {
        item.product.price;
        const change = sumMoney - item.product.price;
        const changeMoney = calChange(change);
        console.log('onClickBuy', changeMoney);
    };

    const onAddMoney = (money: Coin | Banknote, moneyType: MoneyType) => {
        const moneyKey = `${moneyType}_${money}`;
        if (!vmDetail) return;

        apiGetVendingMachinePatchDetail(params.uuid, {
            [moneyKey]: Number(vmDetail[moneyKey]) + 1,
        }).then((res) => {
            set่VmDetail(res);
        });
    };

    const renderMoneyBox = () => {
        const coinsR = refundMoney.coins.map((e, i) => (
            <Tag key={`c-${i}`} color="blue">
                {e}
            </Tag>
        ));
        const banknotesR = refundMoney.banknotes.map((e, i) => (
            <Tag key={`b-${i}`} color="volcano">
                {e}
            </Tag>
        ));
        const tagElem = [...coinsR, ...banknotesR];
        return <span>{tagElem}</span>;
    };

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
                            <p>Money box: {renderMoneyBox()}</p>
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
