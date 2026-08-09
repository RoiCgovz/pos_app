import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import bgImage from "../../assets/bg-1.jpg";

function AdminLogin({ setIsAdmin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Enter email and password");
      return;
    }

    // Get admins from localStorage
    const savedAdmins = localStorage.getItem("admins");
    const admins = savedAdmins ? JSON.parse(savedAdmins) : [];

    // Find matching admin
    const found = admins.find(
      admin =>
        admin.email === email &&
        admin.password === password
    );

    if (!found) {
      toast.error("Invalid credentials");
      return;
    }

    // Save logged-in session
    localStorage.setItem("admin", JSON.stringify(found));

    setIsAdmin(true);
    toast.success("Login successful");
    navigate("/admin/dashboard");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white">

      {/* Background */}
      <img
        src={bgImage}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-black/90"></div>

      {/* Login Box */}
      <div className="relative w-full max-w-md border border-white/20 p-8 rounded-lg bg-black/70 backdrop-blur-sm">
        <h1 className="text-2xl font-bold mb-6 text-center tracking-wide">
          BuySphere Admin
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10 px-4 bg-black text-white border border-white/30 rounded outline-none focus:border-white transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-10 px-4 bg-black text-white border border-white/30 rounded outline-none focus:border-white transition"
          />

          <button
            type="submit"
            className="w-full py-2 bg-white text-black font-semibold rounded hover:bg-black hover:text-white border border-white transition"
          >
            Login
          </button>
        </form>

        <p className="text-[10px] text-gray-300 mt-6 text-center">
          Use your registered admin account
        </p>

        <Link
          to="/admin/register"
          className="block text-xs text-gray-300 text-center mt-6 underline hover:text-white"
        >
          Not yet registered? REGISTER HERE
        </Link>
      </div>
    </div>
  );
}

export default AdminLogin;