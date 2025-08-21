/* eslint-disable @typescript-eslint/no-explicit-any */
import { CircularProgress } from "@mui/material";
import { createContext, useEffect, useState, type ReactNode } from "react";
import toast from "react-hot-toast";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  saveUserInLocalStorage,
} from "../api/auth.api";
import { getToken, removeToken } from "../api/axiosClient";
import { getMyProfile } from "../api/user.api";
import { decryptResponse } from "../utils/decryptResponse";

const AuthContext = createContext<unknown>(null);
export type AuthContextType = {
  user: any;
  login: (user: any) => void;
  logout: () => void;
  setUser: (user: any | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  isAuthPage: boolean;
  setIsAuthPage: (isAuthPage: boolean) => void;
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);
  const [isAuthPage, setIsAuthPage] = useState(false);
  const login = (hashedUser: string) => {
    saveUserInLocalStorage(hashedUser);
    const userUnhashed = decryptResponse(hashedUser);
    setUser(userUnhashed);
    setLoading(false);
  };

  const logout = () => {
    removeToken();
    removeUserFromLocalStorage();
    setUser(null);
    window.location.href = "/";
  };

  useEffect(() => {
    const lsUser = getUserFromLocalStorage();
    const token = getToken();
    if (window.location.pathname === "/") {
      setLoading(false);
      return;
    }
    if (user) setLoading(false);
    if (!user && lsUser && token) {
      setUser(lsUser);
      setLoading(false);
    }
    if (!user && !lsUser && !token && isAuthPage) {
      window.location.href = "/";
      setLoading(false);
    } else if (!user && !lsUser && !token) {
      setLoading(false);
    }
    if (!lsUser && token) {
      try {
        const myProfile = async () => {
          const currentUser = await getMyProfile();
          if (currentUser) {
            setUser(currentUser);
            setLoading(false);
          }
        };
        myProfile();
      } catch (error: any) {
        toast.error(error?.response?.data?.error || error.message);
      }
    }
    if (lsUser && !token) {
      removeUserFromLocalStorage();
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        setUser,
        loading,
        setLoading,
        isAuthPage,
        setIsAuthPage,
      }}
    >
      {loading ? <CircularProgress /> : children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
