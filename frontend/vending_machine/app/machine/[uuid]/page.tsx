'use client';
import InputMoney from '@/components/machine/demo/InputMoney';
import Machine from '@/components/machine/machine';
import { Banknotes, Coin } from '@/type/api/vending-machine';
import { Button, Switch } from 'antd';
import { useState } from 'react';

export default function Page({ params }: { params: { uuid: string } }) {
    const [isShowDebug, setIsShowDebug] = useState(true);
    let [coins, setCoins] = useState<Coin[]>([]);

    const onChangeDebug = (checked: boolean) => {
        setIsShowDebug(checked);
    };

    return (
        <div className="w-full h-[100vh]">
            <div>
                {isShowDebug ? (
                    <div className="w-full flex bg-slate-300">
                        <p className="mr-2">Debug: {`${isShowDebug}`}</p>
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
                <Machine />
                {isShowDebug ? (
                    <div className="max-w-[400px] min-w-[400px] bg-slate-300 p-">
                        <InputMoney
                            title="Input Coin"
                            coins={coins}
                            setCoins={setCoins}
                            moneyList={[Coin.COIN_1, Coin.COIN_5, Coin.COIN_10]}
                        />
                        <InputMoney
                            title="Input Banknote"
                            coins={coins}
                            setCoins={setCoins}
                            moneyList={[
                                Banknotes.BANKNOTES_20,
                                Banknotes.BANKNOTES_50,
                                Banknotes.BANKNOTES_100,
                                Banknotes.BANKNOTES_500,
                                Banknotes.BANKNOTES_1000
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
