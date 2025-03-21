import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect, useRef } from "react";

function Navbar() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // For mobile menu
  const [dropdownOpen, setDropdownOpen] = useState(false); // For user menu

  const dropdownRef = useRef(null); // Ref for clicking outside

  // ✅ Fetch user from localStorage
  useEffect(() => {
    const fetchUser = () => {
      const userToken = localStorage.getItem("token");
      const userName = localStorage.getItem("name");
      const userRole = localStorage.getItem("role");

      if (userToken) {
        setUser({ name: userName, role: userRole });
      } else {
        setUser(null);
      }
    };

    fetchUser();
    window.addEventListener("storage", fetchUser);
    return () => window.removeEventListener("storage", fetchUser);
  }, []);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("role");

    setUser(null);
    navigate("/login");

    // ✅ Force update Navbar
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <nav className="relative bg-gradient-to-r from-purple-900 via-gray-900 to-cyan-900 text-white p-4 flex justify-between items-center shadow-xl backdrop-blur-lg z-40">
      
      {/* Left Side - Logo */}
      <div className="text-4xl font-extrabold tracking-wide">
        <Link to="/" className="hover:text-cyan-300 transition-all">
          🍽️ Restaurant
        </Link>
      </div>

      {/* Center Links (Hidden on Mobile) */}
      <div className="hidden md:flex space-x-6 text-2xl">
        <Link to="/" className="hover:text-cyan-300 transition-all duration-300">🏠 Home</Link>
        <Link to="/menu" className="hover:text-cyan-300 transition-all duration-300">🍜 Menu</Link>
        <Link to="/about" className="hover:text-cyan-300 transition-all duration-300">📖 About</Link>
        <Link to="/contact" className="hover:text-cyan-300 transition-all duration-300">📞 Contact</Link>
        <Link to="/cart" className="hover:text-cyan-300 transition-all duration-300">
          🛒 Cart <span className="text-cyan-400">({cart.length})</span>
        </Link>
      </div>

      {/* Right Side - User Profile / Login */}
      <div className="relative z-50" ref={dropdownRef}>
        {user ? (
          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-4 py-2 bg-gray-700 bg-opacity-50 backdrop-blur-xl rounded-lg text-white hover:bg-cyan-600 transition-all shadow-lg text-2xl"
            >
              👤 {user.name}
            </button>

            {/* Dropdown Menu (With z-index fix) */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden animate-fade-in z-50">
                <Link to="/profile" className="block px-4 py-3 hover:bg-cyan-600 transition-all">👤 Profile</Link>
                <Link to="/orders" className="block px-4 py-3 hover:bg-cyan-600 transition-all">📦 My Orders</Link>
                {user.role === "Admin" && (
                  <Link to="/admin" className="block px-4 py-3 hover:bg-cyan-600 transition-all">🛠️ Admin Dashboard</Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 bg-red-500 text-white hover:bg-red-700 transition-all"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="px-6 py-2 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-600 shadow-lg transition-all transform hover:scale-105 text-2xl">
            Login
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden px-3 py-2 bg-gray-700 bg-opacity-50 rounded-lg hover:bg-cyan-600 transition-all text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-900 text-white flex flex-col p-4 space-y-4 shadow-lg animate-slide-down text-2xl">
          <Link to="/" className="hover:text-cyan-300 transition-all">🏠 Home</Link>
          <Link to="/menu" className="hover:text-cyan-300 transition-all">🍜 Menu</Link>
          <Link to="/about" className="hover:text-cyan-300 transition-all">📖 About</Link>
          <Link to="/contact" className="hover:text-cyan-300 transition-all">📞 Contact</Link>
          <Link to="/cart" className="hover:text-cyan-300 transition-all">
            🛒 Cart <span className="text-cyan-400">({cart.length})</span>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
