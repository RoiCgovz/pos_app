import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const statuses = [
  "Pending",
  "Confirmed",
  "Preparing",
  "Shipped",
  "Completed",
  "Cancelled",
];

function AdminOrderDetails({ setIsAdmin }) {
  const navigate = useNavigate();
  const { orderNumber } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const found = savedOrders.find(
      (o) => o.number === orderNumber
    );

    setOrder(found || null);
  }, [orderNumber]);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    setIsAdmin(false);
    navigate("/admin/login");
  };

  const handleStatusChange = (newStatus) => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const updated = savedOrders.map((o) =>
      o.number === order.number
        ? { ...o, status: newStatus }
        : o
    );

    localStorage.setItem("orders", JSON.stringify(updated));

    setOrder({ ...order, status: newStatus });

    toast.success("Order status updated");
  };

  if (!order) {
    return (
      <>
        {/* NAVBAR */}
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center gap-3">

            <div className="w-full md:flex-1 text-center md:text-left">
              <Link to="/" className="font-bold text-gray-800">
                BuySphere
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-2 text-xs md:text-sm">
              <Link to="/admin/dashboard" className="px-3 py-1 rounded-full hover:bg-black hover:text-white">Dashboard</Link>
              <Link to="/admin/customerManage" className="px-3 py-1 rounded-full hover:bg-black hover:text-white">Customers</Link>
              <Link to="/admin/categoryManage" className="px-3 py-1 rounded-full hover:bg-black hover:text-white">Categories</Link>
              <Link to="/admin/orderManage" className="px-3 py-1 rounded-full bg-black text-white">Orders</Link>
              <Link to="/admin/productManage" className="px-3 py-1 rounded-full hover:bg-black hover:text-white">Products</Link>
            </div>

            <div className="w-full md:flex-1 flex justify-center md:justify-end">
              <button
                onClick={handleLogout}
                className="px-3 py-1 border rounded-full hover:bg-black hover:text-white transition"
              >
                Logout
              </button>
            </div>

          </div>
        </nav>

        {/* NOT FOUND */}
        <div className="min-h-screen bg-black text-white flex items-center justify-center text-center px-4">
          <div>
            <p className="text-gray-400">Order not found.</p>
            <button
              onClick={() => navigate("/admin/orderManage")}
              className="mt-5 border border-white px-4 py-2 rounded hover:bg-white hover:text-black"
            >
              Back to Orders
            </button>
          </div>
        </div>
      </>
    );
  }

  const subtotal =
    order.items?.reduce(
      (sum, item) =>
        sum +
        Number(item.price || 0) *
          Number(item.quantity || 0),
      0
    ) || 0;

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center gap-3">

          <div className="w-full md:flex-1 text-center md:text-left">
            <Link to="/" className="font-bold text-gray-800">
              BuySphere
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-2 text-xs md:text-sm">
            <Link to="/admin/dashboard" className="px-3 py-1 rounded-full hover:bg-black hover:text-white">Dashboard</Link>
            <Link to="/admin/customerManage" className="px-3 py-1 rounded-full hover:bg-black hover:text-white">Customers</Link>
            <Link to="/admin/categoryManage" className="px-3 py-1 rounded-full hover:bg-black hover:text-white">Categories</Link>
            <Link to="/admin/orderManage" className="px-3 py-1 rounded-full bg-black text-white">Orders</Link>
            <Link to="/admin/productManage" className="px-3 py-1 rounded-full hover:bg-black hover:text-white">Products</Link>
          </div>

          <div className="w-full md:flex-1 flex justify-center md:justify-end">
            <button
              onClick={handleLogout}
              className="px-3 py-1 border rounded-full hover:bg-black hover:text-white transition"
            >
              Logout
            </button>
          </div>

        </div>
      </nav>

      {/* CONTENT */}
      <div className="min-h-screen bg-black text-white px-4 py-8">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
            <div>
              <p className="text-xs text-gray-400">ORDER DETAILS</p>
              <h1 className="text-xl md:text-2xl font-bold">
                {order.number}
              </h1>
              {order.date && (
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(order.date).toLocaleString()}
                </p>
              )}
            </div>

            <button
              onClick={() => navigate("/admin/orderManage")}
              className="border border-white px-10 py-3 rounded hover:bg-white hover:text-black"
            >
              Back
            </button>
          </div>

          {/* CUSTOMER */}
          <div className="border border-white/20 p-4 rounded-lg mb-4 text-sm">
            <h2 className="font-semibold mb-3">Customer</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm">
              <p>{order.customer?.name}</p>
              <p>{order.customer?.email}</p>
              <p>{order.customer?.contact || "N/A"}</p>
            </div>
          </div>

          {/* ITEMS */}
          <div className="border border-white/20 p-4 rounded-lg mb-4 text-sm">
            <h2 className="font-semibold mb-3">Items</h2>

            <div className="space-y-2">
              {order.items?.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-xs md:text-sm"
                >
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>
                    $
                    {(
                      Number(item.price) *
                      Number(item.quantity)
                    ).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* SUMMARY */}
          <div className="border border-white/20 p-4 rounded-lg mb-4 text-sm">
            <h2 className="font-semibold mb-3">Summary</h2>

            <div className="flex justify-between text-xs md:text-sm">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="border-t border-white/20 mt-2 pt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span>
                ${Number(order.total || subtotal).toFixed(2)}
              </span>
            </div>
          </div>

          {/* STATUS */}
          <div className="border border-white/20 p-4 rounded-lg text-sm">
            <h2 className="font-semibold mb-3">Status</h2>

            <select
              value={order.status || "Pending"}
              onChange={(e) =>
                handleStatusChange(e.target.value)
              }
              className="bg-black text-white border border-white/40 px-3 py-2 rounded w-full md:w-auto"
            >
              {statuses.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

        </div>
      </div>
    </>
  );
}

export default AdminOrderDetails;