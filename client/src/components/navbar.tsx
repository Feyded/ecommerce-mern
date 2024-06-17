import { Link, useNavigate } from "react-router-dom";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { useCookies } from "react-cookie";
import { useContext } from "react";
import { ShopContext } from "../context/shop-context";
export default function Navbar() {
  const [cookies, setCookies] = useCookies(["access_token"]);

  const {
    availableMoney,
    getTotalCartCount,
    setIsAuthenticated,
    setCartItems,
  } = useContext(ShopContext);
  const cartCount = getTotalCartCount();
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.clear();
    setCookies("access_token", null);
    setIsAuthenticated(false);
    setCartItems({});
    navigate("/auth");
  };

  return (
    <div className="navbar">
      <div className="navbarTitle">
        <h1 className="text-3xl font-bold text-neutral-50 hover:text-neutral-400 transition duration-300 ease-in-out">
          DZ
        </h1>
      </div>
      <div className="navbarLinks">
        <>
          <Link
            className="border-b-2 border-double 
    border-transparent hover:border-current"
            to="/"
          >
            Shop
          </Link>
          <Link
            className="border-b-2 border-double 
    border-transparent hover:border-current"
            to="/purchased-items"
          >
            Purchases
          </Link>
          <Link
            className="relative border-b-2 border-double border-transparent hover:border-current py-2"
            to="/checkout"
          >
            <MdOutlineShoppingCartCheckout size={24} />
            {cartCount > 0 && (
              <span
                className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full"
                style={{ transform: "translate(50%, -50%)" }}
              >
                {cartCount}
              </span>
            )}
          </Link>
          {cookies.access_token ? (
            <>
              <p className="mr-2">
                Wallet: ₱{Number(availableMoney.toFixed(2))}
              </p>
              <button
                className="bg-red-500 hover:bg-red-700 px-3 py-1 rounded"
                onClick={Logout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              className="border-b-2 border-double 
    border-transparent hover:border-current"
              to="/auth"
            >
              Login
            </Link>
          )}
        </>
      </div>
    </div>
  );
}
