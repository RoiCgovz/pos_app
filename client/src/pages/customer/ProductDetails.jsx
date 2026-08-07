import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import products from "../../data/products";

function ProductDetails({ setCart }) {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const [quantity, setQuantity] = useState(1);

  if (!product) return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <Link to="/products" className="inline-block bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-black hover:text-white border border-white transition">Back to Products</Link>
      </div>
    </div>
  );

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);
  const increase = () => quantity < product.stock && setQuantity(quantity + 1);
  const decrease = () => quantity > 1 && setQuantity(quantity - 1);

  const addToCart = () => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) return prevCart.map(item => item.id === product.id ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) } : item);
      return [...prevCart, { ...product, quantity }];
    });
    
    toast.success(`${product.name} x${quantity} added to cart`);
  };

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center">
          <div className="flex-1">
            <Link to="/" className="text-md font-semibold text-gray-800">BuySphere</Link>
          </div>
          <div className="flex flex-1 justify-center gap-15 text-md">
            <Link to="/" className="px-4 py-2 rounded-full text-black hover:text-white hover:bg-black transition duration-500">Home</Link>
            <Link to="/products" className="px-4 py-2 rounded-full text-black hover:text-white hover:bg-black transition duration-500">Products</Link>
            <Link to="/cart" className="px-4 py-2 rounded-full text-black hover:text-white hover:bg-black transition duration-500">Cart</Link>
          </div>
          <div className="flex-1" />
        </div>
      </nav>

      <main className="min-h-screen bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <Link to="/products" className="text-sm text-gray-400 hover:text-white transition">← Back to Products</Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-10">
            <div className="h-[500px] bg-white rounded-2xl flex items-center justify-center overflow-hidden">
              <img src={product.image} alt={product.name} className="w-[450px] h-[450px] object-contain hover:scale-105 transition duration-500" />
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-sm text-gray-400 uppercase tracking-[4px] mb-3">{product.category}</p>
              <h1 className="text-5xl font-bold mb-3">{product.name}</h1>
              <p className="text-gray-400 mb-6">{product.brand}</p>
              <p className="text-3xl font-bold mb-6">${product.price}</p>
              <p className="text-gray-400 leading-7 max-w-lg mb-8">Experience quality and style with the {product.name}. Designed for everyday use, this product combines comfort, functionality, and modern design.</p>

              <div className="mb-6">
                <p className="text-sm text-gray-400">Available Stock</p>
                <p className={`font-semibold mt-1 ${product.stock > 0 ? "text-gray-200" : "text-red-400"}`}>
                  {product.stock > 0 ? `${product.stock} available` : "Out of Stock"}
                </p>
              </div>

              {product.stock > 0 && (
                <div className="mb-8">
                  <p className="text-sm text-gray-400 mb-2">Quantity</p>
                  <div className="flex items-center w-fit border border-white/30 rounded-lg">
                    <button onClick={decrease} className="w-10 h-10 hover:bg-white hover:text-black transition">−</button>
                    <span className="w-12 text-center">{quantity}</span>
                    <button onClick={increase} className="w-10 h-10 hover:bg-white hover:text-black transition">+</button>
                  </div>
                </div>
              )}

              <button onClick={addToCart} disabled={!product.stock} className="w-full md:w-80 bg-white text-black py-3 rounded-full font-semibold border border-white hover:bg-black hover:text-white disabled:bg-gray-700 disabled:text-gray-400 disabled:border-gray-700 transition">
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>

          <section className="mt-24">
            <div className="mb-8">
              <p className="text-xs tracking-[4px] uppercase text-gray-400">You May Also Like</p>
              <h2 className="text-4xl font-bold mt-2">Related Products</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(related => (
                <Link key={related.id} to={`/products/${related.id}`} className="bg-white text-black rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300">
                  <div className="h-60 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img src={related.image} alt={related.name} className="w-full h-full object-contain hover:scale-105 transition duration-500" />
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-gray-500 uppercase">{related.brand}</p>
                    <h3 className="text-lg font-bold mt-1">{related.name}</h3>
                    <p className="font-semibold mt-3">${related.price}</p>
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