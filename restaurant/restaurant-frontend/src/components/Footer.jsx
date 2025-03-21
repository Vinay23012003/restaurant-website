import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaGoogle } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* 🔹 About Section */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white">🍽️ Restaurant Name</h3>
          <p className="text-gray-400">
            Experience the best flavors with our carefully crafted dishes made from fresh ingredients. Visit us for a delightful dining experience.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition text-2xl">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition text-2xl">
              <FaTwitter />
            </a>

            <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-600 transition text-2xl">
              <FaGoogle />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition text-2xl">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-800 transition text-2xl">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* 🔹 Quick Links */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">🔗 Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-white transition">🏠 Home</Link></li>
            <li><Link to="/menu" className="hover:text-white transition">🍽️ Menu</Link></li>
            <li><Link to="/about" className="hover:text-white transition">📖 About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">📞 Contact</Link></li>
          </ul>
        </div>

        {/* 🔹 Contact Info */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">📍 Contact Us</h3>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-xl text-red-400" />
              <span>123 Food Street, Culinary City</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaPhone className="text-xl text-green-400" />
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaEnvelope className="text-xl text-blue-400" />
              <span>contact@restaurant.com</span>
            </li>
          </ul>
        </div>

      </div>

      {/* 🔹 Copyright Section */}
      <div className="mt-12 text-center border-t border-gray-700 pt-6">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} 🍽️ Restaurant Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
