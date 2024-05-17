import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { User } from "@/types/User";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated: boolean = !!user;

  useEffect(() => {
    const accessToken: string | null = localStorage.getItem("access");

    if (accessToken && !isAuthenticated) {
      getUser(accessToken);
    }
  }, [user]);

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  const login = async (values: { email: string; password: string }) => {
    const url = "https://api.homologation.cliqdrive.com.br/auth/login/";
    const headers = {
      Accept: "application/json;version=v1_web",
      "Content-Type": "application/json",
    };
    const response = await axios.post(url, values, { headers });
    const tokenAcesso = response.data.tokens.access;

    if (tokenAcesso) {
      localStorage.setItem("access", tokenAcesso);
      localStorage.setItem("refresh", response.data.tokens.refresh);
      getUser(tokenAcesso);
    }
  };

  const getUser = async (token: string) => {
    const url = "https://api.homologation.cliqdrive.com.br/auth/profile/";
    const headers = {
      Accept: "application/json;version=v1_web",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(url, { headers });
    setUser(response.data);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
