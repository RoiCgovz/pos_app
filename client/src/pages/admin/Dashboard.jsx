import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function AdminDashboard({ setIsAdmin }) {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [data, setData] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalCustomers: 0,
    totalSales: 0
  });

  const loadData = () => {
    try {
      const products = JSON.parse(localStorage.getItem("products")) || [];
      const ordersData = JSON.parse(localStorage.getItem("orders")) || [];

      const totalProducts = products.filter(p => p.active !== false).length;
      const totalOrders = ordersData.length;
      const pendingOrders = ordersData.filter(o => o.status === "Pending").length;
      const completedOrders = ordersData.filter(o => o.status === "Completed").length;

      const uniqueCustomers = new Set(
        ordersData.map(o => o.customer?.email)
      );

      const totalCustomers = uniqueCustomers.size;

      const totalSales = ordersData.reduce(
        (sum, o) => sum + (o.total || 0),
        0
      );

      setData({
        totalProducts,
        totalOrders,
        pendingOrders,
        completedOrders,
        totalCustomers,
        totalSales
      });

      setOrders(ordersData);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();

    window.addEventListener("storage", loadData);
    window.addEventListener("focus", loadData);

    return () => {
      window.removeEventListener("storage", loadData);
      window.removeEventListener("focus", loadData);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    setIsAdmin(false);
    navigate("/admin/login");
  };

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

        </div>
      </nav>

      {/* CONTENT */}
      <div className="min-h-screen bg-black text-white px-4 py-8">
        <div className="max-w-7xl mx-auto">

          {/* STATS */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <Card title="Products" value={data.totalProducts} />
            <Card title="Orders" value={data.totalOrders} />
            <Card title="Pending" value={data.pendingOrders} />
            <Card title="Completed" value={data.completedOrders} />
            <Card title="Customers" value={data.totalCustomers} />
            <Card title="Sales" value={`$${data.totalSales.toFixed(2)}`} />
          </div>

          {/* ORDERS */}
          <div className="mt-10">
            <h2 className="text-lg md:text-xl font-bold mb-4">
              All Orders
            </h2>

            {!orders.length && (
              <p className="text-gray-400">No orders yet.</p>
            )}

            <div className="space-y-4">
              {orders.map(order => (
                <div
                  key={order.number}
                  className="border border-white/20 p-4 rounded-lg text-sm"
                >

                  {/* HEADER */}
                  <div className="flex flex-col md:flex-row md:justify-between gap-2 mb-3">
                    <div>
                      <p className="font-bold text-sm md:text-base">
                        {order.number}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(order.date).toLocaleString()}
                      </p>
                    </div>

                    <span className="self-start md:self-center text-xs border px-2 py-1 rounded">
                      {order.status}
                    </span>
                  </div>

                  {/* CUSTOMER */}
                  <div className="mb-3 text-gray-300 text-xs md:text-sm">
                    <p>{order.customer?.name}</p>
                    <p>{order.customer?.email}</p>
                  </div>

                  {/* ITEMS */}
                  <div className="border-t border-white/20 pt-3 space-y-1">
                    {order.items.map(item => (
                      <div key={item.id} className="flex justify-between text-xs md:text-sm">
                        <span>{item.name} x{item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  {/* TOTAL */}
                  <div className="border-t border-white/20 mt-3 pt-2 flex justify-between font-semibold text-sm">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>

                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-black text-white border border-white p-4 rounded-lg text-center">
      <p className="text-xs md:text-sm text-gray-500">{title}</p>
      <h3 className="text-lg md:text-2xl font-bold mt-1">{value}</h3>
    </div>
  );
}

export default AdminDashboard;