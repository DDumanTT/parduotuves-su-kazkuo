import axios from "../api/axios";
import useAuth from "./useAuth";

export default function useRefreshToken() {
  const { setUser } = useAuth();

  const refresh = async () => {
    const response = await axios.post("/accounts/refresh-token", {
      withCredentials: true,
    });
    setUser((prev) => {
      console.log(prev);
      console.log(response.data.jwtToken);
      return { ...prev, jwtToken: response.data.jwtToken };
    });
    return response.data.jwtToken;
  };
  return refresh;
}
