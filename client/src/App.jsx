import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/customer/Home";
import Products from "./pages/customer/Products";
import ProductDetails from "./pages/customer/ProductDetails";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";

import AdminLogin from "./pages/admin/Login";
import AdminRegister from "./pages/admin/Register";
import AdminDashboard from "./pages/admin/Dashboard";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);

  return (
    <BrowserRouter>
      <Toaster position="bottom-right" />
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products setCart={setCart} />} />
        <Route path="/products/:id" element={<ProductDetails setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin setIsAdmin={setIsAdmin} />} />
        <Route path="/admin/register" element={<AdminRegister setIsAdmin={setIsAdmin} />} />
        <Route path="/admin/dashboard" element={<AdminDashboard setIsAdmin={setIsAdmin} />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;