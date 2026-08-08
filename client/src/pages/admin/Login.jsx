import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import bgImage from "../../assets/bg-1.jpg"; // change path if needed

function AdminLogin({ setIsAdmin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const ADMIN_EMAIL = "admin@buysphere.com";
  const ADMIN_PASSWORD = "admin123";

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      toast.success("Login successful");
      navigate("/admin/dashboard");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white">

      {/* Background Image */}
      <img src={bgImage} alt="background" className="absolute inset-0 w-full h-full object-cover opacity-70"/>
      
      <div className="absolute inset-0 bg-black/90"></div>

      {/* Login Box */}
      <div className="relative w-full max-w-md border border-white/20 p-8 rounded-lg bg-black/70 backdrop-blur-sm">
        <h1 className="text-2xl font-bold mb-6 text-center tracking-wide">
          BuySphere Admin
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Admin Email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10 px-4 bg-black text-white border border-white/30 rounded outline-none focus:border-white transition"
          />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full h-10 px-4 bg-black text-white border border-white/30 rounded outline-none focus:border-white transition"
          />
          <button type="submit" className="w-full py-2 bg-white text-black font-semibold rounded hover:bg-black hover:text-white border border-white transition">
            Login
          </button>
        </form>
        <p className="text-xs text-gray-300 mt-6 text-center">
          Use: admin@buysphere.com / admin123
        </p>
        <Link to="/admin/register" className="block text-xs text-gray-300 text-center mt-6 underline hover:text-white" >
          Not yet registered? REGISTER HERE
        </Link>
      </div>

    </div>
  );
}

export default AdminLogin;