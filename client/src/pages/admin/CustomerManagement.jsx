import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AdminCustomerManagement({ setIsAdmin }) {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = () => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const customerMap = {};

    savedOrders.forEach((order) => {
      const customer = order.customer;

      if (!customer?.email) return;

      const email = customer.email;

      if (!customerMap[email]) {
        customerMap[email] = {
          name: customer.name || "Unknown Customer",
          email: customer.email,
          contact: customer.contact || "N/A",
          orders: 0,
          totalPurchase: 0,
          status: customer.status || "Active",
        };
      }

      customerMap[email].orders += 1;

      customerMap[email].totalPurchase +=
        Number(order.total || 0);
    });

    setCustomers(Object.values(customerMap));
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    setIsAdmin(false);
    navigate("/admin/login");
  };

  const handleStatusChange = (email, newStatus) => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const updatedOrders = savedOrders.map((order) => {
      if (order.customer?.email === email) {
        return {
          ...order,
          customer: {
            ...order.customer,
            status: newStatus,
          },
        };
      }

      return order;
    });

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );

    loadCustomers();

    toast.success("Customer status updated");
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
              className="px-4 py-2 rounded-full hover:bg-black hover:text-white transition"
            >
              Orders
            </Link>

            <Link
              to="/admin/productManage"
              className="px-4 py-2 rounded-full hover:bg-black hover:text-white transition"
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
          Customer Management
        </h1>

        {/* CUSTOMER LIST */}

        <div className="space-y-4">

          {!customers.length && (
            <p className="py-10 text-center text-gray-400">
              No customers yet.
            </p>
          )}

          {customers.map((customer) => (

            <div
              key={customer.email}
              className="border border-white/20 p-5 rounded-lg"
            >

              {/* CUSTOMER INFORMATION */}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

                <div>

                  <p className="text-sm text-gray-400">
                    Customer Name
                  </p>

                  <p className="font-semibold mt-1">
                    {customer.name}
                  </p>

                </div>

                <div>

                  <p className="text-sm text-gray-400">
                    Email Address
                  </p>

                  <p className="mt-1 break-all">
                    {customer.email}
                  </p>

                </div>

                <div>

                  <p className="text-sm text-gray-400">
                    Contact Number
                  </p>

                  <p className="mt-1">
                    {customer.contact}
                  </p>

                </div>

                <div>

                  <p className="text-sm text-gray-400">
                    Number of Orders
                  </p>

                  <p className="font-semibold mt-1">
                    {customer.orders}
                  </p>

                </div>

              </div>

              {/* PURCHASE + STATUS */}

              <div className="border-t border-white/20 mt-5 pt-4 flex flex-col md:flex-row justify-between gap-4">

                <div>

                  <p className="text-sm text-gray-400">
                    Total Purchase Amount
                  </p>

                  <p className="font-semibold">
                    $
                    {customer.totalPurchase.toFixed(2)}
                  </p>

                </div>

                <div>

                  <p className="text-sm text-gray-400 mb-1">
                    Account Status
                  </p>

                  <select
                    value={customer.status}
                    onChange={(e) =>
                      handleStatusChange(
                        customer.email,
                        e.target.value
                      )
                    }
                    className="bg-black text-white border border-white/40 px-4 py-2 rounded outline-none cursor-pointer"
                  >

                    <option
                      value="Active"
                      className="bg-black"
                    >
                      Active
                    </option>

                    <option
                      value="Inactive"
                      className="bg-black"
                    >
                      Inactive
                    </option>

                    <option
                      value="Suspended"
                      className="bg-black"
                    >
                      Suspended
                    </option>

                  </select>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default AdminCustomerManagement;
