import { useCookies } from "react-cookie";

export const useGetToken = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  return { headers: { authorization: cookies?.access_token } };
};
