import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import bgImage from "../../assets/bg-1.jpg"; // same background as login

function AdminRegister({ setIsAdmin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirm) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    toast.success("Registered successfully");
    setIsAdmin(true);
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

      {/* Register Card */}
      <div className="relative w-full max-w-md border border-white/20 p-8 rounded-lg bg-black/70 backdrop-blur-sm">

        <h1 className="text-2xl font-bold mb-6 text-center tracking-wide">
          BuySphere Register
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-10 px-4 bg-black text-white border border-white/30 rounded outline-none focus:border-white transition"
          />

          <input
            type="email"
            placeholder="Email"
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

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full h-10 px-4 bg-black text-white border border-white/30 rounded outline-none focus:border-white transition"
          />

          <button
            type="submit"
            className="w-full py-2 bg-white text-black font-semibold rounded hover:bg-black hover:text-white border border-white transition"
          >
            Register
          </button>

        </form>

        {/* Link to login */}
        <p className="text-xs text-gray-300 mt-6 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/admin/login")}
            className="underline cursor-pointer hover:text-white"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default AdminRegister;