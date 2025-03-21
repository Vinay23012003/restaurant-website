import { useState } from "react";
import axios from "axios";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage(null);

    try {
      const response = await axios.post("http://localhost:5000/api/contact", formData);
      setResponseMessage({ type: "success", text: response.data.message });

      // Reset form after submission
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setResponseMessage({
        type: "error",
        text: error.response?.data?.error || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-gray-900 bg-opacity-80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-700">
        
        {/* 🔹 Contact Header */}
        <h2 className="text-4xl font-extrabold text-center text-cyan-400 mb-6">📞 Contact Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 🔹 Contact Info Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-300">Get in Touch</h3>
            <p className="text-gray-400">We’d love to hear from you! Fill out the form or contact us directly.</p>
            
            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-xl text-red-400" />
              <p>123 Food Street, Culinary City</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaPhone className="text-xl text-green-400" />
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-xl text-blue-400" />
              <p>contact@restaurant.com</p>
            </div>
          </div>

          {/* 🔹 Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400"
              required
            />
            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400"
              required
            ></textarea>

            {/* ✅ Show Success or Error Message */}
            {responseMessage && (
              <p className={`text-center p-2 rounded-lg ${responseMessage.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
                {responseMessage.text}
              </p>
            )}

            <button
              type="submit"
              className="w-full p-3 bg-cyan-500 text-gray-900 font-bold rounded-lg shadow-lg hover:bg-cyan-600 transition-all transform hover:scale-105"
              disabled={loading}
            >
              {loading ? "⏳ Sending..." : "📩 Send Message"}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default Contact;
