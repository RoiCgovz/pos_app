import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function AdminCategoryManage({ setIsAdmin }) {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  /* LOAD */
  const loadCategories = () => {
    try {
      const stored = JSON.parse(localStorage.getItem("categories")) || [];
      setCategories(stored);
    } catch {
      setCategories([]);
    }
  };

  useEffect(() => {
    loadCategories();

    window.addEventListener("storage", loadCategories);
    window.addEventListener("focus", loadCategories);

    return () => {
      window.removeEventListener("storage", loadCategories);
      window.removeEventListener("focus", loadCategories);
    };
  }, []);

  /* SAVE */
  const saveCategories = (data) => {
    localStorage.setItem("categories", JSON.stringify(data));
    setCategories(data);
  };

  /* ADD / UPDATE */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return alert("Category name required");

    if (editingId) {
      const updated = categories.map(c =>
        c.id === editingId ? { ...c, name: name.trim() } : c
      );
      saveCategories(updated);
      setEditingId(null);
    } else {
      const newCategory = {
        id: Date.now(),
        name: name.trim()
      };
      saveCategories([...categories, newCategory]);
    }

    setName("");
  };

  /* EDIT */
  const handleEdit = (cat) => {
    setName(cat.name);
    setEditingId(cat.id);
  };

  /* DELETE */
  const handleDelete = (id, categoryName) => {
    const products = JSON.parse(localStorage.getItem("products")) || [];

    const isUsed = products.some(p => p.category === categoryName);

    if (isUsed) {
      alert("Cannot delete: category is used in products.");
      return;
    }

    const filtered = categories.filter(c => c.id !== id);
    saveCategories(filtered);
  };

  /* LOGOUT */
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

          <h1 className="text-xl md:text-2xl font-bold mb-6">
            Category Management
          </h1>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-3 mb-8"
          >
            <input
              type="text"
              placeholder="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 bg-black border border-white/30 px-4 py-2 rounded"
            />

            <button
              type="submit"
              className="bg-white text-black px-6 py-2 rounded"
            >
              {editingId ? "Update" : "Add"}
            </button>
          </form>

          {/* LIST */}
          <div className="space-y-4">

            {!categories.length && (
              <p className="text-center text-gray-400 py-10">
                No categories yet.
              </p>
            )}

            {categories.map(cat => (
              <div
                key={cat.id}
                className="border border-white/20 p-4 rounded flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >

                <div>
                  <p className="font-bold">{cat.name}</p>
                  <p className="text-xs text-gray-400">
                    ID: {cat.id}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="border px-3 py-1 rounded hover:bg-white hover:text-black"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(cat.id, cat.name)}
                    className="border px-3 py-1 rounded text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                  >
                    Delete
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

export default AdminCategoryManage;