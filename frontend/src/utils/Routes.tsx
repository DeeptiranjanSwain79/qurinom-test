import type { JSX } from "react";
import LoginPage from "../pages/auth/Login.page";
import RegisterPage from "../pages/auth/Register.page";
import ProductDetailsPage from "../pages/common/ProductDetails.page";
import StorePage from "../pages/common/Store.page";
import DashboradPage from "../pages/dashboard/Dashborad.page";
import ProfilePage from "../pages/dashboard/Profile.page";
import HomePage from "../pages/common/Home.page";
import StoreManagementPage from "../pages/dashboard/StoreManagement.page";
import UpdateProductPage from "../pages/dashboard/UpdateProduct.page";

export interface RouteType {
  path: string;
  element: JSX.Element;
}

// Common Routes
export const commonRoutes = [
  { path: "/", element: <HomePage /> },
  { path: "/dashboard", element: <DashboradPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/store", element: <StorePage /> },
  { path: "/store/:productId", element: <ProductDetailsPage /> },
  { path: "/store-management", element: <StoreManagementPage /> },
  { path: "/store-management/:productId", element: <UpdateProductPage /> },
];

// Auth Routes
export const authRoutes = [
  { path: "/register", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },
];
