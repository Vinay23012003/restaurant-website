import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/Index";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await registerUser(formData);
      setSuccess("🎉 Registration successful! Redirecting...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError(
        error.response?.status === 400
          ? "⚠️ User already exists. Try logging in."
          : "❌ Registration failed. Try again."
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="bg-gray-800 bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-md w-full border border-gray-700 transition-all transform hover:scale-105">
        
        {/* 🔹 Header */}
        <h2 className="text-4xl font-extrabold text-center text-cyan-400 drop-shadow-lg">
          Create an Account 🚀
        </h2>

        {/* ✅ Success Message */}
        {success && (
          <p className="bg-green-500 text-white p-2 rounded-lg text-center mt-4">
            {success}
          </p>
        )}

        {/* ❌ Error Message */}
        {error && (
          <p className="bg-red-500 text-white p-2 rounded-lg text-center mt-4">
            {error}
          </p>
        )}

        {/* 🔹 Registration Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            name="name"
            placeholder="👤 Full Name"
            className="w-full p-3 bg-gray-700 text-white rounded-lg shadow-md focus:ring-2 focus:ring-cyan-400 placeholder-gray-400"
            onChange={handleChange}
            required
          />
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
            ✅ Register
          </button>
        </form>

        {/* 🔹 Login Link */}
        <p className="text-center mt-6 text-gray-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-yellow-400 font-semibold hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
