import { FaUtensils, FaUsers, FaMapMarkerAlt } from "react-icons/fa";

function About() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-12">
      
      {/* 🔹 Header */}
      <h2 className="text-5xl font-extrabold text-cyan-400 drop-shadow-lg text-center">
        About Our Restaurant 🍽️
      </h2>
      <p className="text-gray-300 text-lg text-center mt-4 max-w-3xl">
        Welcome to our restaurant! We serve delicious food with love and passion, using the freshest ingredients. Our team is dedicated to providing the best dining experience.
      </p>

      {/* 🔹 Story Section */}
      <div className="mt-12 bg-gray-800 bg-opacity-80 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-4xl w-full text-center transition-all transform hover:scale-105">
        <FaUtensils className="text-cyan-400 text-5xl mx-auto" />
        <h3 className="text-3xl font-semibold text-cyan-400 mt-4">Our Story</h3>
        <p className="text-gray-300 mt-3">
          Our journey began with a passion for cooking and hospitality. Over the years, we have crafted a menu that blends traditional flavors with modern culinary techniques.
        </p>
      </div>

      {/* 🔹 Mission Section */}
      <div className="mt-8 bg-gray-800 bg-opacity-80 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-4xl w-full text-center transition-all transform hover:scale-105">
        <FaUsers className="text-cyan-400 text-5xl mx-auto" />
        <h3 className="text-3xl font-semibold text-cyan-400 mt-4">Our Mission</h3>
        <p className="text-gray-300 mt-3">
          We believe in serving high-quality food with the best ingredients. Our goal is to create a cozy environment where everyone feels at home.
        </p>
      </div>

      {/* 🔹 Location Section */}
      <div className="mt-8 bg-gray-800 bg-opacity-80 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-4xl w-full text-center transition-all transform hover:scale-105">
        <FaMapMarkerAlt className="text-cyan-400 text-5xl mx-auto" />
        <h3 className="text-3xl font-semibold text-cyan-400 mt-4">Visit Us</h3>
        <p className="text-gray-300 mt-3">
          📍 123 Food Street, Culinary City, Delicious Country
        </p>
      </div>

    </div>
  );
}

export default About;
