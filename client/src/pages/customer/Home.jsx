import { Link } from "react-router-dom";
import categories from "../../data/categories";
import featuredProducts from "../../data/featuredProducts";
import { useState } from "react";

function Home() {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % categories.length);
  };

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? categories.length - 1 : prev - 1
    );
  };

  const current = categories[index];


  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
     <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center">
            {/* Left */}
            <div className="flex-1">
                <h1 className="text-md font-semibold text-gray-800">
                    BuySphere
                </h1>
            </div>

            {/* Center */}
            <div className="flex flex-1 justify-center gap-15 text-md">
                <Link to="/" 
                      className="px-4 py-2 rounded-[100px] text-black hover:text-white hover:bg-black transition duration-700"> Home</Link> 

                <Link to="/products" 
                      className="px-4 py-2 rounded-[100px] text-black hover:text-white hover:bg-black transition duration-700 ">Products</Link>

                <Link to="/cart" 
                      className="px-4 py-2 rounded-[100px] text-black hover:text-white hover:bg-black transition duration-700">Cart</Link>
            </div>

            <div className="flex-1"></div>

        </div>
     </nav>

      {/* Promotional Product */}
      <section className="relative h-150 overflow-hidden text-white text-center">

        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1562105962-2fbaaf107fe3?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="shoe"
          className="absolute top-1/2 left-1/2 w-500 h-300 object-cover opacity-70 transform -translate-x-1/2 -translate-y-1/2 " 
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/80"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-10 py-32 min-h-screen">
          <h2 className="text-5xl font-bold mb-5">
            Big Sale Up To 50% Off
          </h2>

          <p className="text-lg mb-8">
            Discover the latest products at the best prices.
          </p>

          <Link
            to="/products"
            className="bg-white text-black px-6 py-3 rounded-[100px] font-semibold hover:bg-black hover:text-white transition duration-400 "
          >
            Shop Now
          </Link>
        </div>

      </section>

      <div className="h-[10px] bg-black/75 w-full"></div>

      {/* Categories */}
      <section className="relative max-w-7xl h-150 mx-auto px-6 py-12 bg-black/80 text-white">
        <h1 className="text-4xl font-bold mb-8 text-left ml-16">
          Products
        </h1>

        {/* Buttons */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-100 text-white ml-2 grid place-items-center hover:bg-black/70 transition duration-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-100 text-white ml-2 grid place-items-center hover:bg-black/70 transition duration-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* CONTENT */}
        <div className="flex flex-col md:flex-row items-center gap-10 px-20 ">

          {/* LEFT TEXT */}
          <div className="flex-1">
            <h3 className="text-[90px] font-bold mb-4 mt-5">
              {categories[index].name}
            </h3>

            <p className="text-gray-300 ml-1 text-[20px]">
              Explore our {categories[index].name} collection.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex-1 flex justify-center md:justify-end mr-5">
            <img
              src={categories[index].image}
              alt={categories[index].name}
              className="w-[400px] h-[400px] object-cover rounded-xl shadow-lg"
            />
          </div>

        </div>
      </section>
      
      <div className="h-[10px] bg-black/75 w-full"></div>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-12 bg-black/80">
        <h2 className="text-3xl text-white font-bold mb-8">
          Featured Products
        </h2>

        <div className="flex gap-10 overflow-x-auto snap-x snap-mandatory">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
            >
              <img
                src={product.image}
                className="h-52 w-full object-cover"
              />

              {/* Content */}
              <div className="p-4 flex flex-col">
                <h3 className="text-xl font-bold mb-2 ">
                  {product.name}
                </h3>

                <p className="text-black/70 text-[15px] font-semibold mb-4">
                  ₱{product.price}
                </p>

                <Link
                  to={`/product`}
                  className="border w-50 mx-auto mt-auto text-center px-4 py-2 bg-white text-black rounded-lg font-semibold 
                  hover:bg-black hover:text-white transition duration-300"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="h-[10px] bg-black/75 w-full"></div>

      {/* Footer */}
      <footer className="bg-black/80 text-white py-8 text-center">
        <h2 className="text-xl font-bold mb-2">BuySphere</h2>
        <p className="text-gray-300 mb-2">support@buysphere.com</p>
        <p className="text-gray-300 mb-2">facebook.com/BuySphere</p>
        <p className="text-gray-300 mb-2">0918972980</p>
      </footer>

    </div>
  );
}

export default Home;