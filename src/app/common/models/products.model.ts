export interface Review {
    image: string,
    name: string,
    comment: string,
    rating: number,
    images: Array<string>
}
export interface Product {
    name: string,
    images: Array<string>,
    size: string,
    color: string,
    cost: number,
    discount: number,
    stock: number,
    description: string,
    rating: number,
    rating_count: number,
    reviews: Array<Review>,
    return: string,
    promoCodes: Array<Promocodes>,
    specifications: {
      name: string;
      brand: string,
      color: string,
      size: string;
      stuff: string;
    },
    brand: string;
    deliveryCharge: number;
    availableSize: Array<any>;
    sponsored: Array<Product>
  }

  export interface Promocodes {
    name: string;
    extraOff: number,
    description: string;
  }

  export interface Cart {
    product: Product,
    quantity: number
  }