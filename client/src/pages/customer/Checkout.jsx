import { useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, updateProduct } from "../../utils/productStorage";

function Checkout({ cart, setCart }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    payment: "Cash on Delivery",
    notes: ""
  });

  const [order, setOrder] = useState(null);

  const subtotal = cart.reduce(
    (t, i) => t + i.price * i.quantity,
    0
  );
  const shipping = subtotal * 0.02;
  const total = subtotal + shipping;

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();

    const products = getProducts();

    const insufficient = cart.find(item => {
      const p = products.find(p => p.id === item.id);
      return !p || p.stock < item.quantity;
    });

    if (insufficient) {
      alert(`${insufficient.name} does not have enough stock.`);
      return;
    }

    cart.forEach(item => {
      const p = products.find(p => p.id === item.id);
      if (p) {
        updateProduct(p.id, {
          stock: p.stock - item.quantity
        });
      }
    });

    const newOrder = {
      number: `BS-${Date.now().toString().slice(-8)}`,
      customer: form,
      items: cart,
      subtotal,
      shipping,
      total,
      status: "Pending",
      date: new Date().toISOString()
    };

    const saved = localStorage.getItem("orders");
    const orders = saved ? JSON.parse(saved) : [];

    localStorage.setItem("orders", JSON.stringify([...orders, newOrder]));

    setOrder(newOrder);
    setCart([]);
    localStorage.removeItem("cart");
  };

  /* NAVBAR */
  const Navbar = () => (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center gap-3">

        <div className="w-full md:flex-1 text-center md:text-left">
          <Link to="/" className="font-bold text-gray-800">
            BuySphere
          </Link>
        </div>

        <div className="flex gap-3 text-sm justify-center flex-wrap">
          <Link to="/" className="px-3 py-1 rounded-full hover:bg-black hover:text-white">Home</Link>
          <Link to="/products" className="px-3 py-1 rounded-full hover:bg-black hover:text-white">Products</Link>
          <Link to="/cart" className="px-3 py-1 rounded-full hover:bg-black hover:text-white">Cart</Link>
        </div>

        <div className="w-full md:flex-1 flex justify-center md:justify-end">
          <Link to="/admin/login" className="px-3 py-1 rounded-full hover:bg-black hover:text-white">
            Admin
          </Link>
        </div>

      </div>
    </nav>
  );

  /* ORDER COMPLETE */
  if (order) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black text-white px-4 py-10">
          <div className="max-w-4xl mx-auto border border-white/20 p-6 md:p-8">

            <h1 className="text-2xl md:text-4xl font-bold mb-4">
              Thank You!
            </h1>

            <p className="text-gray-400 mb-6">
              Order placed successfully.
            </p>

            <p className="text-lg font-bold mb-6">
              Order #{order.number}
            </p>

            {/* ITEMS */}
            <div className="space-y-3 border-b border-white/20 pb-4">
              {order.items.map(i => (
                <div key={i.id} className="flex justify-between text-sm">
                  <span>{i.name} x{i.quantity}</span>
                  <span>${(i.price * i.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${order.shipping.toFixed(2)}</span>
              </div>

              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>

            <Link
              to="/products"
              className="block mt-6 text-center bg-white text-black py-3 rounded-full"
            >
              Continue Shopping
            </Link>

          </div>
        </div>
      </>
    );
  }

  /* EMPTY CART */
  if (!cart.length) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl mb-6">
              Cart is Empty
            </h1>

            <Link
              to="/products"
              className="bg-white text-black px-6 py-3 rounded-full"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </>
    );
  }

  /* MAIN CHECKOUT */
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white px-4 py-8">
        <div className="max-w-7xl mx-auto">

          <h1 className="text-xl md:text-2xl font-bold mb-6">
            Checkout
          </h1>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >

            {/* FORM */}
            <div className="lg:col-span-2 border border-white/20 p-4 md:p-6 rounded-lg">

              <h2 className="text-lg md:text-xl font-bold mb-4">
                Customer Info
              </h2>

              <div className="grid gap-4">

                {["Name", "Email", "Contact"].map(field => (
                  <input
                    key={field}
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    placeholder={field}
                    className="w-full bg-black border border-white/30 px-4 py-3 rounded text-sm"
                    required
                  />
                ))}

                <select
                  name="payment"
                  value={form.payment}
                  onChange={handleChange}
                  className="w-full bg-black border border-white/30 px-4 py-3 rounded text-sm"
                >
                  <option>Cash on Delivery</option>
                  <option>E-Wallet</option>
                  <option>Bank Transfer</option>
                </select>

                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="w-full bg-black border border-white/30 px-4 py-3 rounded text-sm"
                  required
                />

                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Notes"
                  className="w-full bg-black border border-white/30 px-4 py-3 rounded text-sm"
                />

              </div>

            </div>

            {/* SUMMARY */}
            <aside className="border border-white/20 p-4 md:p-6 rounded-lg">

              <h2 className="text-lg md:text-xl font-bold mb-4">
                Summary
              </h2>

              {cart.map(i => (
                <div key={i.id} className="flex justify-between text-sm mb-2">
                  <span>{i.name} x{i.quantity}</span>
                  <span>${(i.price * i.quantity).toFixed(2)}</span>
                </div>
              ))}

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>

                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-white font-semibold text-black py-3 border rounded-full hover:bg-black hover:text-white hover:border-white transition"
              >
                Place Order
              </button>

            </aside>

          </form>

        </div>
      </main>
    </>
  );
}

export default Checkout;