import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import sampleProducts from "../../data/sampleProducts";

function Products({ setCart }) {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState(
    () => localStorage.getItem("search") || ""
  );

  const [category, setCategory] = useState(
    () => localStorage.getItem("selectedCategory") || "All"
  );

  const [sort, setSort] = useState(
    () => localStorage.getItem("sort") || "default"
  );

  const [brand, setBrand] = useState(
    () => localStorage.getItem("brand") || "All"
  );

  /* Load products */
  useEffect(() => {
    const loadProducts = () => {
      try {
        const saved = localStorage.getItem("products");

        if (saved) {
          setProducts(JSON.parse(saved));
        } else {
          localStorage.setItem("products", JSON.stringify(sampleProducts));
          setProducts(sampleProducts);
        }
      } catch {
        setProducts(sampleProducts);
      }
    };

    loadProducts();
    window.addEventListener("storage", loadProducts);
    window.addEventListener("focus", loadProducts);

    return () => {
      window.removeEventListener("storage", loadProducts);
      window.removeEventListener("focus", loadProducts);
    };
  }, []);

  /* Save filters */
  useEffect(() => {
    localStorage.setItem("search", search);
    localStorage.setItem("selectedCategory", category);
    localStorage.setItem("sort", sort);
    localStorage.setItem("brand", brand);
  }, [search, category, sort, brand]);

  const brands = ["All", ...new Set(products.map(p => p.brand))];
  const categories = ["All", ...new Set(products.map(p => p.category))];

  let filteredProducts = products
    .filter(p => p.active !== false)
    .filter(
      p =>
        (
          p.brand.toLowerCase().includes(search.toLowerCase()) ||
          p.name.toLowerCase().includes(search.toLowerCase())
        ) &&
        (category === "All" || p.category === category) &&
        (brand === "All" || p.brand === brand)
    );

  if (sort === "low") filteredProducts.sort((a, b) => a.price - b.price);
  if (sort === "high") filteredProducts.sort((a, b) => b.price - a.price);

  return (
    <>
      {/* NAVBAR (same as Home) */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center">

          <div className="w-full md:flex-1 text-center md:text-left">
            <Link to="/" className="text-md font-bold text-gray-800">
              BuySphere
            </Link>
          </div>

          <div className="flex gap-4 text-sm md:text-md justify-center">
            <Link to="/" className="px-3 py-1 rounded-full hover:bg-black hover:text-white transition">
              Home
            </Link>
            <Link to="/products" className="px-3 py-1 rounded-full hover:bg-black hover:text-white transition">
              Products
            </Link>
            <Link to="/cart" className="px-3 py-1 rounded-full hover:bg-black hover:text-white transition">
              Cart
            </Link>
          </div>

          <div className="w-full md:flex-1 flex justify-center md:justify-end"/>

        </div>
      </nav>

      {/* PAGE */}
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-7xl mx-auto px-4">

          {/* Search */}
          <div className="py-4 border-b border-white/20">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full md:w-[350px] h-10 px-4 text-black rounded-full outline-none"
            />
          </div>

          {/* Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-6">

            {/* FILTERS */}
            <aside className="flex flex-col gap-6 md:border-r border-white/20 pr-0 md:pr-6">

              <div>
                <h2 className="text-xs text-gray-400 mb-2">SORT</h2>
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="w-full h-9 px-3 bg-black border border-white/30 rounded"
                >
                  <option value="default">What's new</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                </select>
              </div>

              <div>
                <h2 className="text-xs text-gray-400 mb-2">CATEGORY</h2>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full h-9 px-3 bg-black border border-white/30 rounded"
                >
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <h2 className="text-xs text-gray-400 mb-2">BRAND</h2>
                <select
                  value={brand}
                  onChange={e => setBrand(e.target.value)}
                  className="w-full h-9 px-3 bg-black border border-white/30 rounded"
                >
                  {brands.map(b => <option key={b}>{b}</option>)}
                </select>
              </div>

            </aside>

            {/* PRODUCTS */}
            <main className="col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    setCart={setCart}
                  />
                ))}
              </div>

              {!filteredProducts.length && (
                <p className="py-20 text-center text-gray-400">
                  No products found.
                </p>
              )}
            </main>

          </div>
        </div>
      </div>
    </>
  );
}

/* PRODUCT CARD */
function ProductCard({ product, setCart }) {
  const inStock = product.stock > 0;

  const addToCart = () => {
    if (!inStock) return;

    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);

      let updated;

      if (existing) {
        updated = prev.map(i =>
          i.id === product.id
            ? { ...i, quantity: Math.min(i.quantity + 1, product.stock) }
            : i
        );
      } else {
        updated = [...prev, { ...product, quantity: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });

    toast.success(`${product.name} added`);
  };

  return (
    <div className="relative border border-white/20 p-5 h-[350px]">
      {product.new && <span className="absolute top-6 right-5 text-[9px] font-bold text-gray-400">NEW</span>}
      <div>
        <h2 className="text-lg font-bold text-white">{product.brand}</h2>
        <p className="text-[10px] font-semibold text-gray-400">{product.name}</p>
      </div>
      <div className="h-40 flex items-center justify-center">
        <img src={product.image} alt={product.name} className="w-50 h-40 object-contain hover:scale-110 transition-transform duration-300" />
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] text-gray-400 uppercase">{product.category}</p>
          <p className={`text-[9px] mt-1 ${inStock ? "text-gray-300" : "text-red-400"}`}>{inStock ? `In Stock (${product.stock})` : "Out of Stock"}</p>
        </div>
        <p className="text-lg font-bold text-white">${product.price}</p>
      </div>
      <div className="flex gap-2 mt-4">
        <Link to={`/products/${product.id}`} className="flex-1 border border-white text-center bg-white text-black px-2 py-2 text-[10px] font-semibold rounded hover:bg-black hover:text-white transition">View Details</Link>
        <button onClick={addToCart} disabled={!inStock} className="flex-1 border border-white px-2 py-2 bg-black text-white text-[10px] font-semibold rounded hover:bg-white hover:text-black disabled:border-gray-600 disabled:text-gray-600 disabled:hover:bg-black transition">Add to Cart</button>
      </div>
    </div>
  );
}

export default Products;  