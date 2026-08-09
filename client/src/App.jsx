import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import sampleProducts from "./data/sampleProducts";

import Home from "./pages/customer/Home";
import Products from "./pages/customer/Products";
import ProductDetails from "./pages/customer/ProductDetails";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";

import AdminLogin from "./pages/admin/Login";
import AdminRegister from "./pages/admin/Register";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProductManagement from "./pages/admin/ProductManagement";
import AdminCategoryManage from "./pages/admin/CategoryManagement";
import AdminOrderManage from "./pages/admin/OrderManagement";
import AdminOrderDetails from "./pages/admin/OrderDetails";
import AdminCustomerManagement from "./pages/admin/CustomerManagement";


function App() {

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem("admin") === "true";
  });

  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("admin", isAdmin);
  }, [isAdmin]);

  useEffect(() => {
    if (!localStorage.getItem("products")) {
      localStorage.setItem(
        "products",
        JSON.stringify(sampleProducts)
      );
    }

    if (!localStorage.getItem("categories")) {
      localStorage.setItem(
        "categories",
        JSON.stringify(sampleCategories)
      );
    }
  }, []);

  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        {/* CUSTOMER ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products setCart={setCart} />} />
        <Route path="/products/:id" element={<ProductDetails setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin/login" element={<AdminLogin setIsAdmin={setIsAdmin} />} />
        <Route path="/admin/register" element={<AdminRegister setIsAdmin={setIsAdmin} />} />
        <Route path="/admin/dashboard" element={ isAdmin ? <AdminDashboard setIsAdmin={setIsAdmin} /> : <Navigate to="/admin/login" />}/>
        <Route path="/admin/productManage" element={ isAdmin ? <AdminProductManagement /> : <Navigate to="/admin/login" /> }/>
        <Route path="/admin/categoryManage" element={isAdmin ? <AdminCategoryManage /> : <Navigate to="/admin/login"/>}/>
        <Route path="/admin/orderManage" element={isAdmin ? <AdminOrderManage /> : <Navigate to="/admin/login"/>}/>
        <Route path="/admin/orderDetails/:orderNumber" element={ <AdminOrderDetails setIsAdmin={setIsAdmin} /> }/>
        <Route path="/admin/customerManage" element={ isAdmin ? <AdminCustomerManagement setIsAdmin={setIsAdmin} /> : <Navigate to="/admin/login" />}/>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;