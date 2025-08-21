import { useContext, useEffect } from "react";
import AuthLayout from "../../components/wrappers/AuthLayout";
import AuthContext, { type AuthContextType } from "../../contexts/Auth.context";
import NavbarContext from "../../contexts/Navbar.context";
import { LoadingButton } from "@mui/lab";
import { red, white1 } from "../../utils/themes";
import { IoIosLogOut } from "react-icons/io";

const ProfilePage = () => {
  const { setAuthSidebarActiveText } = useContext(NavbarContext);
  const { user, logout } = useContext(AuthContext) as AuthContextType;
  useEffect(() => {
    setAuthSidebarActiveText("profile");
  }, [setAuthSidebarActiveText]);
  return (
    <AuthLayout>
      <h1>Profile</h1>
      {JSON.stringify(user)}
      <br />
      <LoadingButton
        variant="contained"
        sx={{
          my: 4,
          backgroundColor: red,
          px: 5,
          color: white1,
          ":hover": { backgroundColor: red },
        }}
        startIcon={<IoIosLogOut color={white1} size={18} />}
        onClick={logout}
      >
        Log out
      </LoadingButton>
    </AuthLayout>
  );
};

export default ProfilePage;
