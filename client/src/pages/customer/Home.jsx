import { Link } from "react-router-dom";
import categories from "../../data/categories";
import featuredProducts from "../../data/featuredProducts";
import { useState, useEffect } from "react";

function Home() {
  const [index, setIndex] = useState(() => {
    const saved = localStorage.getItem("categoryIndex");
    return saved ? JSON.parse(saved) : 0;
  });

  const next = () => setIndex((prev) => (prev + 1) % categories.length);
  const prev = () =>
    setIndex((prev) => (prev === 0 ? categories.length - 1 : prev - 1));

  useEffect(() => {
    localStorage.setItem("categoryIndex", JSON.stringify(index));
  }, [index]);

  return (
    <div class="max-w-7xl mx-auto">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center gap-3 md:gap-0">
          
          <div className="w-full md:flex-1 text-center md:text-left">
            <Link to="/" className="text-md font-bold text-gray-800">
              BuySphere
            </Link>
          </div>

          <div className="flex gap-4 text-sm md:text-md">
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

          <div className="w-full md:flex-1 flex justify-center md:justify-end">
            <Link to="/admin/login" className="px-3 py-1 rounded-full hover:bg-black hover:text-white transition">
              Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-[400px] md:h-[550px] text-white">
        <img
          src="https://images.unsplash.com/photo-1562105962-2fbaaf107fe3?q=80&w=2048&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-xs tracking-[3px] text-gray-300 mb-3">
            BuySphere Collection
          </p>

          <h2 className="text-3xl md:text-6xl font-bold mb-4">
            Big Sale Up To 50% Off
          </h2>

          <p className="text-sm md:text-lg text-gray-300 mb-6 max-w-md">
            Discover the latest products at the best prices.
          </p>

          <Link
            to="/products"
            className="bg-white text-black px-6 py-2 md:px-8 md:py-3 rounded-full font-semibold hover:bg-black hover:text-white border transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-black text-white py-10 px-4 md:px-6">
        <div className="max-w-7xl mx-auto relative">

          <div className="flex justify-between mb-6">
            <h2 className="text-2xl md:text-4xl font-bold">
              Products
            </h2>
            <span className="text-gray-400 text-sm">
              {index + 1}/{categories.length}
            </span>
          </div>

          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute left-0 md:left-[-40px] top-1/2 -translate-y-1/2 p-2"
          >
           <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} > 
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /> 
            </svg>
          </button>

          <button
            onClick={next}
            className="absolute right-0 md:right-[-40px] top-1/2 -translate-y-1/2 p-2"
          >
           <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} > <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /> </svg>
          </button>

          {/* Content */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            
            <div className="text-center md:text-left flex-1">
              <h3 className="text-3xl md:text-6xl font-bold mb-4">
                {categories[index].name}
              </h3>

              <p className="text-gray-400 text-sm md:text-lg">
                Explore our {categories[index].name} collection.
              </p>

              <Link
                to="/products"
                className="inline-block mt-5 border px-5 py-2 rounded-full text-sm hover:bg-white hover:text-black transition"
              >
                Explore
              </Link>
            </div>

            <div className="flex justify-center flex-1">
              <img
                src={categories[index].image}
                className="w-[220px] h-[220px] md:w-[360px] md:h-[360px] object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="bg-black px-4 py-10">
        <div className="max-w-7xl mx-auto">

          <h2 className="text-white text-2xl md:text-4xl font-bold mb-6">
            Featured Products
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-3 no-scrollbar">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="min-w-[240px] md:min-w-[300px] bg-white rounded-xl"
              >
                <img
                  src={product.image}
                  className="h-40 md:h-52 w-full object-cover"
                />

                <div className="p-4">
                  <h3 className="font-bold text-sm md:text-lg">
                    {product.name}
                  </h3>

                  <p className="text-sm mb-3">${product.price}</p>

                  <Link
                    to="/product"
                    className="block text-center bg-black text-white py-2 rounded"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-8 text-sm">
        <h2 className="font-bold mb-2">BuySphere</h2>
        <p className="text-gray-400">support@buysphere.com</p>
        <p className="text-gray-400">facebook.com/BuySphere</p>
        <p className="text-gray-400">0918972980</p>
      </footer>
    </div>
  );
}

export default Home;