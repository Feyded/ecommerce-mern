import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { UserErrors } from "../../models/errors";
import { IShopContext, ShopContext } from "../../context/shop-context";

type TLoginPage = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
};

export default function AuthPage() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { isAuthenticated, setIsAuthenticated } =
    useContext<IShopContext>(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.access_token) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username || !password) {
      toast.error("Field must not be empty");
      return;
    }

    const result = await axios.post("http://localhost:3001/user/login", {
      username,
      password,
    });

    if (result.data === UserErrors.WRONG_CREDENTIALS) {
      toast.error(result.data);
      return;
    }

    setIsAuthenticated(true);
    localStorage.setItem("userID", result.data.userID);
    setCookies("access_token", result.data.token);
    navigate("/");
  };

  return (
    <div>
      <ToastContainer />
      <LoginPage
        handleSubmit={handleSubmit}
        setUsername={setUsername}
        setPassword={setPassword}
      />
    </div>
  );
}

function LoginPage({ handleSubmit, setUsername, setPassword }: TLoginPage) {
  return (
    <div className="bg-white font-family-karla h-screen">
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
            <h1 className="bg-black text-white font-bold text-xl p-4">DZ</h1>
          </div>

          <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p className="text-center text-3xl">Welcome.</p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col pt-3 md:pt-8"
            >
              <div className="flex flex-col pt-4">
                <label htmlFor="username" className="text-lg">
                  Username
                </label>
                <input
                  type="username"
                  id="username"
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="pedro123"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex flex-col pt-4">
                <label htmlFor="password" className="text-lg">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <input
                type="submit"
                value="Log In"
                className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
              />
            </form>
            <div className="text-center pt-12 pb-12">
              <p>
                Don't have an account?{" "}
                <a href="/create-account" className="underline font-semibold">
                  Register here.
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="w-1/2 shadow-2xl">
          <img
            className="object-cover w-full h-screen hidden md:block"
            src="https://plus.unsplash.com/premium_photo-1681488350342-19084ba8e224?q=80&w=1988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="auth-background"
          />
        </div>
      </div>
    </div>
  );
}
