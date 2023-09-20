import { Banknote, Coin } from '@/type/api/vending-machine';
import ItemProduct from './ItemProduct';
import { useStock } from '@/api/stock';
import { StockResponse } from '@/type/api/vending-machine/stock';
import AppLoadingFullScreen from '../app/AppLoadingFullScreen';
import { Alert } from 'antd';

interface Props {
    uuid: string;
    coins: Coin[];
    banknotes: Banknote[];
}

export default function Machine(props: Props) {
    const { data, isLoading, error } = useStock(props.uuid);

    if (error)
        return (
            <div className='w-full flex justify-center items-center'>
                <Alert
                    message="Error: Can not get stock"
                    type="error"
                    showIcon
                />
            </div>
        );

    const renderProducts = () =>
        data.map((e, i) => <ItemProduct key={i} item={e} />);

    return isLoading ? (
        <AppLoadingFullScreen />
    ) : (
        <div className="w-full bg-[#0D2491]">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-xl text-slate-50">
                    Simple Vending Machine
                </h1>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8">
                {renderProducts()}
            </div>
        </div>
    );
}
