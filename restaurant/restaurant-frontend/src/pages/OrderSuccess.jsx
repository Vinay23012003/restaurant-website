import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d]">
      {/* ✅ Glassmorphic Card */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-10 rounded-2xl shadow-xl text-center max-w-md transition-transform transform hover:scale-105 border border-white/20">
        <h2 className="text-4xl font-extrabold text-white drop-shadow-lg">
          🎉 Order Placed Successfully!
        </h2>
        <p className="mt-4 text-lg text-gray-200">
          Thank you for your order! You can track your order in the <span className="font-semibold text-yellow-300">"My Orders"</span> section.
        </p>

        {/* ✅ Buttons with Neon Effect */}
        <div className="mt-6 flex justify-center gap-4">
          <Link
            to="/orders"
            className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-110 hover:bg-blue-700 hover:shadow-blue-500/50"
          >
            📦 View My Orders
          </Link>
          <Link
            to="/menu"
            className="px-6 py-3 bg-purple-600 text-white text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-110 hover:bg-purple-700 hover:shadow-purple-500/50"
          >
            🛒 Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
