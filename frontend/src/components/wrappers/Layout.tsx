import React, { useContext, useEffect } from "react";
import { Box } from "@mui/material";
import Navbar from "../home/Navbar";
import AuthContext, { type AuthContextType } from "../../contexts/Auth.context";
import { getUserFromLocalStorage } from "../../api/auth.api";
import { getToken } from "../../api/axiosClient";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, setUser } = useContext(AuthContext) as AuthContextType;
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!user) {
      const lsUser = getUserFromLocalStorage();
      const token = getToken();
      if (lsUser && token) {
        setUser(lsUser);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
