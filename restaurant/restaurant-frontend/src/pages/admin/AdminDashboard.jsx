import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="w-full max-w-3xl bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/10">
        <h2 className="text-4xl font-extrabold text-center text-gray-200 drop-shadow-md mb-8">
          🚀 Admin Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Manage Orders */}
          <Link
            to="/admin/orders"
            className="p-6 bg-blue-500 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105 flex items-center justify-center"
          >
            📦 Manage Orders
          </Link>

          {/* Manage Menu */}
          <Link
            to="/admin/menu"
            className="p-6 bg-green-500 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-green-600 transition-all transform hover:scale-105 flex items-center justify-center"
          >
            🍽️ Manage Menu
          </Link>

          {/* Manage Contact */}
          <Link
            to="/admin/contact"
            className="p-6 bg-purple-500 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-purple-700 transition-all transform hover:scale-105 flex items-center justify-center"
          >
            🍽️ Manage Contact
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
