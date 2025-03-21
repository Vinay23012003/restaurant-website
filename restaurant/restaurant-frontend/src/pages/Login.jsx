import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/Index";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser(formData);

      // ✅ Store user data in localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.role);
      localStorage.setItem("name", response.name);

      // ✅ Trigger Navbar update
      window.dispatchEvent(new Event("storage"));

      // ✅ Redirect user
      navigate(response.role === "Admin" ? "/admin" : "/");
    } catch (error) {
      setError("❌ Invalid email or password.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="bg-gray-800 bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-md w-full border border-gray-700 transition-all transform hover:scale-105">
        
        {/* 🔹 Header */}
        <h2 className="text-4xl font-extrabold text-center text-cyan-400 drop-shadow-lg">
          Welcome Back 👋
        </h2>

        {/* 🔹 Error Message */}
        {error && (
          <p className="bg-red-500 text-white p-2 rounded-lg text-center mt-4">
            {error}
          </p>
        )}

        {/* 🔹 Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            name="email"
            placeholder="📧 Email"
            className="w-full p-3 bg-gray-700 text-white rounded-lg shadow-md focus:ring-2 focus:ring-cyan-400 placeholder-gray-400"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="🔑 Password"
            className="w-full p-3 bg-gray-700 text-white rounded-lg shadow-md focus:ring-2 focus:ring-cyan-400 placeholder-gray-400"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-cyan-500 text-gray-900 font-bold rounded-lg shadow-lg hover:bg-cyan-600 transition-all transform hover:scale-105"
          >
            🚀 Login
          </button>
        </form>

        {/* 🔹 Register Link */}
        <p className="text-center mt-6 text-gray-400">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-yellow-400 font-semibold hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
