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
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal * 0.02;
  const total = subtotal + shipping;

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const products = getProducts();
    const insufficientStock = cart.find(item => {
      const product = products.find( product => product.id === item.id );

      return !product || product.stock < item.quantity;
    });

    if (insufficientStock) {
      alert(
        `${insufficientStock.name} does not have enough stock.`
      );
      return;
    }

    cart.forEach(item => {
      const product = products.find( product => product.id === item.id);
      if (product) {
        updateProduct(product.id, {
          stock: product.stock - item.quantity
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

    const savedOrders = localStorage.getItem("orders");
    const orders = savedOrders
      ? JSON.parse(savedOrders)
      : [];

    localStorage.setItem(
      "orders",
      JSON.stringify([...orders, newOrder])
    );

    setOrder(newOrder);

    setCart([]);
    localStorage.removeItem("cart");
  };

  if (order) {
    return (
      <div className="min-h-screen bg-black text-white">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center">
            <div className="flex-1">
              <Link
                to="/"
                className="text-md font-semibold text-gray-800"
              >
                BuySphere
              </Link>
            </div>

            <div className="flex flex-1 justify-center gap-15 text-md">
              <Link
                to="/"
                className="px-4 py-2 rounded-full text-black hover:text-white hover:bg-black transition duration-500"
              >
                Home
              </Link>

              <Link
                to="/products"
                className="px-4 py-2 rounded-full text-black hover:text-white hover:bg-black transition duration-500"
              >
                Products
              </Link>

              <Link
                to="/cart"
                className="px-4 py-2 rounded-full text-black hover:text-white hover:bg-black transition duration-500"
              >
                Cart
              </Link>
            </div>

            <div className="flex-1" />
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="border border-white/20 p-8">
            <p className="text-xs tracking-[4px] uppercase text-gray-400">
              Order Complete
            </p>

            <h1 className="text-4xl font-bold mt-2 mb-4">
              Thank You for Your Order!
            </h1>

            <p className="text-gray-400 mb-8">
              Your order has been successfully placed.
            </p>

            <div className="border border-white/20 p-5 mb-8">
              <p className="text-sm text-gray-400">
                Order Number
              </p>

              <p className="text-2xl font-bold mt-1">
                {order.number}
              </p>

              <p className="text-sm text-gray-400 mt-3">
                Status:{" "}
                <span className="text-white">
                  {order.status}
                </span>
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-5">
              Order Summary
            </h2>

            <div className="space-y-4 border-b border-white/20 pb-6">
              {order.items.map(item => (
                <div
                  key={item.id}
                  className="flex justify-between"
                >
                  <div>
                    <p className="font-semibold">
                      {item.name}
                    </p>

                    <p className="text-sm text-gray-400">
                      {item.quantity} × ${item.price}
                    </p>
                  </div>

                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3 mt-6">
              <div className="flex justify-between">
                <span className="text-gray-400">
                  Subtotal
                </span>

                <span>
                  ${order.subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">
                  Shipping
                </span>

                <span>
                  ${order.shipping.toFixed(2)}
                </span>
              </div>

              <div className="border-t border-white/20 pt-4 flex justify-between">
                <span className="font-bold">
                  Total
                </span>

                <span className="text-2xl font-bold">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mt-8 border border-white/20 p-5">
              <p className="text-sm text-gray-400">
                Payment Method
              </p>

              <p className="font-semibold mt-1">
                {order.customer.payment}
              </p>
            </div>

            <Link
              to="/products"
              onClick={() => {
                setCart([]);
                localStorage.removeItem("cart");
              }}
              className="block text-center mt-8 bg-white text-black py-3 rounded-full font-semibold hover:bg-black hover:text-white border border-white transition"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (!cart.length) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">
            Your Cart is Empty
          </h1>

          <Link
            to="/products"
            className="inline-block bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-black hover:text-white border border-white transition"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center">
          <div className="flex-1">
            <Link
              to="/"
              className="text-md font-semibold text-gray-800"
            >
              BuySphere
            </Link>
          </div>

          <div className="flex flex-1 justify-center gap-15 text-md">
            <Link
              to="/"
              className="px-4 py-2 rounded-full text-black hover:text-white hover:bg-black transition duration-500"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="px-4 py-2 rounded-full text-black hover:text-white hover:bg-black transition duration-500"
            >
              Products
            </Link>

            <Link
              to="/cart"
              className="px-4 py-2 rounded-full text-black hover:text-white hover:bg-black transition duration-500"
            >
              Cart
            </Link>
          </div>

          <div className="flex-1" />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-14">
        <p className="text-xs tracking-[4px] uppercase text-gray-400">
          Complete Your Order
        </p>

        <h1 className="text-5xl font-bold mt-2 mb-10">
          Checkout
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2 border border-white/20 p-7">
            <h2 className="text-2xl font-bold mb-7">
              Customer Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                [
                  "name",
                  "Customer Name",
                  "text",
                  "Enter your name"
                ],
                [
                  "email",
                  "Email Address",
                  "email",
                  "example@email.com"
                ],
                [
                  "contact",
                  "Contact Number",
                  "tel",
                  "09XXXXXXXXX"
                ]
              ].map(
                ([name, label, type, placeholder]) => (
                  <div key={name}>
                    <label className="block text-sm text-gray-400 mb-2">
                      {label}
                    </label>

                    <input
                      required
                      type={type}
                      name={name}
                      value={form[name]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className="w-full bg-black border border-white/30 px-4 py-3 rounded text-white outline-none focus:border-white"
                    />
                  </div>
                )
              )}

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Payment Method
                </label>

                <select
                  name="payment"
                  value={form.payment}
                  onChange={handleChange}
                  className="w-full h-[50px] bg-black border border-white/30 px-4 rounded text-white outline-none"
                >
                  <option>Cash on Delivery</option>
                  <option>E-Wallet</option>
                  <option>Bank Transfer</option>
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-sm text-gray-400 mb-2">
                Delivery Address
              </label>

              <textarea
                required
                name="address"
                value={form.address}
                onChange={handleChange}
                rows="4"
                placeholder="Enter your complete delivery address"
                className="w-full bg-black border border-white/30 px-4 py-3 rounded text-white outline-none focus:border-white resize-none"
              />
            </div>

            <div className="mt-5">
              <label className="block text-sm text-gray-400 mb-2">
                Order Notes
              </label>

              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows="3"
                placeholder="Optional notes for your order"
                className="w-full bg-black border border-white/30 px-4 py-3 rounded text-white outline-none focus:border-white resize-none"
              />
            </div>
          </div>

          <aside className="h-fit border border-white/20 p-7">
            <p className="text-xs tracking-[4px] uppercase text-gray-400">
              Summary
            </p>

            <h2 className="text-2xl font-bold mt-2 mb-7">
              Your Order
            </h2>

            <div className="space-y-4 border-b border-white/20 pb-6">
              {cart.map(item => (
                <div
                  key={item.id}
                  className="flex justify-between gap-4"
                >
                  <div>
                    <p className="font-semibold">
                      {item.name}
                    </p>

                    <p className="text-sm text-gray-400">
                      {item.quantity} × ${item.price}
                    </p>
                  </div>

                  <p>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">
                  Subtotal
                </span>

                <span>
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">
                  Shipping
                </span>

                <span>
                  ${shipping.toFixed(2)}
                </span>
              </div>

              <div className="border-t border-white/20 pt-5 flex justify-between">
                <span className="font-bold">
                  Total
                </span>

                <span className="text-2xl font-bold">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-8 bg-white text-black py-3 rounded-full font-semibold hover:bg-black hover:text-white border border-white transition"
            >
              Place Order
            </button>

            <Link
              to="/cart"
              className="block text-center mt-4 text-sm text-gray-400 hover:text-white transition"
            >
              ← Back to Cart
            </Link>
          </aside>
        </form>
      </main>
    </div>
  );
}

export default Checkout;