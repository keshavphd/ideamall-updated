import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./layout/AppLayout";
import SearchPage from "./pages/SearchPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import EnterOtp from "./pages/EnterOtp";
import UpdatePassword from "./pages/UpdatePassword";
import UpdateUserDetail from "./pages/UpdateUserDetail";
import CheckYourEmail from "./pages/CheckYourEmail";
import MobileUserMenu from "./pages/MobileUserMenu";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import Orders from "./pages/Orders";
import Address from "./pages/Address";
import Category from "./pages/Category";
import SubCategory from "./pages/SubCategory";
import Product from "./pages/Product";
import UploadProduct from "./pages/UploadProduct";
import AdminPermission from "./pages/AdminPermission";
import ProductDetailPage from "./pages/ProductDetailPage";
import DisplayProductPage from "./pages/DisplayProductPage";
import "./index.css";
import DisplayCart from "./pages/DisplayCart";
import CheckOutPage from "./pages/CheckOutPage";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/search",
          element: <SearchPage />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "/enter-otp",
          element: <EnterOtp />,
        },
        {
          path: "/update-password",
          element: <UpdatePassword />,
        },
        {
          path: "/update-user-detail",
          element: <UpdateUserDetail />,
        },
        {
          path: "/check-your-email",
          element: <CheckYourEmail />,
        },
        {
          path: "/mobile-user-menu",
          element: <MobileUserMenu />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
          children: [
            {
              path: "profile",
              element: <UserProfile />,
            },
            {
              path: "orders",
              element: <Orders />,
            },
            {
              path: "address",
              element: <Address />,
            },
            {
              path: "category",
              element: (
                <AdminPermission>
                  <Category />
                </AdminPermission>
              ),
            },
            {
              path: "sub-category",
              element: (
                <AdminPermission>
                  <SubCategory />
                </AdminPermission>
              ),
            },
            {
              path: "product",
              element: (
                <AdminPermission>
                  <Product />
                </AdminPermission>
              ),
            },
            {
              path: "upload-product",
              element: (
                <AdminPermission>
                  <UploadProduct />
                </AdminPermission>
              ),
            },
          ],
        },
        {
          path: ":category",
          children: [
            {
              path: ":subcategory",
              element: <ProductDetailPage />,
            },
          ],
        },
        {
          path: "product/:product",
          element: <DisplayProductPage />,
        },
        {
          path: "cart",
          element: <DisplayCart />,
        },
        {
          path: "checkout",
          element: <CheckOutPage />,
        },
        {
          path:"successes",
          element:<SuccessPage/>
        },
        {
          path:"cancel",
          element:<CancelPage/>
        }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
export default App;
