import { Banknote, Coin } from '@/type/api/vending-machine';
import ItemProduct from './ItemProduct';
import { useStock } from '@/api/stock';
import { StockResponse } from '@/type/api/vending-machine/stock';

interface Props {
    uuid: string;
    coins: Coin[];
    banknotes: Banknote[];
}

export default function Machine(props: Props) {
    const { data, isLoading } = useStock(props.uuid);

    const renderProducts = () => data.map((e) => <ItemProduct item={e} />);

    return (
        <div className="w-full bg-[#0D2491]">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-xl text-slate-50">
                    Simple Vending Machine
                </h1>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8">
                {isLoading ? <></> : renderProducts()}
            </div>
        </div>
    );
}
