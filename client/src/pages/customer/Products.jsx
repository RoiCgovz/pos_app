import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Products({ setCart }) {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState(
    () => localStorage.getItem("search") || ""
  );

  const [category, setCategory] = useState(
    () => localStorage.getItem("category") || "All"
  );

  const [sort, setSort] = useState(
    () => localStorage.getItem("sort") || "default"
  );

  const [brand, setBrand] = useState(
    () => localStorage.getItem("brand") || "All"
  );

  // Load products from localStorage
  useEffect(() => {
    const loadProducts = () => {
      try {
        const saved = localStorage.getItem("products");

        if (saved) {
          setProducts(JSON.parse(saved));
        } else {
          setProducts([]);
        }
      } catch {
        setProducts([]);
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

  // Save search/filter settings
  useEffect(() => {
    localStorage.setItem("search", search);
    localStorage.setItem("category", category);
    localStorage.setItem("sort", sort);
    localStorage.setItem("brand", brand);
  }, [search, category, sort, brand]);

  const brands = [
    "All",
    ...new Set(products.map(p => p.brand))
  ];

  const categories = [
    "All",
    ...new Set(products.map(p => p.category))
  ];

  let filteredProducts = products
    .filter(p => p.active !== false)
    .filter(
      p =>
        (
          p.brand
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          p.name
            .toLowerCase()
            .includes(search.toLowerCase())
        ) &&
        (category === "All" || p.category === category) &&
        (brand === "All" || p.brand === brand)
    );

  if (sort === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center">
          <div className="flex-1">
            <Link
              to="/"
              className="text-md font-semibold text-gray-800"
            >
              BuySphere
            </Link>
          </div>

          <div className="flex flex-1 justify-center gap-15 text-md">
            <Link
              to="/"
              className="px-4 py-2 rounded-full text-black hover:text-white hover:bg-black transition duration-500"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="px-4 py-2 rounded-full text-black hover:text-white hover:bg-black transition duration-500"
            >
              Products
            </Link>

            <Link
              to="/cart"
              className="px-4 py-2 rounded-full text-black hover:text-white hover:bg-black transition duration-500"
            >
              Cart
            </Link>
          </div>

          <div className="flex-1" />
        </div>
      </nav>

      <div className="min-h-screen bg-black text-white">
        <div className="h-28 flex items-center justify-end border-b border-white/20">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-100 h-10 mr-10 pl-4 pr-10 text-black text-md rounded-full outline-none bg-white focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 max-w-7xl mx-auto">
          <aside className="border-r border-white/20">
            <div className="p-7 border-b border-white/20">
              <h2 className="text-xs text-gray-400 font-bold mb-3 tracking-widest">
                SORT
              </h2>

              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="w-full h-9 px-3 bg-black text-white text-sm border border-white/30 rounded outline-none hover:border-white transition"
              >
                <option value="default">
                  What's new
                </option>

                <option value="low">
                  Price: Low to High
                </option>

                <option value="high">
                  Price: High to Low
                </option>
              </select>
            </div>

            <div className="p-7">
              <h2 className="text-xs text-gray-400 font-bold mb-4 tracking-widest">
                FILTER
              </h2>

              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full h-9 mb-3 px-3 bg-black text-white border border-white/30 rounded outline-none hover:border-white transition"
              >
                {categories.map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <select
                value={brand}
                onChange={e => setBrand(e.target.value)}
                className="w-full h-9 px-3 bg-black text-white border border-white/30 rounded outline-none hover:border-white transition"
              >
                {brands.map(b => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>
          </aside>

          <main className="col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
    </>
  );
}

function ProductCard({ product, setCart }) {
  const inStock = product.stock > 0;

  const addToCart = () => {
    if (!inStock) return;

    setCart(prevCart => {
      const existing = prevCart.find(
        item => item.id === product.id
      );

      let updatedCart;

      if (existing) {
        updatedCart = prevCart.map(item =>
          item.id === product.id
            ? {
                ...item,
                ...product,
                quantity: Math.min(
                  item.quantity + 1,
                  product.stock
                )
              }
            : item
        );
      } else {
        updatedCart = [
          ...prevCart,
          {
            ...product,
            quantity: 1
          }
        ];
      }

      localStorage.setItem(
        "cart",
        JSON.stringify(updatedCart)
      );

      return updatedCart;
    });

    toast.success(
      `${product.name} added to cart`
    );
  };

   return (
    <div className="relative border border-white/20 p-5">
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