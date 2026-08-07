import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/customer/Home";
import Products from "./pages/customer/Products";
import ProductDetails from "./pages/customer/ProductDetails";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <BrowserRouter>
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products setCart={setCart} />}/>
        <Route path="/products/:id" element={<ProductDetails setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />}/>
        <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;