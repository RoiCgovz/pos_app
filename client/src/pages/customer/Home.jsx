import { Link } from "react-router-dom";
import categories from "../../data/categories";
import featuredProducts from "../../data/featuredProducts";

function Home() {
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
                      className="px-4 py-2 rounded-[100px] text-black hover:text-white hover:bg-black transition"> Home</Link> 

                <Link to="/products" 
                      className="px-4 py-2 rounded-[100px] text-black hover:text-white hover:bg-black transition">Products</Link>

                <Link to="/cart" 
                      className="px-4 py-2 rounded-[100px] text-black hover:text-white hover:bg-black transition">Cart</Link>
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
            className="bg-white text-black px-6 py-3 rounded-[100px] font-semibold hover:bg-black hover:text-white transition "
          >
            Shop Now
          </Link>
        </div>

      </section>

      <div className="h-[10px] bg-black/75 w-full"></div>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-12 bg-black/80">
        <h2 className="text-3xl font-bold mb-6 text-white">
          Product Categories
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.name} className="bg-white rounded-xl shadow-lg shadow-black/60 hover:bg-black transition hover:text-white transition">
              <img
                src={category.image}
                className="w-full h-48 object-cover"
              />
              <h3 className="text-xl font-semibold p-4 text-center hover:text-white transition">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </section>
      
      <div className="h-[10px] bg-black/75 w-full"></div>

      <section className="max-w-7xl mx-auto px-6 py-12 bg-black/80">
        <h2 className="text-3xl text-white font-bold mb-8">
          Featured Products
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
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