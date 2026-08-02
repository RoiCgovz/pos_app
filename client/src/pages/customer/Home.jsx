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
                    CubeShop
                </h1>
            </div>

            {/* Center */}
            <div className="flex flex-1 justify-center gap-20 text-sm text-gray-700">
                <Link to="/" className="hover:text-green-700">Home</Link>
                <Link to="/products" className="hover:text-green-700">Products</Link>
                <Link to="/cart" className="hover:text-green-700">Cart</Link>
            </div>

            {/* Right (empty for balance) */}
            <div className="flex-1"></div>

        </div>
     </nav>

      {/* Promotional Product */}
      <section className="bg-blue-400 rounded-md bg-clip-padding background-filter text-white px-6 py-70 text-center">
        <h2 className="text-5xl font-bold mb-5">
          Big Sale Up To 50% Off
        </h2>

        <p className="text-lg mb-8"> Discover the latest products at the best prices.</p>
        <Link to="/products" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold">
          Shop Now
        </Link>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6">
          Product Categories
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.name} className="bg-white rounded-xl shadow-lg shadow-black/60">
              <img
                src={category.image}
                className="w-full h-48 object-cover"
              />
              <h3 className="text-xl font-semibold p-4 text-center">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6">
          Featured Products
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow p-4">
              <img
                src={product.image}
                className="h-52 w-full object-cover rounded-lg"
              />

              <h3 className="text-xl font-bold mt-4">
                {product.name}
              </h3>

              <p className="text-green-600 font-semibold mt-2">
                ₱{product.price}
              </p>

              <Link
                to={`/product/${product.id}`}
                className="block mt-4 bg-blue-600 text-white text-center py-2 rounded-lg"
              >
                View Product
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center">
        <h2 className="text-xl font-bold">CubeShop</h2>
        <p className="text-gray-300">support@cubeshop.com</p>
      </footer>

    </div>
  );
}

export default Home;