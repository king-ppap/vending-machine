import React from 'react';
import { Sarabun } from 'next/font/google';

import StyledComponentsRegistry from '../lib/AntdRegistry';

import './globals.css';

import { ConfigProvider } from 'antd';
import theme from '../theme/themeConfig';

const sarabun = Sarabun({ subsets: ['latin'], weight: '400' });

export const metadata = {
    title: 'Vending Machine',
    description: 'Vending Machine for SME',
};

const RootLayout = ({ children }: React.PropsWithChildren) => (
    <html lang="en" suppressHydrationWarning={true}>
        <body className={sarabun.className} suppressHydrationWarning={true}>
            <ConfigProvider theme={theme}>
                <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
            </ConfigProvider>
        </body>
    </html>
);

export default RootLayout;
