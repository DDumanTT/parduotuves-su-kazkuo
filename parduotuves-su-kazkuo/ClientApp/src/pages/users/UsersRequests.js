import { axiosAuth } from "../../api/axios";

export const getUsers = () => axiosAuth.get("/accounts");
export const deleteUser = (id) => axiosAuth.delete(`/accounts/${id}`);
export const createUser = (
  firstName,
  lastName,
  role,
  email,
  password,
  confirmPassword
) => {
  return axiosAuth.post("/accounts", {
    firstName,
    lastName,
    role,
    email,
    password,
    confirmPassword,
  });
};
