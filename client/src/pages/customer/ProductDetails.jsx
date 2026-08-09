import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function ProductDetails({ setCart }) {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  /* Load products */
  useEffect(() => {
    const loadProducts = () => {
      try {
        const saved = localStorage.getItem("products");
        setProducts(saved ? JSON.parse(saved) : []);
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

  const product = products.find(
    p => p.id === Number(id) && p.active !== false
  );

  /* NOT FOUND */
  if (!product) {
    return (
      <>
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center">
            <div className="w-full md:flex-1 text-center md:text-left">
              <Link to="/" className="text-md font-bold text-gray-800">
                BuySphere
              </Link>
            </div>

            <div className="flex gap-4 text-sm justify-center">
              <Link to="/" className="px-3 py-1 rounded-full hover:bg-black hover:text-white transition">
                Home
              </Link>
              <Link to="/products" className="px-3 py-1 rounded-full hover:bg-black hover:text-white transition">
                Products
              </Link>
              <Link to="/cart" className="px-3 py-1 rounded-full hover:bg-black hover:text-white transition ">
                Cart
              </Link>
            </div>

            <div className="w-full md:flex-1 flex justify-center md:justify-end">
              <Link to="/admin/login" className="px-3 py-1 rounded-full hover:bg-black hover:text-white">
                Admin
              </Link>
            </div>
          </div>
        </nav>

        <div className="min-h-screen bg-black text-white flex items-center justify-center text-center px-4">
          <div>
            <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
            <Link
              to="/products"
              className="inline-block bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-black hover:text-white border border-white transition"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </>
    );
  }

  const relatedProducts = products
    .filter(
      p =>
        p.active !== false &&
        p.category === product.category &&
        p.id !== product.id
    )
    .slice(0, 3);

  const increase = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const addToCart = () => {
    if (product.stock <= 0) return;

    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);

      let updated;

      if (existing) {
        updated = prev.map(i =>
          i.id === product.id
            ? {
                ...i,
                quantity: Math.min(i.quantity + quantity, product.stock)
              }
            : i
        );
      } else {
        updated = [...prev, { ...product, quantity }];
      }

      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });

    toast.success(`${product.name} x${quantity} added`);
  };

  return (
    <>
      {/* NAVBAR (same as Home & Products) */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center">

          <div className="w-full md:flex-1 text-center md:text-left">
            <Link to="/" className="text-md font-bold text-gray-800">
              BuySphere
            </Link>
          </div>

          <div className="flex gap-4 text-sm md:text-md justify-center">
            <Link to="/" className="px-3 py-1 rounded-full hover:bg-black hover:text-white">
              Home
            </Link>
            <Link to="/products" className="px-3 py-1 rounded-full hover:bg-black hover:text-white">
              Products
            </Link>
            <Link to="/cart" className="px-3 py-1 rounded-full hover:bg-black hover:text-white">
              Cart
            </Link>
          </div>

          <div className="w-full md:flex-1 flex justify-center md:justify-end">
            <Link to="/admin/login" className="px-3 py-1 rounded-full hover:bg-black hover:text-white">
              Admin
            </Link>
          </div>

        </div>
      </nav>

      {/* PAGE */}
      <main className="min-h-screen bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">

          <Link to="/products" className="text-sm text-gray-400 hover:text-white">
            ← Back to Products
          </Link>

          {/* PRODUCT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">

            <div className="bg-white rounded-xl flex items-center h-100 w-100 ml-10 justify-center p-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-[300px] object-contain hover:scale-105 transition"
              />
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-xs text-gray-400 uppercase tracking-[3px]">
                {product.category}
              </p>

              <h1 className="text-3xl md:text-5xl font-bold mt-2">
                {product.name}
              </h1>

              <p className="text-gray-400 mt-2">{product.brand}</p>

              <p className="text-2xl md:text-3xl font-bold mt-6">
                ${product.price}
              </p>

              <p className="text-gray-400 mt-6 max-w-lg">
                Experience quality and style with the {product.name}.
              </p>

              {/* STOCK */}
              <p className={`mt-4 ${product.stock > 0 ? "text-gray-300" : "text-red-400"}`}>
                {product.stock > 0
                  ? `${product.stock} available`
                  : "Out of Stock"}
              </p>

              {/* QUANTITY */}
              {product.stock > 0 && (
                <div className="flex items-center mt-4 border w-fit">
                  <button onClick={decrease} className="px-4 py-2">-</button>
                  <span className="px-4">{quantity}</span>
                  <button onClick={increase} className="px-4 py-2">+</button>
                </div>
              )}

              <button
                onClick={addToCart}
                disabled={!product.stock}
                className="mt-6 w-full md:w-72 bg-white text-black py-3 rounded-full font-semibold hover:bg-black hover:text-white border transition"
              >
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>

          {/* RELATED */}
          <section className="mt-20">
            <h2 className="text-2xl md:text-4xl font-bold mb-6">
              Related Products
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(r => (
                <Link
                  key={r.id}
                  to={`/products/${r.id}`}
                  className="bg-white text-black rounded-xl overflow-hidden"
                >
                  <img src={r.image} className="h-48 w-full object-contain" />
                  <div className="p-4">
                    <p className="text-xs text-gray-500">{r.brand}</p>
                    <h3 className="font-bold">{r.name}</h3>
                    <p className="mt-2">${r.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </main>
    </>
  );
}

export default ProductDetails;