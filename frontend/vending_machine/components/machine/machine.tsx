import { Banknote, Coin } from '@/type/api/vending-machine/get-vm-list';
import ItemProduct from './ItemProduct';
import { useStock } from '@/api/stock';
import { StockResponse } from '@/type/api/stock/stock';
import AppLoadingFullScreen from '../app/AppLoadingFullScreen';
import { Alert } from 'antd';
import { useApiVendingMachineDetail } from '@/api/vending-machine';

interface Props {
    uuid: string;
    coins: Coin[];
    banknotes: Banknote[];
}

export default function Machine(props: Props) {
    const vmDetail = useApiVendingMachineDetail(props.uuid);
    const stock = useStock(props.uuid);

    if (vmDetail.error || stock.error)
        return (
            <div className="w-full bg-slate-700 flex justify-center items-center">
                {vmDetail.error ? (
                    <Alert
                        message="Error: Can not get vending machine detail"
                        type="error"
                        showIcon
                    />
                ) : (
                    <></>
                )}
                {stock.error ? (
                    <Alert
                        message="Error: Can not get stock"
                        type="error"
                        showIcon
                    />
                ) : (
                    <></>
                )}
            </div>
        );

    const renderProducts = () =>
        stock.data.map((e, i) => <ItemProduct key={i} item={e} />);

    return stock.isLoading ? (
        <AppLoadingFullScreen />
    ) : (
        <div className="w-full bg-[#0D2491]">
            <div className="flex flex-col items-center justify-center p-4">
                <h1 className="text-xl text-slate-50">
                    {vmDetail.data.name || 'Simple Vending Machine'}
                </h1>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8">
                {renderProducts()}
            </div>
        </div>
    );
}
