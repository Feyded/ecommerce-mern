import React, { ChangeEvent, useContext, useEffect } from "react";
import { useGetProducts } from "../../hooks/useGetProducts";
import { IShopContext, ShopContext } from "../../context/shop-context";
import { IProduct, ProductProps } from "../../models/interfaces";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
export default function CheckOutPage() {
  const { getItemCartCount, getTotalCartAmount, checkOut, isAuthenticated } =
    useContext<IShopContext>(ShopContext);
  const { products } = useGetProducts();
  const cartAmount = getTotalCartAmount();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, []);

  return (
    <section className="py-24 relative">
      <ToastContainer />
      {cartAmount > 0 ? (
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
            Shopping Cart
          </h2>
          {products.map((product: IProduct) => {
            if (getItemCartCount(String(product._id)) !== 0) {
              return <ProductCard key={product._id} product={product} />;
            }
          })}
          <div className="flex flex-col md:flex-row items-center md:items-center justify-between lg:px-6 pb-6 border-b border-gray-200 max-lg:max-w-lg max-lg:mx-auto">
            <h5 className="text-gray-900 font-manrope font-semibold text-2xl leading-9 w-full max-md:text-center max-md:mb-4">
              Subtotal
            </h5>

            <div className="flex items-center justify-between gap-5 ">
              <button className="rounded-full py-2.5 px-3 bg-indigo-50 text-indigo-600 font-semibold text-xs text-center whitespace-nowrap transition-all duration-500 hover:bg-indigo-100">
                Promo Code?
              </button>
              <h6 className="font-manrope font-bold text-3xl lead-10 text-indigo-600">
                ₱{cartAmount.toFixed(2)}
              </h6>
            </div>
          </div>
          <div className="max-lg:max-w-lg max-lg:mx-auto">
            <button
              className="rounded-full py-4 px-6 bg-indigo-600 text-white font-semibold text-lg w-full text-center transition-all duration-500 hover:bg-indigo-700 "
              onClick={() => {
                checkOut();
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <CartIsEmpty />
      )}
    </section>
  );
}

function ProductCard({ product }: ProductProps) {
  const {
    addToCart,
    removeFromCart,
    removeItemFromCart,
    updateCartItemCount,
    getItemCartCount,
  } = useContext<IShopContext>(ShopContext);
  const cartItemCount = getItemCartCount(String(product._id));
  return (
    <div
      key={product._id}
      className="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4"
    >
      <div className="col-span-12 lg:col-span-2 img box">
        <img
          src={product.imageUrl}
          alt="speaker image"
          className="max-lg:w-full lg:w-[180px]"
        />
      </div>
      <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
        <div className="flex items-center justify-between w-full mb-4">
          <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900">
            {product.productName}
          </h5>
          <button
            onClick={() => {
              removeFromCart(String(product._id));
            }}
            className="rounded-full group flex items-center justify-center focus-within:outline-red-500"
          >
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="fill-red-50 transition-all duration-500 group-hover:fill-red-400"
                cx="17"
                cy="17"
                r="17"
                fill=""
              />
              <path
                className="stroke-red-500 transition-all duration-500 group-hover:stroke-white"
                d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z"
                stroke="#EF4444"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <p className="font-normal text-base text-gray-500 mb-6">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                removeItemFromCart(String(product._id));
              }}
              className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300"
            >
              <svg
                className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 9.5H13.5"
                  stroke=""
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <input
              type="number"
              id="number"
              className="border border-gray-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-sm bg-gray-100  text-center"
              value={String(cartItemCount)}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                updateCartItemCount(
                  Number(e.target.value),
                  String(product._id)
                );
              }}
            />
            <button
              onClick={() => {
                addToCart(String(product._id));
              }}
              className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300"
            >
              <svg
                className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.75 9.5H14.25M9 14.75V4.25"
                  stroke=""
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 text-right">
            ₱{product.price.toFixed(2)}
          </h6>
        </div>
      </div>
    </div>
  );
}

function CartIsEmpty() {
  return (
    <div className="flex flex-col items-center">
      <svg
        width="100px"
        height="100px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 5L19 12H7.37671M20 16H8L6 3H3M11 3L13.5 5.5M13.5 5.5L16 8M13.5 5.5L16 3M13.5 5.5L11 8M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="text-gray-500 text-lg my-4">Your Cart is Empty.</p>
    </div>
  );
}
