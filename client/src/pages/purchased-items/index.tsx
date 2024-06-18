import { useContext, useEffect } from "react";
import { IShopContext, ShopContext } from "../../context/shop-context";
import { useNavigate } from "react-router-dom";

export default function PurchasedItemsPage() {
  const { purchasedItems, isAuthenticated } =
    useContext<IShopContext>(ShopContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, []);
  
  return (
    <div className="bg-white">
      {purchasedItems.length > 0 ? (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Your Purchased Items
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {purchasedItems.map((product) => (
              <div key={product._id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.imageUrl}
                    alt=""
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href="#">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.productName}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.description}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <PurchasedItemsIsEmpty />
      )}
    </div>
  );
}

function PurchasedItemsIsEmpty() {
  return (
    <section className="py-24 relative">
      <div className="flex flex-col items-center">
        <svg
          fill="#000000"
          width="100px"
          height="100px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11.707 2.293A.997.997 0 0 0 11 2H6a.997.997 0 0 0-.707.293l-3 3A.996.996 0 0 0 2 6v5c0 .266.105.52.293.707l10 10a.997.997 0 0 0 1.414 0l8-8a.999.999 0 0 0 0-1.414l-10-10zM13 19.586l-9-9V6.414L6.414 4h4.172l9 9L13 19.586z" />
          <circle cx="8.353" cy="8.353" r="1.647" />
        </svg>
        <p className="text-gray-500 text-lg my-4">
          Your Purchased Items is Empty.
        </p>
      </div>
    </section>
  );
}
