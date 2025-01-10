import { Routes, Route } from "react-router-dom";
import { ULogin, URegis, UProfile, Home, Cart, PageNotFound, Search, Product } from "../pages";
export const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/"  element={<Home title="Home"/>}/>
            <Route path="/product" element={<Product title="Product"/>}/>
            <Route path="/userlogin" element={<ULogin title="Login"/>}/>
            <Route path="/userregister" element={<URegis title="Register"/>}/>
            <Route path="/userprofile" element={<UProfile title="User Profile"/>}/>
            <Route path="/cart" element={<Cart title="Cart"/>}/>
            <Route path="/search" element={<Search title="Search"/>}/>
            <Route path="*" element={<PageNotFound title="Page Not Found"/>}/>
        </Routes>
    </div>
  )
}
