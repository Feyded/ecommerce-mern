import { Schema, model } from "mongoose";

export interface IProduct {
  _id?: string;
  productName: string;
  price: number;
  description: string;
  imageUrl: string;
  stockQuantity: number;
}

const productSchema = new Schema<IProduct>(
  {
    productName: { type: String, required: true },
    price: {
      type: Number,
      required: true,
      min: [1, "Price of product should be above 1."],
    },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    stockQuantity: {
      type: Number,
      required: true,
      min: [0, "Stock cant be lower than 0."],
    },
  },
  { timestamps: true }
);

export const ProductModel = model<IProduct>("products", productSchema);
