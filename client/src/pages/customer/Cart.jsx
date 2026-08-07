import { Link } from "react-router-dom";

function Cart({ cart, setCart }) {
  const increase = id => setCart(cart.map(item =>
    item.id === id && item.quantity < item.stock
      ? { ...item, quantity: item.quantity + 1 }
      : item
  ));

  const decrease = id => setCart(cart.map(item =>
    item.id === id && item.quantity > 1
      ? { ...item, quantity: item.quantity - 1 }
      : item
  ));

  const remove = id => setCart(cart.filter(item => item.id !== id));
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal * 0.02; 
  const total = subtotal + shipping;

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
        <div className="max-w-7xl mx-auto px-6 py-14">
          <p className="text-xs tracking-[4px] uppercase text-gray-400">Your Selection</p>
          <h1 className="text-5xl font-bold mt-2 mb-10">Shopping Cart</h1>

          {cart.length === 0 ? (
            <div className="border border-white/20 py-24 text-center">
              <h2 className="text-2xl font-bold mb-3">Your cart is empty</h2>
              <p className="text-gray-400 mb-7">Add some products to get started.</p>
              <Link to="/products" className="bg-white text-black px-7 py-3 rounded-full font-semibold hover:bg-black hover:text-white border border-white transition">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 border border-white/20">
                {cart.map(item => (
                  <div key={item.id} className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-6 p-6 border-b border-white/20">
                    <div className="h-40 bg-white rounded-xl flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="w-32 h-32 object-contain" />
                    </div>

                    <div className="flex flex-col justify-between">
                      <div>
                        <p className="text-xs text-gray-400 uppercase">{item.brand}</p>
                        <h2 className="text-xl font-bold mt-1">{item.name}</h2>
                        <p className="text-gray-400 text-sm mt-2">{item.category}</p>
                        <p className="text-lg font-bold mt-3">${item.price}</p>
                      </div>

                      <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center border border-white/30 rounded-lg">
                          <button onClick={() => decrease(item.id)} className="w-9 h-9 hover:bg-white hover:text-black transition">−</button>
                          <span className="w-10 text-center">{item.quantity}</span>
                          <button onClick={() => increase(item.id)} className="w-9 h-9 hover:bg-white hover:text-black transition">+</button>
                        </div>

                        <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>

                        <button onClick={() => remove(item.id)} className="text-sm text-gray-400 hover:text-red-400 transition">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

             <aside className="h-fit border border-white/20 p-7">
                <p className="text-xs tracking-[4px] uppercase text-gray-400">Summary</p>
                <h2 className="text-2xl font-bold mt-2 mb-8">Order Summary</h2>

                <div className="flex justify-between text-sm mb-4">
                    <span className="text-gray-400">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm mb-6">
                    <span className="text-gray-400">Shipping </span>
                    <span>${shipping.toFixed(2)}</span>
                </div>

                <div className="border-t border-white/20 pt-5 flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="text-2xl font-bold">${total.toFixed(2)}</span>
                </div>

                <Link
                    to="/checkout"
                    className="block text-center w-full mt-8 bg-white text-black py-3 rounded-full font-semibold hover:bg-black hover:text-white border border-white transition"
                >
                    Proceed to Checkout
                </Link>
              </aside>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Cart;