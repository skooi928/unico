import { Routes, Route } from "react-router-dom";
import { ULogin, URegis, UProfile, Home, Cart, PageNotFound, Search, Product } from "../pages";
export const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/"  element={<Home title="Home"/>}/>
            <Route path="unico/product" element={<Product title="Product"/>}/>
            <Route path="unico/userlogin" element={<ULogin title="Login"/>}/>
            <Route path="unico/userregister" element={<URegis title="Register"/>}/>
            <Route path="unico/userprofile" element={<UProfile title="User Profile"/>}/>
            <Route path="unico/cart" element={<Cart title="Cart"/>}/>
            <Route path="unico/search" element={<Search title="Search"/>}/>
            <Route path="*" element={<PageNotFound title="Page Not Found"/>}/>
        </Routes>
    </div>
  )
}
