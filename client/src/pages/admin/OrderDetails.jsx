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

    const foundOrder = savedOrders.find(
      (item) => item.number === orderNumber
    );

    setOrder(foundOrder || null);
  }, [orderNumber]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    navigate("/admin/login");
  };

  const handleStatusChange = (newStatus) => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const updatedOrders = savedOrders.map((item) =>
      item.number === order.number
        ? {
            ...item,
            status: newStatus,
          }
        : item
    );

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );

    setOrder({
      ...order,
      status: newStatus,
    });

    toast.success("Order status updated");
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-black text-white">

        {/* NAVBAR */}
        <nav className="bg-black text-white">
          <div className="flex items-center px-6 py-3">

            <div className="flex-1">
              <Link
                to="/"
                className="text-md font-bold text-white"
              >
                BuySphere
              </Link>
            </div>

            <div className="flex flex-1 justify-center gap-15 text-md">

              <Link
                to="/admin/dashboard"
                className="px-4 py-2 rounded-full hover:bg-white hover:text-black transition"
              >
                Dashboard
              </Link>

              <Link
                to="/admin/customerManage"
                className="px-4 py-2 rounded-full hover:bg-white hover:text-black transition"
              >
                Customers
              </Link>

              <Link
                to="/admin/categoryManage"
                className="px-4 py-2 rounded-full hover:bg-white hover:text-black transition"
              >
                Categories
              </Link>

              <Link
                to="/admin/orderManage"
                className="px-4 py-2 rounded-full bg-white text-black"
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

        <div className="p-6 max-w-7xl mx-auto">

          <p className="text-gray-400">
            Order not found.
          </p>

          <button
            onClick={() => navigate("/admin/orderManage")}
            className="mt-5 border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
          >
            Back to Orders
          </button>

        </div>

      </div>
    );
  }

  const subtotal = order.items?.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  ) || 0;

  return (
    <div className="min-h-screen bg-black text-white">

      {/* NAVBAR */}

      <nav className="bg-black text-white">

        <div className="flex items-center px-6 py-3">

          <div className="flex-1">

            <Link
              to="/"
              className="text-md font-bold text-white"
            >
              BuySphere
            </Link>

          </div>

          <div className="flex flex-1 justify-center gap-15 text-md">

            <Link
              to="/admin/dashboard"
              className="px-4 py-2 rounded-full hover:bg-white hover:text-black transition"
            >
              Dashboard
            </Link>

            <Link
              to="/admin/customerManage"
              className="px-4 py-2 rounded-full hover:bg-white hover:text-black transition"
            >
              Customers
            </Link>

            <Link
              to="/admin/categoryManage"
              className="px-4 py-2 rounded-full hover:bg-white hover:text-black transition"
            >
              Categories
            </Link>

            <Link
              to="/admin/orderManage"
              className="px-4 py-2 rounded-full bg-white text-black"
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
              className="px-4 py-2 rounded-full border border-white hover:bg-white hover:text-black transition"
            >
              Logout
            </button>

          </div>

        </div>

      </nav>

      {/* CONTENT */}

      <div className="p-6 max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-8">

          <div>

            <p className="text-sm text-gray-400">
              ORDER DETAILS
            </p>

            <h1 className="text-2xl font-bold">
              {order.number}
            </h1>

            {order.date && (
              <p className="text-sm text-gray-400 mt-1">
                {new Date(order.date).toLocaleString()}
              </p>
            )}

          </div>

          <button
            onClick={() => navigate("/admin/orderManage")}
            className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
          >
            Back to Orders
          </button>

        </div>

        {/* CUSTOMER INFORMATION */}

        <div className="border border-white/20 rounded-lg p-5 mb-5">

          <h2 className="font-semibold text-lg mb-4">
            Customer Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <p className="text-sm text-gray-400">
                Customer Name
              </p>

              <p className="mt-1">
                {order.customer?.name || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">
                Email Address
              </p>

              <p className="mt-1">
                {order.customer?.email || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">
                Contact Number
              </p>

              <p className="mt-1">
                {order.customer?.contact || "N/A"}
              </p>
            </div>

          </div>

        </div>

        {/* DELIVERY ADDRESS */}

        <div className="border border-white/20 rounded-lg p-5 mb-5">

          <h2 className="font-semibold text-lg mb-4">
            Delivery Address
          </h2>

          <p className="text-gray-300">
            {order.customer?.address ||
              order.address ||
              "No delivery address provided."}
          </p>

        </div>

        {/* ORDERED PRODUCTS */}

        <div className="border border-white/20 rounded-lg p-5 mb-5">

          <h2 className="font-semibold text-lg mb-4">
            Ordered Products
          </h2>

          <div className="space-y-3">

            {order.items?.map((item) => (

              <div
                key={item.id}
                className="border border-white/20 rounded p-4"
              >

                <div className="flex justify-between items-center">

                  <div>

                    <p className="font-semibold">
                      {item.name}
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      ${Number(item.price || 0).toFixed(2)}
                      {" "}×{" "}
                      {item.quantity}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-sm text-gray-400">
                      Quantity
                    </p>

                    <p className="font-semibold">
                      {item.quantity}
                    </p>

                  </div>

                </div>

                <div className="border-t border-white/20 mt-3 pt-3 flex justify-between">

                  <span className="text-gray-400">
                    Item Total
                  </span>

                  <span className="font-semibold">
                    $
                    {(
                      Number(item.price || 0) *
                      Number(item.quantity || 0)
                    ).toFixed(2)}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* ORDER SUMMARY */}

        <div className="border border-white/20 rounded-lg p-5 mb-5">

          <h2 className="font-semibold text-lg mb-4">
            Order Summary
          </h2>

          <div className="space-y-3">

            <div className="flex justify-between">

              <span className="text-gray-400">
                Subtotal
              </span>

              <span>
                ${subtotal.toFixed(2)}
              </span>

            </div>

            <div className="border-t border-white/20 pt-3 flex justify-between">

              <span className="font-semibold">
                Total Amount
              </span>

              <span className="font-bold text-lg">
                ${Number(order.total || subtotal).toFixed(2)}
              </span>

            </div>

          </div>

        </div>

        {/* PAYMENT & STATUS */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

          {/* PAYMENT METHOD */}

          <div className="border border-white/20 rounded-lg p-5">

            <h2 className="font-semibold text-lg mb-4">
              Payment Method
            </h2>

            <p className="text-gray-300">
              {order.customer?.payment ||
                order.payment ||
                order.paymentMethod ||
                "N/A"}
            </p>

          </div>

          {/* ORDER STATUS */}

          <div className="border border-white/20 rounded-lg p-5">

            <h2 className="font-semibold text-lg mb-4">
              Order Status
            </h2>

            <select
              value={order.status || "Pending"}
              onChange={(e) =>
                handleStatusChange(e.target.value)
              }
              className="bg-black text-white border border-white/40 px-4 py-2 rounded outline-none cursor-pointer"
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

        </div>

        {/* ORDER NOTES */}

        <div className="border border-white/20 rounded-lg p-5">

          <h2 className="font-semibold text-lg mb-4">
            Order Notes
          </h2>

          <p className="text-gray-400">

            {order.customer?.notes ||
              order.notes ||
              "No order notes."}

          </p>

        </div>

      </div>

    </div>
  );
}

export default AdminOrderDetails;