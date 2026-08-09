import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const statuses = [
  "Pending",
  "Confirmed",
  "Preparing",
  "Shipped",
  "Completed",
  "Cancelled",
];

function AdminOrderManagement({ setIsAdmin }) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(saved);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    setIsAdmin(false);
    navigate("/admin/login");
  };

  const handleStatusChange = (orderNumber, newStatus) => {
    const updated = orders.map((o) =>
      o.number === orderNumber
        ? { ...o, status: newStatus }
        : o
    );

    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
    toast.success("Order status updated");
  };

  return (
    <>
      {/* NAVBAR (IDENTICAL TO DASHBOARD) */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center gap-3">

          <div className="w-full md:flex-1 text-center md:text-left">
            <Link to="/" className="font-bold text-gray-800">
              BuySphere
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-2 text-xs md:text-sm">
            <Link to="/admin/dashboard" className="px-3 py-1 rounded-full hover:bg-black hover:text-white transition">
              Dashboard
            </Link>
            <Link to="/admin/customerManage" className="px-3 py-1 rounded-full hover:bg-black hover:text-white transition">
              Customers
            </Link>
            <Link to="/admin/categoryManage" className="px-3 py-1 rounded-full hover:bg-black hover:text-white transition">
              Categories
            </Link>
            <Link to="/admin/orderManage" className="px-3 py-1 rounded-full hover:bg-black hover:text-white transition">
              Orders
            </Link>
            <Link to="/admin/productManage" className="px-3 py-1 rounded-full hover:bg-black hover:text-white transition">
              Products
            </Link>
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

      {/* CONTENT (MATCHED STRUCTURE) */}
      <div className="min-h-screen bg-black text-white px-4 py-8">
        <div className="max-w-7xl mx-auto">

          <h1 className="text-lg md:text-xl font-bold mb-6">
            Order Management
          </h1>

          {!orders.length && (
            <p className="text-gray-400">
              No orders yet.
            </p>
          )}

          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.number}
                className="border border-white/20 p-4 rounded-lg text-sm"
              >

                {/* HEADER (same as dashboard) */}
                <div className="flex flex-col md:flex-row md:justify-between gap-2 mb-3">

                  <div>
                    <p className="font-bold text-sm md:text-base">
                      {order.number}
                    </p>

                    <p className="text-xs text-gray-400">
                      {order.date
                        ? new Date(order.date).toLocaleString()
                        : "No date"}
                    </p>
                  </div>

                  {/* STATUS SELECT (adapted but styled same scale) */}
                  <select
                    value={order.status || "Pending"}
                    onChange={(e) =>
                      handleStatusChange(
                        order.number,
                        e.target.value
                      )
                    }
                    className="text-xs md:text-sm border px-2 py-1 rounded bg-black text-white border-white/40"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>

                </div>

                {/* CUSTOMER */}
                <div className="mb-3 text-gray-300 text-xs md:text-sm">
                  <p>{order.customer?.name}</p>
                  <p className="break-all">
                    {order.customer?.email}
                  </p>
                </div>

                {/* ITEMS */}
                <div className="border-t border-white/20 pt-3 space-y-1">
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

                {/* TOTAL + ACTION */}
                <div className="border-t border-white/20 mt-3 pt-2 flex flex-col md:flex-row md:justify-between md:items-center gap-2">

                  <div className="font-semibold text-sm">
                    <span>Total: </span>
                    <span>
                      ${Number(order.total || 0).toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      navigate(
                        `/admin/orderDetails/${encodeURIComponent(
                          order.number
                        )}`
                      )
                    }
                    className="text-xs md:text-sm border px-3 py-1 rounded hover:bg-white hover:text-black transition"
                  >
                    View Details
                  </button>

                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

export default AdminOrderManagement;