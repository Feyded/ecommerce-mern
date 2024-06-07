import { Link, useNavigate } from "react-router-dom";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { useCookies } from "react-cookie";
export default function Navbar() {
  const [cookies, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("userID");
    setCookies("access_token", "");
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
            className="border-b-2 border-double 
    border-transparent hover:border-current py-2"
            to="/checkout"
          >
            <MdOutlineShoppingCartCheckout />
          </Link>
          {cookies.access_token ? (
            <button
              className="bg-red-500 hover:bg-red-700 px-3 py-1 rounded"
              onClick={Logout}
            >
              Logout
            </button>
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
