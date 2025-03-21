import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import Slider from "react-slick"; // ✅ Import react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/menu")
      .then((response) => {
        setMenu(response.data);
        setFilteredMenu(response.data);
        const uniqueCategories = ["All", ...new Set(response.data.map(item => item.category))];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching menu:", error));
  }, []);

  const filterByCategory = (category) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredMenu(menu);
    } else {
      setFilteredMenu(menu.filter(item => item.category === category));
    }
  };

  // ✅ Slider settings for multiple images
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="p-6 bg-gradient-to-br from-black via-gray-900 to-indigo-900 min-h-screen text-white">
      
      {/* 🔹 Page Title */}
      <h2 className="text-5xl font-extrabold text-center text-cyan-400 mb-6 drop-shadow-[0_0px_20px_rgba(0,255,255,0.8)]">
        🍽️ Our Signature Menu
      </h2>

      {/* 🚀 Category Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-6 py-2 rounded-full text-lg font-semibold transition-all border-2 
              ${activeCategory === category 
              ? "bg-cyan-500 text-black shadow-lg scale-105 border-cyan-400" 
              : "bg-gray-800 hover:bg-cyan-500 transition-all border-gray-600 text-white"}`}
            onClick={() => filterByCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 🚀 Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredMenu.map((item) => (
          <div 
            key={item._id} 
            className="bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6 rounded-2xl shadow-2xl transform transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(0,255,255,0.6)] cursor-pointer"
            onClick={() => navigate(`/menu/${item._id}`)}
          >
            {/* ✅ Image Slider for Multiple Images */}
            {Array.isArray(item.image) && item.image.length > 1 ? (
              <Slider {...sliderSettings}>
                {item.image.map((img, index) => (
                  <div key={index}>
                    <img src={img} alt={item.name} className="w-full h-40 object-cover rounded-lg shadow-md border border-cyan-400" />
                  </div>
                ))}
              </Slider>
            ) : (
              <img src={item.image?.[0] || item.image} alt={item.name} className="w-full h-40 object-cover rounded-lg shadow-md border border-cyan-400" />
            )}

            <h3 className="text-2xl font-bold mt-4 text-cyan-300">{item.name}</h3>
            <p className="text-gray-400 mt-2">{item.description}</p>
            <p className="text-cyan-400 font-extrabold text-lg mt-2">${item.price}</p>
            <button
              className="mt-4 px-6 py-2 bg-cyan-500 text-black font-bold rounded-full hover:bg-cyan-600 transition-all shadow-lg w-full"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(item);
              }}
            >
              ➕ Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* ⚠️ No Items Found Message */}
      {filteredMenu.length === 0 && (
        <p className="text-center text-gray-400 text-lg mt-6">No items available in this category.</p>
      )}
    </div>
  );
}

export default Menu;
