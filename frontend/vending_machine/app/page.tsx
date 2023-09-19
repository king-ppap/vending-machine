"use client"

import { List, Typography } from 'antd';

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

export default function Home() {
    return (
        <List
            header={<div>Machine List</div>}
            bordered
            dataSource={data}
            renderItem={(item) => (
                <List.Item>
                    <Typography.Text mark>[ITEM]</Typography.Text> {item}
                </List.Item>
            )}
            className="bg-white"
        />
    );
}
