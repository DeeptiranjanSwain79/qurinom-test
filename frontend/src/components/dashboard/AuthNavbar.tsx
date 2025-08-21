import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useContext, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import AuthContext, { type AuthContextType } from "../../contexts/Auth.context";
import {
  darkText,
  red,
  text,
  white1,
  white3,
  yellow1,
} from "../../utils/themes";
import NavbarContext from "../../contexts/Navbar.context";
import { MdMenu } from "react-icons/md";

const AuthNavbar = () => {
  const { user } = useContext(AuthContext) as AuthContextType;
  const { setOpenDrawer, authSidebarActiveText } = useContext(NavbarContext);
  const navigate = useNavigate();
  const userImage = useMemo(() => {
    return `https://ui-avatars.com/api/?name=${user?.firstName}+${
      user?.lastName
    }&background=${
      authSidebarActiveText === "profile"
        ? yellow1.replace("#", "")
        : red.replace("#", "")
    }&color=${white1.replace("#", "")}`;
  }, [authSidebarActiveText, user?.firstName, user?.lastName]);
  return (
    <AppBar position="static" sx={{ backgroundColor: white3 }}>
      <Toolbar
        sx={{
          px: 4,
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {/* Logo and Title */}
        <Box sx={{ display: "flex", alignItems: "center", mr: 4 }}>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                width: 40,
                height: 40,
                objectFit: "contain",
              }}
            />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: red,
                lineHeight: 1.3,
              }}
            >
              E Commerce
            </Typography>
          </Box>
        </Box>

        {/* RIght side: Name with logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            pl: 4,
            borderLeft: { md: `1px solid #D9D9D9`, xs: "none" },
          }}
        >
          <Box
            textAlign={"right"}
            sx={{ display: { md: "block", xs: "none" } }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", lineHeight: 1, color: text }}
            >
              {user?.firstName}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: darkText,
              }}
            >
              {user?.role}
            </Typography>
          </Box>
          <Box
            component={Link}
            to="/profile"
            sx={{
              position: "relative",
              display: { md: "flex", xs: "none" },
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              mr: 2,
              cursor: "pointer",
            }}
          >
            <img
              src={userImage}
              alt={user?.firstName}
              style={{
                width: 40,
                height: 40,
                objectFit: "contain",
                borderRadius: "50%",
              }}
            />
          </Box>
        </Box>

        <IconButton
          sx={{ display: { md: "none", xs: "block" } }}
          onClick={() => setOpenDrawer(true)}
        >
          <MdMenu size={24} color={red} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AuthNavbar;
