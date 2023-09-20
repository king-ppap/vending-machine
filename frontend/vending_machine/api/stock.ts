import useSWR from 'swr';
import { fetcher } from ".";
import { StockResponse } from '@/type/api/vending-machine/stock';

export const useStock = (uuid: string) => {
    const url = `/stock/${uuid}/`;
    const { data, isLoading }: {
        data: StockResponse;
        isLoading: boolean;
    } = useSWR(url, (url) => fetcher(url));
    return { data, isLoading }
}
