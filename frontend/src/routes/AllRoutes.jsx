import { Routes, Route } from "react-router-dom";
import { ULogin, URegis, UProfile, Home, Cart, PageNotFound, Product,VerifyEmail } from "../pages";
import ProductDetails from "../components/Product/ProductDetails";  // Ensure it's a default import
import ProtectedRoute from "./ProtectedRoute";
export const AllRoutes = () => {

  return (
    <div>
        <Routes>
            <Route path="/"  element={<Home title="Home"/>}/>
            <Route path="/product" element={<Product title="Product"/>}/>
            <Route path="/product/:id" element={<ProductDetails title="Product Details"/> } />
            <Route path="/login" element={<ULogin title="Login"/>}/>
            <Route path="/register" element={<URegis title="Register"/>}/>
            <Route path="/verify" element={<VerifyEmail title="Verify Email"/>}/>
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <UProfile title="User Profile" />
                    </ProtectedRoute>
                }
            />
            <Route path="/cart" element={<Cart title="Cart"/>}/>
            <Route path="*" element={<PageNotFound title="Page Not Found"/>}/>
        </Routes>
    </div>
  )
}
