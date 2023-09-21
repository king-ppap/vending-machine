import useSWR from 'swr';
import { fetcher } from ".";
import { TStockResponse } from '@/type/api/stock/stock';
import { IBuyItemRequest, IBuyItemResponse } from '@/type/api/stock/buy-item';

const useStock = (uuid: string) => {
    const url = `/stock/${uuid}/`;
    const { data, isLoading, error }: {
        data: TStockResponse;
        isLoading: boolean;
        error: any;
    } = useSWR(url, (url) => fetcher(url));
    return { data, isLoading, error }
}

const apiBuyItem = (itemId: number, body: IBuyItemRequest): Promise<IBuyItemResponse> => {
    return fetcher(`/stock/buy/${itemId}/`, {
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