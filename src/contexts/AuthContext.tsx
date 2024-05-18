import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { User } from "@/types/User";
import React from "react";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextProps {
  user: User | null;
  login: (values: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated: boolean = !!user;
  const { toast } = useToast();

  useEffect(() => {
    const accessToken: string | null = localStorage.getItem("access");

    if (accessToken && !isAuthenticated) {
      getUser(accessToken).then();
    }
  }, [user]);

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    toast({
      description: `See you next time.`,
      title: "Bye!",
    });
    setUser(null);
  };

  const login = async (values: { email: string; password: string }) => {
    const url = "https://api.homologation.cliqdrive.com.br/auth/login/";
    const headers = {
      Accept: "application/json;version=v1_web",
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(url, values, { headers });
      console.log(response);
      localStorage.setItem("access", response.data.tokens.access);
      localStorage.setItem("refresh", response.data.tokens.refresh);
      await getUser(response.data.tokens.access);
      toast({
        description: `Welcome, ${response.data.user.name}!`,
      });
    } catch (error: any) {
      toast({
        description:
          error.response?.data.detail ||
          error.message ||
          "An unknown error occurred.",
        title: "Ops!",
        variant: "destructive",
      });
    }
  };

  const getUser = async (token: string) => {
    const url = "https://api.homologation.cliqdrive.com.br/auth/profile/";
    const headers = {
      Accept: "application/json;version=v1_web",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get(url, { headers });
      setUser(response.data);
    } catch (error: any) {
      toast({
        description:
          error.response?.data.detail ||
          error.message ||
          "An unknown error occurred.",
        title: "Ops!",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
