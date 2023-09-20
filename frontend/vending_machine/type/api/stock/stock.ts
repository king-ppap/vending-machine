export type TStockResponse = IItemProduct[]

export interface IItemProduct {
    id: number
    product: IProductDetail
    count: number
    machine: string
}

export interface IProductDetail {
    id: number
    code: string
    name: string
    price: number
    image: string
    category: number
}
