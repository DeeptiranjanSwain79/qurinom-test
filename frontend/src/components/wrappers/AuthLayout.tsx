import { Box } from "@mui/material";
import AuthNavbar from "../dashboard/AuthNavbar";
import { useContext, useEffect } from "react";
import AuthContext, { type AuthContextType } from "../../contexts/Auth.context";
import { useNavigate } from "react-router-dom";
import AuthSidebar from "../dashboard/AuthSidebar";
import { getUserFromLocalStorage } from "../../api/auth.api";
import { getToken } from "../../api/axiosClient";

interface LayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: LayoutProps) => {
  const { user, setIsAuthPage, setUser } = useContext(
    AuthContext
  ) as AuthContextType;
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsAuthPage(true);
    if (!user) {
      const lsUser = getUserFromLocalStorage();
      const token = getToken();
      console.log(lsUser, token);
      if (lsUser && token) {
        setUser(lsUser);
      } else {
        navigate("/login");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      <AuthNavbar />
      <Box
        sx={{
          height: "calc(max-content + 10vmax)",
          display: "flex",
          flexGrow: 1,
        }}
      >
        <AuthSidebar />
        <Box
          sx={{
            width: { xs: "100%", md: "83.6%" },
            backgroundColor: "#F3F3F3",
            paddingLeft: "1rem",
            textAlign: "left",
            paddingBottom: "5rem",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
