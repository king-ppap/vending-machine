'use client';
import { fetcher } from '@/api';
import { apiBuyItem, useStock } from '@/api/stock';
import {
    apiGetVendingMachinePatchDetail,
    apiGetVendingMachineDetail,
    apiRefundVendingMachine,
} from '@/api/vending-machine';
import Machine from '@/components/machine/Machine';
import InputMoney from '@/components/machine/demo/InputMoney';
import { IItemProduct, MoneyType } from '@/type/api/stock/stock';
import { Banknote, Coin } from '@/type/api/vending-machine/get-vm-list';
import {
    Alert,
    Button,
    Card,
    Switch,
    Tag,
    Input,
    Modal,
    ResultProps,
    Result,
} from 'antd';
import { useEffect, useState } from 'react';
import { IGetVendingMachineDetailResponse } from '@/type/api/vending-machine/get-vm-detail';
import { IBuyItemResponse } from '@/type/api/stock/buy-item';
const { TextArea } = Input;

export default function Page({ params }: { params: { uuid: string } }) {
    const [vmDetail, set่VmDetail] =
        useState<IGetVendingMachineDetailResponse | null>(null);

    const [isPopoverMachine, setPopoverMachine] = useState<ResultProps | null>(
        null
    );

    const getVmData = async () => {
        try {
            await apiGetVendingMachineDetail(params.uuid).then((res) => {
                set่VmDetail(res);
            });
        } catch (error: any) {
            console.error('Error: getVmData', error);
            setPopoverMachine({
                status: 'error',
                title: 'Cannot get Vending Machine data.',
                subTitle: error.message || error.detail,
            });
        }
    };
    useEffect(() => {
        getVmData();
    }, []);

    const stock = useStock(params.uuid);
    if (stock.error && !isPopoverMachine)
        return (
            <div className="w-full bg-slate-700 flex justify-center items-center">
                {stock.error && (
                    <Alert
                        message="Error: Can not get stock"
                        type="error"
                        showIcon
                    />
                )}
            </div>
        );

    const [isShowDebug, setIsShowDebug] = useState(true);
    const [coins, setCoins] = useState<Coin[]>([]);
    const [banknotes, setBanknotes] = useState<Banknote[]>([]);
    const [sumMoney, setSumMoney] = useState<number>(0);
    const [moneyBox, setMoneyBox] = useState<{
        coins: Coin[];
        banknotes: Banknote[];
    }>({ coins: [], banknotes: [] });
    const [modalData, setModalData] = useState<{
        title: string;
        message: string;
    } | null>(null);
    const [isLoadingRefund, setLoadingRefund] = useState(false);

    useEffect(() => {
        let sum = 0;
        if (coins.length) sum = sum + coins.reduce((a, b) => a + b);
        if (banknotes.length) sum = sum + banknotes.reduce((a, b) => a + b);
        setSumMoney(sum);
    }, [coins, banknotes]);

    const resetMoney = () => {
        setCoins([]);
        setBanknotes([]);
    };
    const resetMoneyBox = () => {
        setMoneyBox({ coins: [], banknotes: [] });
    };

    const onChangeDebug = (checked: boolean) => {
        setIsShowDebug(checked);
    };

    const closeModal = () => setModalData(null);
    const prepareDisplayChange = (res: IBuyItemResponse) => {
        let displayChange: {
            coins: Coin[];
            banknotes: Banknote[];
        } = {
            coins: [],
            banknotes: [],
        };
        Object.entries(res).forEach(([key, value]) => {
            const money = Number(key.split('_')[1]);
            if (key.includes('b')) {
                for (let index = 0; index < value; index++) {
                    displayChange.banknotes.push(money);
                }
            } else {
                for (let index = 0; index < value; index++) {
                    displayChange.coins.push(money);
                }
            }
        });
        return displayChange;
    };
    const onClickBuy = (item: IItemProduct) => {
        resetMoneyBox();

        apiBuyItem(item.id, {
            user_amount: sumMoney,
        })
            .then((res) => {
                const displayChange = prepareDisplayChange(res);
                setMoneyBox(displayChange);
                resetMoney();
                let timeClose = 5;
                setModalData({
                    title: `Yeah! (${timeClose})`,
                    message: `Here this is your ${item.product.name}`,
                });
                const interval = setInterval(() => {
                    setModalData({
                        title: `Yeah! (${(timeClose -= 1)})`,
                        message: `Here this is your ${item.product.name}`,
                    });
                    if (timeClose <= 0) {
                        closeModal();
                        clearInterval(interval);
                    }
                }, 1000);
            })
            .catch((error) => {
                console.error('Error:', error);
                setModalData({
                    title: 'Opos!',
                    message: error.message,
                });
                const displayChange = prepareDisplayChange(error.refund);
                setMoneyBox(displayChange);
                resetMoney();
            })
            .finally(() => {
                getVmData();
            });
    };
    const onAddMoney = (money: Coin | Banknote, moneyType: MoneyType) => {
        const moneyKey = `${moneyType}_${money}`;
        if (!vmDetail) return;

        apiGetVendingMachinePatchDetail(params.uuid, {
            [moneyKey]: Number(vmDetail[moneyKey]) + 1,
        }).then((res) => {
            set่VmDetail(res);
        });
    };
    const onClickRefund = () => {
        setLoadingRefund(true);
        apiRefundVendingMachine(params.uuid, sumMoney)
            .then((res) => {
                const displayChange = prepareDisplayChange(res);
                setMoneyBox(displayChange);
                resetMoney();
            })
            .catch((error) => {
                setModalData({
                    title: 'Opos!, Something wrong with rufunding please try again',
                    message: error.message,
                });
            })
            .finally(() => {
                setLoadingRefund(false);
                getVmData();
            });
    };

    const renderMoneyBox = () => {
        const coinsR = moneyBox.coins.map((e, i) => (
            <Tag key={`c-${i}`} color="blue">
                {e}
            </Tag>
        ));
        const banknotesR = moneyBox.banknotes.map((e, i) => (
            <Tag key={`b-${i}`} color="volcano">
                {e}
            </Tag>
        ));
        const tagElem = [...coinsR, ...banknotesR];
        return <span>{tagElem}</span>;
    };

    return (
        <div className="w-full h-[100vh]">
            <div>
                {isShowDebug ? (
                    <div className="w-full flex bg-slate-300">
                        <p className="mr-2">Debug:</p>
                        <Switch
                            onChange={onChangeDebug}
                            defaultChecked
                        ></Switch>
                        <p className="ml-2">Machine ID: {params.uuid}</p>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <div className="w-full h-full flex justify-between">
                {isPopoverMachine && <div className="w-full flex justify-center items-center">
                    <Result
                        status={isPopoverMachine.status}
                        title={isPopoverMachine.title}
                        subTitle={isPopoverMachine.subTitle}
                        children={isPopoverMachine.children}
                        className={isPopoverMachine.className}
                        extra={isPopoverMachine.extra}
                        icon={isPopoverMachine.icon}
                    />
                </div>}
                {(vmDetail && !isPopoverMachine) && (
                    <Machine
                        vmDetail={vmDetail}
                        stock={stock}
                        uuid={params.uuid}
                        coins={coins}
                        banknotes={banknotes}
                        sumMoney={sumMoney}
                        onClickBuy={onClickBuy}
                    />
                )}
                {isShowDebug && (
                    <div className="max-w-[400px] min-w-[400px] bg-slate-300 p-2">
                        <Card>
                            <p>Money: {sumMoney}</p>
                            <Button
                                className="my-2"
                                onClick={onClickRefund}
                                disabled={sumMoney <= 0}
                                loading={isLoadingRefund}
                            >
                                Refund
                            </Button>
                            <p>Money box: {renderMoneyBox()}</p>
                        </Card>
                        <div className="mt-2"></div>
                        <InputMoney
                            title="Input Coin"
                            moneyType="coin"
                            moneys={coins}
                            setMoneys={setCoins}
                            moneyList={[Coin.COIN_1, Coin.COIN_5, Coin.COIN_10]}
                            onAddMoney={onAddMoney}
                        />
                        <div className="mt-2"></div>
                        <InputMoney
                            title="Input Banknote"
                            moneyType="banknote"
                            moneys={banknotes}
                            setMoneys={setBanknotes}
                            moneyList={[
                                Banknote.BANKNOTE_20,
                                Banknote.BANKNOTE_50,
                                Banknote.BANKNOTE_100,
                                Banknote.BANKNOTE_500,
                                Banknote.BANKNOTE_1000,
                            ]}
                            onAddMoney={onAddMoney}
                        />
                        <div className="mt-2"></div>
                        <Card>
                            <TextArea
                                rows={13}
                                value={JSON.stringify(vmDetail, null, ' ')}
                            ></TextArea>
                        </Card>
                    </div>
                )}
            </div>
            <Modal
                title={modalData?.title}
                open={!!modalData}
                onOk={closeModal}
                onCancel={closeModal}
                footer={[
                    <Button key="ok" type="primary" onClick={closeModal}>
                        Ok
                    </Button>,
                ]}
            >
                <p>{modalData?.message}</p>
            </Modal>
        </div>
    );
}
