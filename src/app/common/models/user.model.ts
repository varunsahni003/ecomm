export interface User {
    name: string;
    addressList: Array<string>;
    defaultAddress: string;
    products: Array<Products>
}
export interface Products {
    name: string;
    size: string | number;
    price: number;
    deliveryCharge: number;
    offerApplied: string;
    rating: number;
    rating_count: number;
    cost: number;
    discount: number;
}