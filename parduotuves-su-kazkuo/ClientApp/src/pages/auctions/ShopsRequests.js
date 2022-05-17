import { axiosAuth } from "../../api/axios";

export const getShops = () => axiosAuth.get("/shops");
