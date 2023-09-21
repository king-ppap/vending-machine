import useSWR from 'swr';
import { fetcher } from ".";
import { TStockResponse } from '@/type/api/stock/stock';
import { IBuyItemRequest } from '@/type/api/stock/buy-item';

const useStock = (uuid: string) => {
    const url = `/stock/${uuid}/`;
    const { data, isLoading, error }: {
        data: TStockResponse;
        isLoading: boolean;
        error: any;
    } = useSWR(url, (url) => fetcher(url));
    return { data, isLoading, error }
}

const apiBuyItem = (uuid: string, itemId: number, body: IBuyItemRequest) => {
    return fetcher(`/stock/${uuid}/buy/${itemId}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
}

export {
    useStock,
    apiBuyItem,
}