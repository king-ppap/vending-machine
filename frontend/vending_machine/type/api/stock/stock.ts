export type StockResponse = Item[]

export interface Item {
    id: number
    product: ProductDetail
    count: number
    machine: string
}

export interface ProductDetail {
    id: number
    code: string
    name: string
    price: number
    image: string
    category: number
}
