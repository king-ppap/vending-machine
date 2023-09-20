import { Spin } from 'antd';

export default function AppLoadingFullScreen() {
    return (
        <div className="w-full h-[100vh] flex items-center justify-center">
            <Spin size="large" />
        </div>
    );
}
