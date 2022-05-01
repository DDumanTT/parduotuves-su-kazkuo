import axios, { axiosAuth } from "../api/axios";

const login = (email, password) => {
  return axios
    .post("accounts/authenticate", {
      email,
      password,
    })
    .then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data));
      return response;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axiosAuth.post("accounts/revoke-token", {});
};

const refreshToken = () => {
  return axiosAuth.post("accounts/refresh-token", {});
};

const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  login,
  logout,
  refreshToken,
  getUser,
};

export default AuthService;
