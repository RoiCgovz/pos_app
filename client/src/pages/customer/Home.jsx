import { Link } from "react-router-dom";
import categories from "../../data/categories";
import featuredProducts from "../../data/featuredProducts";
import { useState } from "react";

function Home() {
  const [index, setIndex] = useState(0);
  const next = () => { setIndex((prev) => (prev + 1) % categories.length);
  };
  const prev = () => { setIndex((prev) => prev === 0 ? categories.length - 1 : prev - 1);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center">
          <div className="flex-1">
            <Link to="/" className="text-md font-bold text-gray-800">
              BuySphere
            </Link>
          </div>

          <div className="flex flex-1 justify-center gap-15 text-md">
            <Link to="/" className="px-4 py-2 rounded-full text-black hover:text-white hover:bg-black transition duration-500">
              Home
            </Link>
            <Link to="/products" className="px-4 py-2 rounded-full text-black hover:text-white hover:bg-black transition duration-500">
              Products
            </Link>
            <Link to="/cart" className="px-4 py-2 rounded-full text-black hover:text-white hover:bg-black transition duration-500">
              Cart
            </Link>
          </div>

          <div className="flex-1" />
        </div>
      </nav>

      {/* Promotional Product */}
      <section className="relative h-[550px] overflow-hidden text-white">
        <img src="https://images.unsplash.com/photo-1562105962-2fbaaf107fe3?q=80&w=2048&auto=format&fit=crop" alt="Featured shoe" className="absolute inset-0 w-full h-full object-cover opacity-60"/>

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="text-sm tracking-[5px] uppercase text-gray-300 mb-4">
            BuySphere Collection
          </p>

          <h2 className="text-5xl md:text-6xl font-bold mb-5">
            Big Sale Up To 50% Off
          </h2>

          <p className="text-lg text-gray-300 mb-8 max-w-xl">
            Discover the latest products at the best prices.
          </p>

          <Link
            to="/products"
            className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-black hover:text-white border border-white transition duration-300"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <div className="h-2 bg-black/80" />

      {/* Categories */}
      <section className="relative max-w-7xl h-[550px] mx-auto px-6 py-12 bg-black text-white overflow-hidden">
        <div className="flex items-center justify-between px-10">
          <div>
            <p className="text-xs tracking-[4px] uppercase text-gray-400">
              Explore
            </p>
            <h2 className="text-4xl font-bold mt-2">
              Products
            </h2>
          </div>

          <div className="text-sm text-gray-400">
            {index + 1} / {categories.length}
          </div>
        </div>

        {/* Previous */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-24 grid place-items-center text-white hover:bg-white/10 rounded-full transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Next */}
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-24 grid place-items-center text-white hover:bg-white/10 rounded-full transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="h-[400px] flex flex-col md:flex-row items-center gap-12 px-16">
          
          {/* Text */}
          <div className="flex-1">
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-3">
              Collection
            </p>

            <h3 className="text-6xl md:text-7xl font-bold mb-5">
              {categories[index].name}
            </h3>

            <p className="text-gray-400 text-lg max-w-md">
              Explore our {categories[index].name} collection and discover
              products made for your style.
            </p>

            <Link
              to="/products"
              className="inline-block mt-7 border border-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-black transition"
            >
              Explore Collection
            </Link>
          </div>

          {/* Image */}
          <div className="flex-1 flex justify-center">
            <img
              src={categories[index].image}
              alt={categories[index].name}
              className="w-[360px] h-[360px] object-cover rounded-2xl shadow-2xl hover:scale-105 transition duration-500"
            />
          </div>
        </div>
      </section>

      <div className="h-2 bg-black/80" />

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-14 bg-black">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs tracking-[4px] uppercase text-gray-400">
              Our Picks
            </p>

            <h2 className="text-4xl text-white font-bold mt-2">
              Featured Products
            </h2>
          </div>

          <Link
            to="/products"
            className="hidden md:block text-sm text-gray-400 hover:text-white transition"
          >
            View All →
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="min-w-[280px] md:min-w-[300px] bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden snap-start"
            >
              <div className="h-52 bg-gray-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold mb-2">
                  {product.name}
                </h3>

                <p className="text-black/60 text-sm font-semibold mb-5">
                  ${product.price}
                </p>

                <Link
                  to={`/product`}
                  className="block w-full text-center border border-black px-4 py-2 rounded-lg bg-black text-white font-semibold hover:bg-white hover:text-black transition duration-300"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="h-2 bg-black/80" />

      {/* Footer */}
      <footer className="bg-black text-white py-10 text-center">
        <h2 className="text-xl font-bold mb-3">
          BuySphere
        </h2>

        <p className="text-gray-400 text-sm mb-1">
          support@buysphere.com
        </p>

        <p className="text-gray-400 text-sm mb-1">
          facebook.com/BuySphere
        </p>

        <p className="text-gray-400 text-sm">
          0918972980
        </p>
      </footer>
    </>
  );
}

export default Home;