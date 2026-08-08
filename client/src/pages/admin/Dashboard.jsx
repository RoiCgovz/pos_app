import { useNavigate } from "react-router-dom";

function AdminDashboard({ setIsAdmin }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAdmin(false);
    navigate("/admin/login");
  };
  const data = {
    totalProducts: 24,
    totalOrders: 58,
    pendingOrders: 12,
    completedOrders: 46,
    totalCustomers: 31,
    totalSales: 125430,
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Top Bar */}
      <div className="flex justify-between items-center px-8 py-4 border-b border-white/20">
        <h1 className="text-xl font-bold">BuySphere Admin Dashboard</h1>

        <button onClick={handleLogout} className="px-4 py-1 border border-white rounded hover:bg-white hover:text-black transition">
          Logout
        </button>
      </div>
      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="Total Products" value={data.totalProducts} />
          <Card title="Total Orders" value={data.totalOrders} />
          <Card title="Pending Orders" value={data.pendingOrders} />
          <Card title="Completed Orders" value={data.completedOrders} />
          <Card title="Total Customers" value={data.totalCustomers} />
          <Card title="Total Sales" value={`$${data.totalSales}`} />
        </div>
        {/* Chart Section */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold mb-4">Orders Overview</h2>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="border border-white/20 p-6 rounded-lg bg-black/60 hover:border-white transition">
      <h3 className="text-sm text-gray-400 mb-2">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export default AdminDashboard;