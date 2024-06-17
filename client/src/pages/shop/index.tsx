import { useContext } from "react";
import { useGetProducts } from "../../hooks/useGetProducts";
import { IProduct } from "../../models/interfaces";
import { IShopContext, ShopContext } from "../../context/shop-context";

interface ProductProps {
  product: IProduct;
}

export default function Shop() {
  const { products } = useGetProducts();
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          SHOP
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: ProductProps) {
  const { addToCart, getItemCartCount } = useContext<IShopContext>(ShopContext);

  const count = getItemCartCount(String(product._id));

  return (
    <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
      <div className="relative h-56 overflow-hidden text-white shadow-lg bg-clip-border rounded-t-xl bg-blue-gray-500 shadow-blue-gray-500/40">
        <img
          src={product.imageUrl}
          alt={product.productName}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-6">
        <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          {product.productName}
        </h5>
        <h6 className="block mb-2 font-sans text-lg antialiased font-semibold leading-snug tracking-normal text-blue-gray-700">
          {product.description}
        </h6>
        <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
          ₱{product.price.toFixed(2)}
        </p>
      </div>
      <div className="p-6 pt-0">
        {product.stockQuantity < 1 ? (
          <button
            disabled
            className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
          >
            Out of Stock
          </button>
        ) : (
          <button
            onClick={() => addToCart(String(product._id))}
            className="px-2 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
          >
            Add to cart {count > 0 && <>({count})</>}
          </button>
        )}
      </div>
    </div>
  );
}
