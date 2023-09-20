import useSWR from 'swr';
import { fetcher } from ".";
import { IGetVendingMachineListResponse } from '@/type/api/vending-machine/get-vm-list';
import { IGetVendingMachineDetailResponse } from '@/type/api/vending-machine/get-vm-detail';

export const useApiGetVendingMachineList = () => {
    const url = '/vending-machine/';
    const { data, isLoading, error }: {
        data: IGetVendingMachineListResponse;
        isLoading: boolean;
        error: any;
    } = useSWR(url, (url) => fetcher(url));
    return { data, isLoading, error }
}

export const useApiVendingMachineDetail = (uuid: string) => {
    const url = `/vending-machine/${uuid}/`;
    const { data, isLoading, error }: {
        data: IGetVendingMachineDetailResponse;
        isLoading: boolean;
        error: any;
    } = useSWR(url, (url) => fetcher(url));
    return { data, isLoading, error }
}
