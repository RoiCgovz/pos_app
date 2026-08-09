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
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(savedOrders);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    setIsAdmin(false);
    navigate("/admin/login");
  };

  const handleStatusChange = (orderNumber, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.number === orderNumber
        ? { ...order, status: newStatus }
        : order
    );

    setOrders(updatedOrders);

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );

    toast.success("Order status updated");
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* NAVBAR */}

      <nav className="bg-white text-black">

        <div className="flex items-center px-6 py-3">

          <div className="flex-1">

            <Link
              to="/"
              className="text-md font-bold text-black"
            >
              BuySphere
            </Link>

          </div>

          <div className="flex flex-1 justify-center gap-15 text-md">

            <Link
              to="/admin/dashboard"
              className="px-4 py-2 rounded-full hover:bg-black hover:text-white transition"
            >
              Dashboard
            </Link>

            <Link
              to="/admin/customerManage"
              className="px-4 py-2 rounded-full hover:bg-black hover:text-white transition"
            >
              Customers
            </Link>

            <Link
              to="/admin/categoryManage"
              className="px-4 py-2 rounded-full hover:bg-black hover:text-white transition"
            >
              Categories
            </Link>

            <Link
              to="/admin/orderManage"
              className="px-4 py-2 rounded-full hover:bg-black hover:text-white transition  "
            >
              Orders
            </Link>

            <Link
              to="/admin/productManage"
              className="px-4 py-2 rounded-full hover:bg-white hover:text-black transition"
            >
              Products
            </Link>

          </div>

          <div className="flex-1 flex justify-end">

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full border border-black hover:bg-white hover:text-black transition"
            >
              Logout
            </button>

          </div>

        </div>

      </nav>

      {/* CONTENT */}

      <div className="p-6 max-w-7xl mx-auto">

        <h1 className="text-2xl font-bold mb-6">
          Order Management
        </h1>

        {/* ORDER LIST */}

        <div className="space-y-4">

          {!orders.length && (
            <p className="py-10 text-center text-gray-400">
              No orders yet.
            </p>
          )}

          {orders.map((order) => (

            <div
              key={order.number}
              className="border border-white/20 p-5 rounded-lg"
            >

              {/* HEADER */}

              <div className="flex justify-between items-start mb-4">

                <div>

                  <p className="font-bold">
                    {order.number}
                  </p>

                  <p className="text-sm text-gray-400">
                    {order.date
                      ? new Date(
                          order.date
                        ).toLocaleString()
                      : "No date"}
                  </p>

                </div>

                {/* STATUS */}

                <select
                  value={order.status || "Pending"}
                  onChange={(e) =>
                    handleStatusChange(
                      order.number,
                      e.target.value
                    )
                  }
                  className="bg-black text-white border border-white/40 px-3 py-2 rounded outline-none cursor-pointer"
                >

                  {statuses.map((status) => (

                    <option
                      key={status}
                      value={status}
                      className="bg-black text-white"
                    >
                      {status}
                    </option>

                  ))}

                </select>

              </div>

              {/* CUSTOMER */}

              <div className="mb-4 text-sm text-gray-300">

                <p>
                  {order.customer?.name ||
                    "Unknown Customer"}
                </p>

                <p>
                  {order.customer?.email ||
                    "No email"}
                </p>

              </div>

              {/* ITEMS */}

              <div className="border-t border-white/20 pt-3 space-y-2">

                {order.items?.map((item) => (

                  <div
                    key={item.id}
                    className="flex justify-between text-sm"
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

              <div className="border-t border-white/20 mt-4 pt-4 flex justify-between items-center">

                <div>

                  <span className="text-gray-400 text-sm">
                    Total
                  </span>

                  <p className="font-semibold">
                    $
                    {Number(
                      order.total || 0
                    ).toFixed(2)}
                  </p>

                </div>

                <button
                  onClick={() =>
                    navigate(
                      `/admin/orderDetails/${encodeURIComponent(
                        order.number
                      )}`
                    )
                  }
                  className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
                >
                  View Details
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default AdminOrderManagement;
 