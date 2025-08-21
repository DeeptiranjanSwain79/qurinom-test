import { useContext, useEffect } from "react";
import AuthLayout from "../../components/wrappers/AuthLayout";
import NavbarContext from "../../contexts/Navbar.context";
import ProductForm from "../../components/admin/forms/ProductForm";
import AdminProductsTable from "../../components/admin/tables/AdminProductsTable";

const StoreManagementPage = () => {
  const { setAuthSidebarActiveText } = useContext(NavbarContext);
  useEffect(() => {
    setAuthSidebarActiveText("store-management");
  }, [setAuthSidebarActiveText]);
  const onSuccess = () => {
    window.location.reload();
  };
  return (
    <AuthLayout>
      <ProductForm onSuccess={onSuccess} />
      <AdminProductsTable />
    </AuthLayout>
  );
};

export default StoreManagementPage;
