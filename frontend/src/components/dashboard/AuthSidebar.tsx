import {
  Box,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useContext } from "react";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { RiHomeLine } from "react-icons/ri";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import AuthContext, { type AuthContextType } from "../../contexts/Auth.context";
import NavbarContext from "../../contexts/Navbar.context";
import {
  red,
  red2,
  red3,
  red4,
  white1,
  whiteBg,
  yellow1,
} from "../../utils/themes";
// import { CiMail } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import logo from "../../assets/logo.png";

const AuthSidebar = () => {
  const { user, logout } = useContext(AuthContext) as AuthContextType;
  const { openDrawer, setOpenDrawer, authSidebarActiveText } =
    useContext(NavbarContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <Box
        sx={{
          backgroundColor: red,
          display: { xs: "none", md: "block" },
        }}
      >
        <Sidebar
          collapsed={false}
          backgroundColor={red}
          rootStyles={{
            border: "0rem",
            minHeight: "100vh",
            paddingTop: "4rem",
          }}
        >
          <Menu>
            {user && user?.role && user.role === "MERCHANT" && (
              <MerchantSidebarOptions />
            )}
            {user && user?.role && user.role === "USER" && (
              <UserSidebarOptions />
            )}
          </Menu>
        </Sidebar>
      </Box>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(!openDrawer)}>
        <Sidebar
          collapsed={false}
          backgroundColor={red}
          rootStyles={{ border: "0rem", minHeight: "100vh" }}
        >
          {/* Logo and Title */}
          <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
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
                variant="body2"
                sx={{
                  color: white1,
                  lineHeight: 1.3,
                }}
              >
                {t("navbar.title")}
              </Typography>
            </Box>
          </Box>
          {user && user?.role && user.role === "MERCHANT" && (
            <MerchantSidebarOptions />
          )}
          {user && user?.role && user.role === "USER" && <UserSidebarOptions />}
          <Menu>
            <Item
              title="Profile"
              to={`profile`}
              isActive={authSidebarActiveText === "profile"}
              icon={<CgProfile color={red3} size={18} />}
            />
            <Divider variant="middle" sx={{ color: yellow1 }} />
            <MenuItem
              rootStyles={{
                marginTop: "1rem",
                color: white1,
                textAlign: "left",
                ":hover": { color: yellow1 },
              }}
              icon={
                <Box
                  sx={{
                    backgroundColor: red4,
                    borderRadius: "100%",
                    padding: 1.2,
                    color: white1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IoIosLogOut color={red3} size={18} />
                </Box>
              }
              onClick={logout}
            >
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>
      </Drawer>
    </>
  );
};

const MerchantSidebarOptions = () => {
  const { authSidebarActiveText } = useContext(NavbarContext);
  const optionsArray = [
    {
      title: "Dashboard",
      to: "dashboard",
      icon: <RiHomeLine color={red3} size={18} />,
    },
    {
      title: "Store Management",
      to: "store-management",
      icon: <MdOutlineLocalGroceryStore color={red3} size={18} />,
    },
  ];
  return (
    <Menu>
      {optionsArray.map((item, index) => {
        return (
          <Item
            key={index}
            title={item.title}
            to={`/${item.to}`}
            isActive={authSidebarActiveText === item.to}
            icon={item.icon}
          />
        );
      })}
    </Menu>
  );
};

const UserSidebarOptions = () => {
  const { authSidebarActiveText } = useContext(NavbarContext);
  const optionsArray = [
    {
      title: "Dashboard",
      to: "dashboard",
      icon: <RiHomeLine color={red3} size={18} />,
    },
    {
      title: "Store",
      to: "store",
      icon: <MdOutlineLocalGroceryStore color={red3} size={18} />,
    },
  ];
  return (
    <Menu>
      {optionsArray.map((item, index) => {
        return (
          <Item
            key={index}
            title={item.title}
            to={`/${item.to}`}
            isActive={authSidebarActiveText === item.to}
            icon={item.icon}
          />
        );
      })}
    </Menu>
  );
};

interface MenuItemProps {
  title: string;
  to: string;
  isActive: boolean;
  icon?: React.ReactNode;
}

const Item = ({ title, to, isActive, icon }: MenuItemProps) => {
  const navigate = useNavigate();
  const { setAuthSidebarActiveText, setOpenDrawer } = useContext(NavbarContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <MenuItem
      rootStyles={{
        color: isActive ? red2 : white1,
        backgroundColor: isActive ? whiteBg : "",
        textAlign: "left",
        marginBottom: isMobile ? "0.1rem" : "0.8rem",
        ":hover": { color: yellow1 },
      }}
      className="sidebar-item"
      onClick={() => {
        navigate(to);
        setAuthSidebarActiveText(title);
        setOpenDrawer(false);
      }}
      active={isActive}
      icon={
        <Box
          sx={{
            backgroundColor: red4,
            borderRadius: "100%",
            padding: 1.2,
            color: white1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>
      }
    >
      {title}
    </MenuItem>
  );
};

export default AuthSidebar;
