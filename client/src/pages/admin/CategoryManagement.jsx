import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function AdminCategoryManage({ setIsAdmin }) {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

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

  useEffect(() => {
    loadCategories();

    window.addEventListener("storage", loadCategories);
    window.addEventListener("focus", loadCategories);

    return () => {
      window.removeEventListener("storage", loadCategories);
      window.removeEventListener("focus", loadCategories);
    };
  }, []);

  // SAVE CATEGORIES
  const saveCategories = (data) => {
    localStorage.setItem(
      "categories",
      JSON.stringify(data)
    );

    setCategories(data);
  };

  // ADD / UPDATE CATEGORY
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Category name required");
      return;
    }

    if (editingId) {
      const updated = categories.map((c) =>
        c.id === editingId
          ? { ...c, name: name.trim() }
          : c
      );

      saveCategories(updated);
      setEditingId(null);
    } else {
      const newCategory = {
        id: Date.now(),
        name: name.trim(),
      };

      saveCategories([
        ...categories,
        newCategory,
      ]);
    }

    setName("");
  };

  // EDIT CATEGORY
  const handleEdit = (cat) => {
    setName(cat.name);
    setEditingId(cat.id);
  };

  // DELETE CATEGORY
  const handleDelete = (id, categoryName) => {
    const products =
      JSON.parse(localStorage.getItem("products")) || [];

    const isUsed = products.some(
      (p) => p.category === categoryName
    );

    if (isUsed) {
      alert(
        "Cannot delete: category is assigned to a product."
      );
      return;
    }

    const filtered = categories.filter(
      (c) => c.id !== id
    );

    saveCategories(filtered);
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("admin");
    setIsAdmin(false);
    navigate("/admin/login");
  };

  return ( 
	<div className="min-h-screen bg-black text-white"> 
		{/* NAVBAR */} 
		<nav className="bg-white text-black"> 
			<div className="flex items-center px-6 py-3"> 
				<div className="flex-1"> 
					<Link to="/" className="text-md font-bold text-gray-800" > 
						BuySphere 
					</Link> 
				</div> 
				
				<div className="flex flex-1 justify-center gap-15 text-md"> 
					<Link to="/admin/dashboard" className="px-4 py-2 rounded-full hover:bg-black hover:text-white transition" > 
						Dashboard 
					</Link> 
					<Link to="/admin/customerManage" className="px-4 py-2 rounded-full hover:bg-black hover:text-white transition" > 
						Customers 
					</Link> 
					<Link to="/admin/categoryManage" className="px-4 py-2 rounded-full bg-black text-white" > 
						Categories 
					</Link> 
					<Link to="/admin/orderManage" className="px-4 py-2 rounded-full hover:bg-black hover:text-white transition" > 
						Orders 
					</Link> 
					<Link to="/admin/productManage" className="px-4 py-2 rounded-full hover:bg-black hover:text-white transition" > 
						Products 
					</Link> 
				</div> 
				
				<div className="flex-1 flex justify-end"> 
					<button onClick={handleLogout} className="px-4 py-2 rounded-full border border-black hover:bg-black hover:text-white" > 
						Logout 
					</button> 
				</div> 
			</div>
		</nav>
		
		{/* CONTENT */} 
		<div className="p-6 max-w-7xl mx-auto"> 
			<h1 className="text-2xl font-bold mb-6"> 
				Category Management 
			</h1> 
			
			{/* FORM */} 
			<form onSubmit={handleSubmit} className="flex gap-4 mb-10" > 
			<input type="text" name="category" placeholder="Category Name" value={name} onChange={(e) => setName(e.target.value)} className="input flex-1" /> 
			<button type="submit" className="bg-white text-black px-6 py-2 rounded" > 
				{editingId ? "Update Category" : "Add Category"} 
			</button> </form> {/* CATEGORY LIST */} 
			<div className="space-y-4"> 
				{!categories.length && ( <p className="py-10 text-center text-gray-400"> No categories yet. </p> )} 
				{categories.map((cat) => ( <div key={cat.id} className="border border-white/20 p-4 rounded flex justify-between items-center" > 
			<div> 
			<p className="font-bold"> {
				cat.name} </p> <p className="text-sm text-gray-400"> Category ID: {cat.id} 
			</p> 
		</div> 
		
		<div className="flex gap-3"> 
		<button type="button" onClick={() => handleEdit(cat)} className="border border-white px-3 py-1 rounded hover:bg-white hover:text-black transition" > 
			Edit 
		</button> 
		<button type="button" onClick={() => handleDelete(cat.id, cat.name) } className="border px-3 py-1 rounded text-red-400 border-red-400 hover:bg-red-400 hover:text-white transition" > 
			Delete 
		</button> 
	</div> 
</div> ))} 
</div> 
</div> 
</div> 
);
}

export default AdminCategoryManage;

