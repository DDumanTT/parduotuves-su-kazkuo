import { createContext, useEffect, useState } from "react";
import { useTimeout } from "usehooks-ts";

import AuthService from "../services/AuthService";
import axios from "../api/axios";

export let AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  // jwt token silent refresh
  useTimeout(() => {
    axios.post("accounts/refresh-token", {});
  }, 840000); // 14 minutes

  // try to refresh jwt token if it's expired
  useEffect(() => {
    AuthService.refreshToken().catch(() => {
      localStorage.removeItem("user");
      setUser(undefined);
    });
  }, []);

  // gets user details on refresh
  useEffect(() => {
    const user = AuthService.getUser();
    if (!user) {
      setLoading(false);
    } else {
      setUser(user);
      setLoading(false);
    }
  }, []);

  if (!loading)
    return (
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    );

  return <></>;
}
