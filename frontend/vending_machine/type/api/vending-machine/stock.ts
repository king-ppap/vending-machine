export type StockResponse = Item[]

export interface Item {
    id: number
    product: Product
    count: number
    machine: string
}

export interface Product {
    id: number
    code: string
    name: string
    price: number
    image: string
    category: number
}
