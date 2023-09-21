import useSWR from 'swr';
import { fetcher } from ".";
import { IGetVendingMachineListResponse } from '@/type/api/vending-machine/get-vm-list';
import { IGetVendingMachineDetailResponse } from '@/type/api/vending-machine/get-vm-detail';
import { IPatchVmDetail } from '@/type/api/vending-machine/patch-vm-detail';

const useApiGetVendingMachineList = () => {
    const url = '/vending-machine/';
    const { data, isLoading, error }: {
        data: IGetVendingMachineListResponse;
        isLoading: boolean;
        error: any;
    } = useSWR(url, (url) => fetcher(url));
    return { data, isLoading, error };
}

const apiGetVendingMachineDetail = (uuid: string) => {
    const url = `/vending-machine/${uuid}/`;
    return fetcher(url);
}

const apiGetVendingMachinePatchDetail = (uuid: string, body: IPatchVmDetail) => {
    return fetcher(`/vending-machine/${uuid}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
}

const useApiVendingMachinePatchDetailSwr = (uuid: string, body: IPatchVmDetail | null) => {
    const url = `/vending-machine/${uuid}/`;
    const { data, isLoading, error }: {
        data: IGetVendingMachineDetailResponse;
        isLoading: boolean;
        error: any;
    } = useSWR(url, (url) => fetcher(url, { method: 'patch', body: JSON.stringify(body) }));
    return { data, isLoading, error };
}

export {
    useApiGetVendingMachineList,
    apiGetVendingMachineDetail,
    apiGetVendingMachinePatchDetail,
    useApiVendingMachinePatchDetailSwr,
}
