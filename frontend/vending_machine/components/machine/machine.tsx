import { Banknote, Coin } from '@/type/api/vending-machine/get-vm-list';
import ItemProduct from './ItemProduct';
import AppLoadingFullScreen from '../app/AppLoadingFullScreen';
import { Result } from 'antd';
import { IGetVendingMachineDetailResponse } from '@/type/api/vending-machine/get-vm-detail';
import { TStockResponse } from '@/type/api/stock/stock';

interface Props {
    uuid: string;
    coins: Coin[];
    banknotes: Banknote[];
    sumMoney: number;
    vmDetail: IGetVendingMachineDetailResponse;
    stock: {
        data: TStockResponse;
        isLoading: boolean;
        error: any;
    };
    onClickBuy: Function;
}

export default function Machine(props: Props) {
    const {
        banknote_100,
        banknote_1000,
        banknote_20,
        banknote_50,
        banknote_500,
        coin_1,
        coin_10,
        coin_5,
    } = props.vmDetail;
    const isNoMoney =
        banknote_100 +
            banknote_1000 +
            banknote_20 +
            banknote_50 +
            banknote_500 +
            coin_1 +
            coin_10 +
            coin_5 <=
        0;

    if (isNoMoney) {
        return (
            <div className="w-full flex justify-center items-center">
                <Result
                    status="error"
                    title="Out of service."
                    subTitle="Insufficient funds"
                />
            </div>
        );
    }

    const renderProducts = () =>
        props.stock.data.map((e, i) => (
            <ItemProduct
                key={i}
                item={e}
                money={props.sumMoney}
                onClickBuy={props.onClickBuy}
            />
        ));

    return props.stock.isLoading || props.vmDetail.isLoading ? (
        <AppLoadingFullScreen />
    ) : (
        <div className="w-full bg-[#0D2491]">
            <div className="flex flex-col items-center justify-center p-4">
                <h1 className="text-xl text-slate-50">
                    {props.vmDetail.name || 'Simple Vending Machine'}
                </h1>
            </div>
            <div className="max-h-[calc(100vh-60px)] overflow-y-auto grid gap-4 p-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 ">
                {renderProducts()}
            </div>
        </div>
    );
}
