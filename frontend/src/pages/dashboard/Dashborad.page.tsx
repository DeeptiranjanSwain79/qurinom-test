import { useContext, useEffect } from "react";
import AuthLayout from "../../components/wrappers/AuthLayout";
import NavbarContext from "../../contexts/Navbar.context";
import { useNavigate } from "react-router-dom";

const DashboradPage = () => {
  const { setAuthSidebarActiveText } = useContext(NavbarContext);
  const navigate = useNavigate();
  useEffect(() => {
    setAuthSidebarActiveText("dashboard");
  }, [navigate, setAuthSidebarActiveText]);
  return (
    <AuthLayout>
      <h1>Dashboard</h1>
    </AuthLayout>
  );
};

export default DashboradPage;
