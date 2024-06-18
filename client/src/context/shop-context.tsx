import { createContext, useEffect, useState } from "react";
import { useGetProducts } from "../hooks/useGetProducts";
import axios from "axios";
import { useGetToken } from "../hooks/useGetToken";
import { Navigate, useNavigate } from "react-router-dom";
import { IProduct } from "../models/interfaces";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

export interface IShopContext {
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemCount: (newAmount: number, itemId: string) => void;
  getItemCartCount: (itemId: string) => number;
  removeItemFromCart: (itemId: string) => void;
  getTotalCartAmount: () => number;
  getTotalCartCount: () => number;
  checkOut: () => void;
  purchasedItems: IProduct[];
  availableMoney: Number;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setCartItems: (isAuthenticated: {}) => void;
}

export interface CartItem {
  [key: string]: number;
}

const defaultVal: IShopContext = {
  addToCart: () => null,
  removeFromCart: () => null,
  updateCartItemCount: () => null,
  removeItemFromCart: () => null,
  getTotalCartAmount: () => 0,
  getItemCartCount: () => 0,
  getTotalCartCount: () => 0,
  checkOut: () => null,
  availableMoney: 0,
  purchasedItems: [],
  isAuthenticated: false,
  setIsAuthenticated: () => null,
  setCartItems: () => null,
};

export const ShopContext = createContext<IShopContext>(defaultVal);

export const ShopContextProvider = (props: any) => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [cartItems, setCartItems] = useState<CartItem>({});
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    cookies.access_token !== null
  );
  const [availableMoney, setAvailableMoney] = useState<Number>(0);
  const [purchasedItems, setpurchasedItems] = useState<IProduct[]>([]);
  const { headers } = useGetToken();

  const { products } = useGetProducts();
  const navigate = useNavigate();

  const fetchAvailableMoney = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3001/user/availableMoney/${localStorage.getItem(
          "userID"
        )}`,
        { headers }
      );
      setAvailableMoney(result.data.availableMoney);
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  const fetchPurchasedItems = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3001/product/purchasedItems/${localStorage.getItem(
          "userID"
        )}`,
        { headers }
      );
      setpurchasedItems(result.data.purchasedItems);
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  const getItemCartCount = (itemId: string) => {
    if (itemId in cartItems) {
      return cartItems[itemId];
    }
    return 0;
  };

  const addToCart = (itemId: string) => {
    if (!isAuthenticated) {
      return navigate("/auth");
    }

    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = { ...prevCartItems };
      delete updatedCartItems[itemId];
      return updatedCartItems;
    });
  };

  const getTotalCartAmount = (): number => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo: any = products.find((product) => product._id === item);
        totalAmount += cartItems[item] * itemInfo?.price;
      } else {
        return 0;
      }
    }
    return totalAmount;
  };

  const getTotalCartCount = () => {
    let totalCartCount = 0;
    for (const item in cartItems) {
      totalCartCount += cartItems[item];
    }
    return totalCartCount;
  };

  const removeItemFromCart = (itemId: string) => {
    if (!cartItems[itemId]) return;
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const updateCartItemCount = (newAmount: number, itemId: string) => {
    if (newAmount < 0) {
      return;
    }

    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const checkOut = async () => {
    const body = { customerId: localStorage.getItem("userID"), cartItems };
    try {
      await axios.post("http://localhost:3001/product/checkout", body, {
        headers,
      });

      setCartItems({});
      fetchAvailableMoney();
      fetchPurchasedItems();
      toast.success("Item purchased!");
    } catch (error: any) {
      if (error.response.data.type) {
        toast.error(error.response.data.type);
      }
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAvailableMoney();
      fetchPurchasedItems();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      setCookies("access_token", null);
      localStorage.clear();
    }
  }, [isAuthenticated]);

  const contextValue: IShopContext = {
    addToCart,
    removeFromCart,
    updateCartItemCount,
    removeItemFromCart,
    getItemCartCount,
    getTotalCartCount,
    getTotalCartAmount,
    checkOut,
    availableMoney,
    purchasedItems,
    isAuthenticated,
    setIsAuthenticated,
    setCartItems,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
