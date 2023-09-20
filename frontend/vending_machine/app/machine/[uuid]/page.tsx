'use client';
import InputCoin from '@/components/machine/demo/InputCoin';
import Machine from '@/components/machine/machine';
import { Button, Switch } from 'antd';
import { useState } from 'react';

export default function Page({ params }: { params: { uuid: string } }) {
    const [isShowDebug, setIsShowDebug] = useState(true);

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
                        <InputCoin />
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
