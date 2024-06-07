import axios from "axios";
import { FormEvent, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [cookies] = useCookies();

  useEffect(() => {
    if (cookies.access_token) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (formRef.current) {
      const formValue = new FormData(formRef.current);
      const username = formValue.get("username");
      const password = formValue.get("password");
      const confirmPassword = formValue.get("confirm-password");

      if (!username || !password || !confirmPassword) {
        toast.error("Field must not be empty!");
        return;
      }

      if (confirmPassword !== password) {
        toast.error("Password didn't match");
        return;
      }

      await axios.post("http://localhost:3001/user/register", {
        username,
        password,
      });
      toast.success("Account Created!");
    } else {
      console.log("Form must not be empty!");
    }
  };

  return (
    <div className="bg-white font-family-karla h-screen">
      <ToastContainer />
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-12">
            <h1 className="bg-black text-white font-bold text-xl p-4">DZ</h1>
          </div>

          <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p className="text-center text-3xl">Join Us.</p>
            <form
              className="flex flex-col pt-3 md:pt-8"
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col pt-4">
                <label htmlFor="username" className="text-lg">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
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
                  placeholder="Password"
                  name="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex flex-col pt-4">
                <label htmlFor="confirm-password" className="text-lg">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="Password"
                  name="confirm-password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <button
                type="submit"
                value="Register"
                className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
              >
                Create
              </button>
            </form>
            <div className="text-center pt-12 pb-12">
              <p>
                Already have an account?{" "}
                <a href="/auth" className="underline font-semibold">
                  Log in here.
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="w-1/2 shadow-2xl">
          <img
            className="object-cover w-full h-screen hidden md:block"
            src="https://source.unsplash.com/IXUM4cJynP0"
            alt="Background"
          />
        </div>
      </div>
    </div>
  );
}
