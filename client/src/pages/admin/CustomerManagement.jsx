import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AdminCustomerManagement({ setIsAdmin }) {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    loadCustomers();

    window.addEventListener("storage", loadCustomers);
    window.addEventListener("focus", loadCustomers);

    return () => {
      window.removeEventListener("storage", loadCustomers);
      window.removeEventListener("focus", loadCustomers);
    };
  }, []);

  const loadCustomers = () => {
    let savedOrders = [];

    try {
      savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    } catch {
      savedOrders = [];
    }

    const customerMap = {};

    savedOrders.forEach(order => {
      const raw = order.customer || order;

      const email = raw.email || raw.Email;
      if (!email) return;

      const name = raw.name || raw.Name || "Unknown";
      const contact = raw.contact || raw.Contact || "N/A";
      const status = raw.status || "Active";

      if (!customerMap[email]) {
        customerMap[email] = {
          name,
          email,
          contact,
          orders: 0,
          totalPurchase: 0,
          status
        };
      }

      customerMap[email].orders += 1;
      customerMap[email].totalPurchase += Number(order.total || 0);
    });

    setCustomers(Object.values(customerMap));
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    setIsAdmin(false);
    navigate("/admin/login");
  };

  const handleStatusChange = (email, newStatus) => {
    let savedOrders = [];

    try {
      savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    } catch {
      savedOrders = [];
    }

    const updatedOrders = savedOrders.map(order => {
      const raw = order.customer || {};
      const orderEmail = raw.email || raw.Email;

      if (orderEmail === email) {
        return {
          ...order,
          customer: {
            ...raw,
            email: email,
            Email: email,
            status: newStatus
          }
        };
      }

      return order;
    });

    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    loadCustomers();

    toast.success("Customer status updated");
  };

  return (
    <>
      <nav className="bg-white p-4 flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:flex-1 text-center md:text-left">
          <Link to="/" className="font-bold text-gray-800">
            BuySphere
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-2 text-xs md:text-sm">
          <Link to="/admin/dashboard" className="px-3 py-1 rounded-full hover:bg-black hover:text-white">Dashboard</Link>
          <Link to="/admin/customerManage" className="px-3 py-1 rounded-full hover:bg-black hover:text-white">Customers</Link>
          <Link to="/admin/categoryManage" className="px-3 py-1 rounded-full hover:bg-black hover:text-white">Categories</Link>
          <Link to="/admin/orderManage" className="px-3 py-1 rounded-full hover:bg-black hover:text-white">Orders</Link>
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
      </nav>

      <div className="min-h-screen bg-black text-white px-4 py-8">
        <div className="max-w-7xl mx-auto">

          <h1 className="text-xl md:text-2xl font-bold mb-6">
            Customer Management
          </h1>

          {!customers.length && (
            <p className="text-center text-gray-400 py-10">
              No customers yet.
            </p>
          )}

          <div className="space-y-4">
            {customers.map(customer => (
              <div
                key={customer.email}
                className="border border-white/20 p-4 md:p-5 rounded-lg text-sm"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-gray-400 text-xs">Name</p>
                    <p className="font-semibold mt-1">
                      {customer.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs">Email</p>
                    <p className="mt-1 break-all">
                      {customer.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs">Contact</p>
                    <p className="mt-1">
                      {customer.contact}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs">Orders</p>
                    <p className="font-semibold mt-1">
                      {customer.orders}
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/20 mt-4 pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-gray-400 text-xs">
                      Total Purchase
                    </p>
                    <p className="font-semibold">
                      ${customer.totalPurchase.toFixed(2)}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs mb-1">
                      Status
                    </p>

                    <select
                      value={customer.status}
                      onChange={e =>
                        handleStatusChange(
                          customer.email,
                          e.target.value
                        )
                      }
                      className="bg-black border border-white/40 px-3 py-2 rounded text-sm"
                    >
                      <option className="bg-black">Active</option>
                      <option className="bg-black">Inactive</option>
                      <option className="bg-black">Suspended</option>
                    </select>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

export default AdminCustomerManagement;