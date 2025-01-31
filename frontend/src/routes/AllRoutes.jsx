import { Routes, Route } from "react-router-dom";
import {
  ULogin,
  URegis,
  UProfile,
  Home,
  Cart,
  PageNotFound,
  Product,
  VerifyEmail,
  About,
  ProductDetails,
  Payment,
} from "../pages";
import ProtectedRoute from "./ProtectedRoute";

export const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home title="Home" />} />
        <Route path="/product" element={<Product title="Product" />} />
        <Route
          path="/product/:id"
          element={<ProductDetails title="Product Details" />}
        />
        <Route path="/login" element={<ULogin title="Login" />} />
        <Route path="/register" element={<URegis title="Register" />} />
        <Route path="/verify" element={<VerifyEmail title="Verify Email" />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UProfile title="User Profile" />
            </ProtectedRoute>
          }
        />
        <Route path="/cart" element={<Cart title="Cart" />} />
        <Route path="/payment" element={<Payment title="Payment" />} />
        <Route path="/about" element={<About title="About" />} />
        <Route path="*" element={<PageNotFound title="Page Not Found" />} />
      </Routes>
    </div>
  );
};
