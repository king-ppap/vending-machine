export interface IGetVendingMachineListResponse {
    count: number
    next: string | null
    previous: string | null
    results: IVendingMachine[]
}

export interface IVendingMachine {
    uuid: string
    name: string
    location: string
    coin_1: number
    coin_5: number
    coin_10: number
    banknotes_20: number
    banknotes_50: number
    banknotes_100: number
    banknotes_500: number
    banknotes_1000: number
}

export enum Coin {
    COIN_1 = 1,
    COIN_5 = 5,
    COIN_10 = 10,
}

export enum Banknotes {
    BANKNOTES_20 = 20,
    BANKNOTES_50 = 50,
    BANKNOTES_100 = 100,
    BANKNOTES_500 = 500,
    BANKNOTES_1000 = 1000,
}
