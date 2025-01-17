import { Routes, Route } from "react-router-dom";
import { ULogin, URegis, UProfile, Home, Cart, PageNotFound, Product } from "../pages";
import ProductDetails from "../components/Product/ProductDetails";  // Ensure it's a default import

export const AllRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/"  element={<Home title="Home"/>}/>
                <Route path="/userlogin" element={<ULogin title="Login"/>}/>
                <Route path="/userregister" element={<URegis title="Register"/>}/>
                <Route path="/userprofile" element={<UProfile title="User Profile"/>}/>
                <Route path="/cart" element={<Cart title="Cart"/>}/>
                <Route path="/product" element={<Product title="Product"/>}/>
                <Route path="*" element={<PageNotFound title="Page Not Found"/>}/>
                <Route path="/product/:id" element={<ProductDetails title="Product Details"/> } />
            </Routes>
        </div>
    )
}
