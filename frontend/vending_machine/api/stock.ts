import useSWR from 'swr';
import { fetcher } from ".";
import { StockResponse } from '@/type/api/stock/stock';

export const useStock = (uuid: string) => {
    const url = `/stock/${uuid}/`;
    const { data, isLoading, error }: {
        data: StockResponse;
        isLoading: boolean;
        error: any;
    } = useSWR(url, (url) => fetcher(url));
    return { data, isLoading, error }
}
