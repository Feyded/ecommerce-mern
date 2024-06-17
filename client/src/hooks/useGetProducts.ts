import { useState, useEffect } from "react";
import { IProduct } from "../../../server/src/models/products";
import axios from "axios";

export const useGetProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const getProduct = async () => {
    try {
      const fetchedProduct = await axios.get("http://localhost:3001/product");
      setProducts(fetchedProduct.data);
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return { products };
};
