export interface IProduct {
  _id?: string;
  productName: string;
  price: number;
  description: string;
  imageUrl: string;
  stockQuantity: number;
}

export interface ProductProps {
  product: IProduct;
}