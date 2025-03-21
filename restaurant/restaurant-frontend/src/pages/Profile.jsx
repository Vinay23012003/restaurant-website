import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error(err);
        setError("⚠️ Failed to load profile.");
      });
  }, [token, navigate]);

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#141e30] to-[#243b55]">
        <p className="text-red-500 text-xl font-semibold">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#141e30] to-[#243b55]">
      {/* ✅ Glassmorphism Card */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-2xl shadow-xl text-center max-w-md border border-white/20 transition-transform transform hover:scale-105">
        <h2 className="text-3xl font-extrabold text-white drop-shadow-lg">
          👤 Profile
        </h2>

        {/* ✅ Skeleton Loader (Shimmer Effect) */}
        {!user ? (
          <div className="mt-6 animate-pulse space-y-4">
            <div className="h-6 bg-gray-300 bg-opacity-50 rounded w-3/4 mx-auto"></div>
            <div className="h-6 bg-gray-300 bg-opacity-50 rounded w-2/3 mx-auto"></div>
            <div className="h-6 bg-gray-300 bg-opacity-50 rounded w-1/2 mx-auto"></div>
          </div>
        ) : (
          <>
            <p className="mt-6 text-lg text-gray-200">
              <span className="font-bold text-yellow-400">👤 Name:</span> {user.name}
            </p>
            <p className="text-lg text-gray-200">
              <span className="font-bold text-blue-400">📧 Email:</span> {user.email}
            </p>
            <p className="text-lg text-gray-200">
              <span className="font-bold text-green-400">🔑 Role:</span> {user.role}
            </p>
          </>
        )}

        {/* ✅ Logout Button */}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="mt-6 px-6 py-3 bg-red-600 text-white text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-110 hover:bg-red-700 hover:shadow-red-500/50"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
