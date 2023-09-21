export interface IGetVendingMachineDetailResponse {
    [key: string]: number | string
    uuid: string
    name: string
    location: string
    coin_1: number
    coin_5: number
    coin_10: number
    banknote_20: number
    banknote_50: number
    banknote_100: number
    banknote_500: number
    banknote_1000: number
}
