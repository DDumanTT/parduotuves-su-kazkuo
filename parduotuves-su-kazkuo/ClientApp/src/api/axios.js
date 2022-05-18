import axios from "axios";

const BASE_URL = `${window.location.protocol}//localhost:7090/api`;
// const BASE_URL = `http://localhost:5090`;

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
