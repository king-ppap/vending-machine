'use client';
import useSWR from 'swr';
import { Button, List, Typography } from 'antd';
import {
    IGetVendingMachineListResponse,
    IVendingMachine,
} from '@/type/api/vending-machine';
import AppLoadingFullScreen from '@/components/app/AppLoadingFullScreen';
import { useRouter } from 'next/navigation';

// import getConfig from 'next/config'
// const { publicRuntimeConfig } = getConfig();

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Home() {
    const router = useRouter();

    const onClickOpen = (uuid: string) => {
        router.push(`machine/${uuid}`);
    };

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
        <div>
            {process.env.NEXT_PUBLIC_API_ROOT}
            <List
                header={<div className="font-bold">Machine List</div>}
                bordered
                dataSource={data.results}
                renderItem={(item: IVendingMachine) => (
                    <List.Item>
                        <div className="w-full flex justify-between">
                            <div>
                                <Typography.Text mark>
                                    [{item.uuid}]
                                </Typography.Text>{' '}
                                {item.name}
                            </div>
                            <Button
                                type="primary"
                                onClick={() => onClickOpen(item.uuid)}
                            >
                                Open
                            </Button>
                        </div>
                    </List.Item>
                )}
                className="bg-white"
            />
        </div>
    );
}
