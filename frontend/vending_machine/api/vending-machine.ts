import useSWR from 'swr';
import { fetcher } from ".";
import { IGetVendingMachineListResponse } from '@/type/api/vending-machine';

export const useApiVendingMachineList = () => {
    const url = '/vending-machine/';
    const { data, isLoading, error }: {
        data: IGetVendingMachineListResponse;
        isLoading: boolean;
        error: any;
    } = useSWR(url, (url) => fetcher(url));
    return { data, isLoading, error }
}
