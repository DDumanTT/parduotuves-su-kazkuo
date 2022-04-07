import { createContext, useEffect, useState } from "react";

import axios from "../api/axios";

export let AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();

  // gets user details on refresh
  useEffect(() => {
    axios
      .post(
        "/accounts/refresh-token",
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => setUser(response.data))
      .catch((err) => {});
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
