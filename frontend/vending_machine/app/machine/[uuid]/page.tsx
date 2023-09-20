import { Button } from 'antd';

export default function Page({ params }: { params: { uuid: string } }) {
    return (
        <div>
            <p>Machine ID: {params.uuid}</p>
            <Button type="primary">Test</Button>
        </div>
    );
}
