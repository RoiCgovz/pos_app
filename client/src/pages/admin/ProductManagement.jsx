import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminProductManagement({ setIsAdmin }) {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState(initialForm());
  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  function initialForm() {
    return {
      name: "",
      brand: "",
      image: "",
      category: "",
      description: "",
      price: "",
      stock: "",
      status: "Active",
    };
  }

  const loadProducts = () => {
    try {
      const saved = localStorage.getItem("products");
      setProducts(saved ? JSON.parse(saved) : []);
    } catch {
      setProducts([]);
    }
  };

  const loadCategories = () => {
    try {
      const stored =
        JSON.parse(localStorage.getItem("categories")) || [];
      setCategories(stored);
    } catch {
      setCategories([]);
    }
  };

  useEffect(() => {
    loadProducts();
    loadCategories();

    window.addEventListener("storage", loadProducts);
    window.addEventListener("focus", loadProducts);
    window.addEventListener("storage", loadCategories);
    window.addEventListener("focus", loadCategories);

    return () => {
      window.removeEventListener("storage", loadProducts);
      window.removeEventListener("focus", loadProducts);
      window.removeEventListener("storage", loadCategories);
      window.removeEventListener("focus", loadCategories);
    };
  }, []);

  const saveProducts = (updated) => {
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.stock || !form.category) {
      alert("Fill required fields");
      return;
    }

    const newProduct = {
      ...form,
      brand: form.brand || "Unknown",
      id: editingId || Date.now(),
      price: Number(form.price),
      stock: Number(form.stock),
      active: form.status === "Active",
    };

    let updated;

    if (editingId) {
      updated = products.map((p) =>
        p.id === editingId ? newProduct : p
      );
    } else {
      updated = [...products, newProduct];
    }

    saveProducts(updated);
    setForm(initialForm());
    setEditingId(null);
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name || "",
      brand: product.brand || "",
      image: product.image || "",
      category: product.category || "",
      description: product.description || "",
      price: product.price || "",
      stock: product.stock || "",
      status: product.status || "Active",
    });

    setEditingId(product.id);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this product?")) return;
    saveProducts(products.filter((p) => p.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    setIsAdmin(false);
    navigate("/admin/login");
  };

  const filteredProducts = products
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) =>
      categoryFilter === "All"
        ? true
        : p.category === categoryFilter
    )
    .filter((p) =>
      statusFilter === "All"
        ? true
        : p.status === statusFilter
    );

  const categoryOptions = [
    "All",
    ...categories.map((c) => c.name),
  ];

  return (
    <>
      {/* NAVBAR (SAME AS DASHBOARD) */}
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
            <Link to="/admin/productManage" className="px-3 py-1 rounded-full bg-black text-white">Products</Link>
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

          <h1 className="text-lg md:text-2xl font-bold mb-6">
            Product Management
          </h1>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8 text-sm"
          >
            <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} className="input" />
            <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} className="input" />

            <select name="category" value={form.category} onChange={handleChange} className="input bg-black text-white">
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.id}>{c.name}</option>
              ))}
            </select>

            <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} className="input" />
            <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} className="input" />
            <input name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} className="input" />

            <select name="status" value={form.status} onChange={handleChange} className="input">
              <option>Active</option>
              <option>Inactive</option>
              <option>Out of Stock</option>
            </select>

            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="md:col-span-2 input" />

            <button className="md:col-span-2 bg-white text-black py-2 rounded">
              {editingId ? "Update Product" : "Add Product"}
            </button>
          </form>

          {/* FILTERS */}
          <div className="flex flex-col md:flex-row gap-3 mb-6 text-sm">
            <input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input w-full md:w-1/3"
            />

            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="input">
              {categoryOptions.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input">
              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Out of Stock</option>
            </select>
          </div>

          {/* PRODUCTS */}
          <div className="space-y-4">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="border border-white/20 p-4 rounded flex flex-col md:flex-row md:justify-between gap-4 text-sm"
              >
                <div className="flex gap-4">
                  <img src={p.image} alt={p.name} className="w-16 h-16 object-cover" />

                  <div>
                    <p className="font-bold">{p.name}</p>
                    <p className="text-gray-400">{p.category}</p>
                    <p>${p.price}</p>
                    <p>Stock: {p.stock}</p>
                    <p className="text-xs">{p.status}</p>
                  </div>
                </div>

                <div className="flex gap-2 md:flex-col">
                  <button onClick={() => handleEdit(p)} className="border px-3 py-1">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="border px-3 py-1 text-red-400">
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

export default AdminProductManagement;  