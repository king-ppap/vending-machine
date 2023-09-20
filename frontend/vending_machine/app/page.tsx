'use client';
import useSWR from 'swr';
import { List, Typography } from 'antd';
import {
    IGetVendingMachineListResponse,
    IVendingMachine,
} from '@/type/api/vending-machine';
import AppLoadingFullScreen from '@/components/app/AppLoadingFullScreen';

// import getConfig from 'next/config'
// const { publicRuntimeConfig } = getConfig();

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Home() {
    const {
        data,
        error,
        isLoading,
    }: {
        data: IGetVendingMachineListResponse;
        error: any;
        isLoading: boolean;
    } = useSWR(`http://localhost:8989/vending-machine/`, fetcher);

    if (error) {
        return <p>Cannot get vending-machine list</p>;
    }

    return isLoading ? (
        <AppLoadingFullScreen />
    ) : (
        <List
            header={<div>Machine List</div>}
            bordered
            dataSource={data.results}
            renderItem={(item: IVendingMachine) => (
                <List.Item>
                    <Typography.Text mark>[{item.uuid}]</Typography.Text>{' '}
                    {item.name}
                </List.Item>
            )}
            className="bg-white"
        />
    );
}
