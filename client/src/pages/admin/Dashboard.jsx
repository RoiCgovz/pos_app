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
      const totalSales = ordersData.reduce( (sum, o) => sum + (o.total || 0), 0);

      setData({ totalProducts, totalOrders, pendingOrders, completedOrders, totalCustomers, totalSales});
      setOrders(ordersData);
      
    } catch (err) {
      console.error("Error loading dashboard data:", err);
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
    <div className="min-h-screen bg-black text-white">

      {/* Nav Bar */}
      <nav className="bg-white text-black">
        <div className="flex items-center px-6 py-3">
          <div className="flex-1">
            <Link to="/" className="text-md font-bold text-gray-800">
              BuySphere
            </Link>
          </div>

          <div className="flex flex-1 justify-center gap-15 text-md">
             <Link to="/admin/dashboard" className="px-4 py-2 rounded-full hover:bg-black hover:text-white transition duration-500">
              Dashboard
            </Link>
            <Link to="/admin/customerManage" className="px-4 py-2 rounded-full hover:bg-black hover:text-white transition duration-500">
              Customers
            </Link>
            <Link to="/admin/categoryManage" className="px-4 py-2 rounded-full hover:bg-black hover:text-white transition duration-500">
              Categories
            </Link>
            <Link to="/admin/orderManage" className="px-4 py-2 rounded-full hover:bg-black hover:text-white transition duration-500">
              Orders
            </Link>
            <Link to="/admin/productManage" className="px-4 py-2 rounded-full hover:bg-black hover:text-white transition duration-500">
              Products
            </Link>
          </div>

          <div className="flex-1 flex justify-end">
            <button onClick={handleLogout}
              className="px-4 py-2 rounded-full border border-black hover:bg-black hover:text-white transition duration-300"
            >
              Logout
            </button>
          </div>

        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="Total Products" value={data.totalProducts} />
          <Card title="Total Orders" value={data.totalOrders} />
          <Card title="Pending Orders" value={data.pendingOrders} />
          <Card title="Completed Orders" value={data.completedOrders} />
          <Card title="Total Customers" value={data.totalCustomers} />
          <Card title="Total Sales" value={`$${data.totalSales.toFixed(2)}`} />
        </div>

        {/* ALL ORDERS */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold mb-4">
            All Orders
          </h2>

          {!orders.length && (
            <p className="text-gray-400">
              No orders yet.
            </p>
          )}

          <div className="space-y-4">
            {orders.map(order => (
              <div
                key={order.number}
                className="border border-white/20 p-5 rounded-lg"
              >

                {/* Header */}
                <div className="flex justify-between mb-3">
                  <div>
                    <p className="font-bold">
                      {order.number}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(order.date).toLocaleString()}
                    </p>
                  </div>

                  <span className="text-sm border px-3 py-1 rounded">
                    {order.status}
                  </span>
                </div>

                {/* Customer */}
                <div className="mb-3 text-sm text-gray-300">
                  <p>{order.customer?.name}</p>
                  <p>{order.customer?.email}</p>
                </div>

                {/* Items */}
                <div className="border-t border-white/20 pt-3 space-y-2">
                  {order.items.map(item => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {item.name} x{item.quantity}
                      </span>

                      <span>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="border-t border-white/20 mt-3 pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="border border-white/20 p-6 rounded-lg">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}

export default AdminDashboard;