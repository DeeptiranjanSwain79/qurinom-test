import MenuIcon from "@mui/icons-material/Menu";
import { LoadingButton } from "@mui/lab";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import AuthContext, { type AuthContextType } from "../../contexts/Auth.context";
import NavbarContext from "../../contexts/Navbar.context";
import { red, white1, white3, yellow1, yellow2 } from "../../utils/themes";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { activeText, setActiveText } = useContext(NavbarContext);
  const { user } = useContext(AuthContext) as AuthContextType;

  const navItems = [
    { text: "Home", href: "/", active: "home" },
    { text: "Store", href: "/store", active: "store" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const userImage = `https://ui-avatars.com/api/?name=${user?.firstName}+${
    user?.lastName
  }&background=${red.replace("#", "")}&color=${yellow1.replace("#", "")}`;
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        ECommerce
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem
            component={Link}
            to={item.href}
            key={item.text}
            disablePadding
            onClick={() => setActiveText(item.active)}
            sx={{
              textDecoration: "none",
              color: activeText === item.active ? red : "black",
            }}
          >
            <ListItemText primary={item.text} sx={{ textAlign: "center" }} />
          </ListItem>
        ))}
      </List>
      {/* Profile */}
      {user ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            cursor: "pointer",
          }}
          component={Link}
          to="/profile"
        >
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 1,
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
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              color: red,
              fontFamily: "Philosopher",
            }}
          >
            {user.firstName}
          </Typography>
        </Box>
      ) : (
        <LoadingButton
          variant="contained"
          size="small"
          onClick={() => navigate("/register")}
          sx={{
            backgroundColor: yellow1,
            color: white1,
            textTransform: "none",
            fontWeight: "0.9rem",
            borderRadius: "8px",
            px: 4,
            py: 1,
            "&:hover": {
              backgroundColor: yellow2,
            },
          }}
        >
          Register
        </LoadingButton>
      )}
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: white3 }}>
        <Toolbar sx={{ px: 4, py: 2 }}>
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

          {/* Navigation Links */}
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                gap: 3,
                alignItems: "center",
                flexGrow: 1,
                justifyContent: "center",
              }}
            >
              {navItems.map((item) => (
                <Typography
                  key={item.text}
                  variant="body2"
                  component={Link}
                  to={item.href}
                  sx={{
                    color: activeText === item.active ? red : "black",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                    textTransform: "none",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                  onClick={() => setActiveText(item.active)}
                >
                  {item.text}
                </Typography>
              ))}
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
              <IconButton
                sx={{ color: red }}
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}

          {/* Register Button */}
          {!isMobile && (
            <>
              {user ? (
                <Box
                  component={Link}
                  to="/profile"
                  sx={{
                    position: "relative",
                    display: "flex",
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
              ) : (
                <LoadingButton
                  variant="contained"
                  size="small"
                  onClick={() => navigate("/register")}
                  sx={{
                    backgroundColor: yellow1,
                    color: white1,
                    textTransform: "none",
                    fontWeight: "0.9rem",
                    borderRadius: "8px",
                    px: 4,
                    py: 1,
                    "&:hover": {
                      backgroundColor: yellow2,
                    },
                  }}
                >
                  Register
                </LoadingButton>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
