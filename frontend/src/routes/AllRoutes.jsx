import { Routes, Route } from "react-router-dom";
import { ULogin, URegis, UProfile, Home, Cart, PageNotFound, Search, Product, VerifyEmail } from "../pages";
import ProtectedRoute from "./ProtectedRoute";

export const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/"  element={<Home title="Home"/>}/>
            <Route path="/product" element={<Product title="Product"/>}/>
            <Route path="/login" element={<ULogin title="Login"/>}/>
            <Route path="/register" element={<URegis title="Register"/>}/>
            <Route path="/verify" element={<VerifyEmail title="Verify Email"/>}/>
            {/* Only allow /userprofile if user is logged in */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UProfile title="User Profile" />
                </ProtectedRoute>
              }
            />
            <Route path="/cart" element={<Cart title="Cart"/>}/>
            <Route path="/search" element={<Search title="Search"/>}/>
            <Route path="*" element={<PageNotFound title="Page Not Found"/>}/>
        </Routes>
    </div>
  )
}
