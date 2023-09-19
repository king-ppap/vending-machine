import { Button, ConfigProvider } from 'antd';
import theme from '../theme/themeConfig';

export default function Home() {
    return (
        <ConfigProvider theme={theme}>
            <Button type="primary">Button</Button>
        </ConfigProvider>
    );
}
