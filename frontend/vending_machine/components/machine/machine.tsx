import { Banknote, Coin } from '@/type/api/vending-machine/get-vm-list';
import ItemProduct from './ItemProduct';
import { useStock } from '@/api/stock';
import AppLoadingFullScreen from '../app/AppLoadingFullScreen';
import { Alert } from 'antd';
import { useApiVendingMachineDetail } from '@/api/vending-machine';
import { IGetVendingMachineDetailResponse } from '@/type/api/vending-machine/get-vm-detail';
import { StockResponse } from '@/type/api/stock/stock';

interface Props {
    uuid: string;
    coins: Coin[];
    banknotes: Banknote[];
    sumMoney: number;
    vmDetail: {
        data: IGetVendingMachineDetailResponse;
        isLoading: boolean;
        error: any;
    };
    stock: {
        data: StockResponse;
        isLoading: boolean;
        error: any;
    };
}

export default function Machine(props: Props) {
    const renderProducts = () =>
        props.stock.data.map((e, i) => (
            <ItemProduct key={i} item={e} money={props.sumMoney} />
        ));

    return props.stock.isLoading ? (
        <AppLoadingFullScreen />
    ) : (
        <div className="w-full bg-[#0D2491]">
            <div className="flex flex-col items-center justify-center p-4">
                <h1 className="text-xl text-slate-50">
                    {props.vmDetail.data.name || 'Simple Vending Machine'}
                </h1>
            </div>
            <div className="max-h-[calc(100vh-60px)] overflow-y-auto grid gap-4 p-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 ">
                {renderProducts()}
            </div>
        </div>
    );
}
