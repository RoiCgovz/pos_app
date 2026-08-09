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

  // LOAD PRODUCTS
  const loadProducts = () => {
    try {
      const saved = localStorage.getItem("products");

      setProducts(
        saved ? JSON.parse(saved) : []
      );
    } catch (err) {
      console.error("Error loading products:", err);
      setProducts([]);
    }
  };

  // LOAD CATEGORIES
  const loadCategories = () => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("categories")
      ) || [];

      setCategories(stored);
    } catch (err) {
      console.error("Error loading categories:", err);
      setCategories([]);
    }
  };

  // LOAD PRODUCTS + CATEGORIES
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

  // SAVE PRODUCTS
  const saveProducts = (updated) => {
    setProducts(updated);

    localStorage.setItem(
      "products",
      JSON.stringify(updated)
    );
  };

  // HANDLE FORM CHANGES
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ADD / UPDATE PRODUCT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.price ||
      !form.stock ||
      !form.category
    ) {
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
        p.id === editingId
          ? newProduct
          : p
      );
    } else {
      updated = [
        ...products,
        newProduct,
      ];
    }

    saveProducts(updated);

    setForm(initialForm());
    setEditingId(null);
  };

  // EDIT PRODUCT
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

  // DELETE PRODUCT
  const handleDelete = (id) => {
    if (!window.confirm("Delete this product?")) {
      return;
    }

    const updated = products.filter(
      (p) => p.id !== id
    );

    saveProducts(updated);
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("admin");
    setIsAdmin(false);
    navigate("/admin/login");
  };

  // FILTER PRODUCTS
  const filteredProducts = products
    .filter((p) =>
      p.name
        .toLowerCase()
        .includes(search.toLowerCase())
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

  // CATEGORY OPTIONS
  const categoryOptions = [
    "All",
    ...categories.map((c) => c.name),
  ];

  return (
    <div className="min-h-screen bg-black text-white">

      {/* NAVBAR */}
      <nav className="bg-white text-black">
        <div className="flex items-center px-6 py-3">

          <div className="flex-1">
            <Link
              to="/"
              className="text-md font-bold text-gray-800"
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
              className="px-4 py-2 rounded-full bg-black text-white"
            >
              Products
            </Link>

          </div>

          <div className="flex-1 flex justify-end">

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full border border-black hover:bg-black hover:text-white"
            >
              Logout
            </button>

          </div>

        </div>
      </nav>

      {/* CONTENT */}
      <div className="p-6 max-w-7xl mx-auto">

        <h1 className="text-2xl font-bold mb-6">
          Product Management
        </h1>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4 mb-10"
        >

          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="input"
          />

          <input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="input"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="input"
          >
            <option value="">
              Select Category
            </option>

            {categories.map((c) => (
              <option
                key={c.id}
                value={c.name}
              >
                {c.name}
              </option>
            ))}
          </select>

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="input"
          />

          <input
            name="stock"
            type="number"
            placeholder="Stock Quantity"
            value={form.stock}
            onChange={handleChange}
            className="input"
          />

          <input
            name="brand"
            placeholder="Brand"
            value={form.brand}
            onChange={handleChange}
            className="input"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="input"
          >
            <option className="text-black">
              Active
            </option>

            <option className="text-black">
              Inactive
            </option>

            <option className="text-black">
              Out of Stock
            </option>
          </select>

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="col-span-2 input"
          />

          <button
            type="submit"
            className="col-span-2 bg-white text-black py-2 rounded"
          >
            {editingId
              ? "Update Product"
              : "Add Product"}
          </button>

        </form>

        {/* SEARCH + FILTER */}
        <div className="flex gap-4 mb-6">

          <input
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="input w-1/3"
          />

          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value)
            }
            className="input"
          >
            {categoryOptions.map((c) => (
              <option key={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="input"
          >
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Out of Stock</option>
          </select>

        </div>

        {/* PRODUCT LIST */}
        <div className="space-y-4">

          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="border border-white/20 p-4 rounded flex justify-between"
            >

              <div className="flex gap-4">

                <img
                  src={p.image}
                  alt={p.name}
                  className="w-20 h-20 object-cover"
                />

                <div>

                  <p className="font-bold">
                    {p.name}
                  </p>

                  <p className="text-sm text-gray-400">
                    {p.category}
                  </p>

                  <p className="text-sm">
                    ${p.price}
                  </p>

                  <p className="text-sm">
                    Stock: {p.stock}
                  </p>

                  <p className="text-xs">
                    {p.status}
                  </p>

                </div>

              </div>

              <div className="flex flex-col gap-2">

                <button
                  type="button"
                  onClick={() => handleEdit(p)}
                  className="border px-3 py-1"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(p.id)
                  }
                  className="border px-3 py-1 text-red-400"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default AdminProductManagement;

