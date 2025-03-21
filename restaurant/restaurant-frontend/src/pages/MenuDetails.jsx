import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useCart } from "../context/CartContext"; // ✅ Corrected Import

function MenuDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // ✅ Use the custom hook
  const [menuItem, setMenuItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Invalid menu item ID");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:5000/api/menu/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setMenuItem(response.data);
        } else {
          setError("Menu item not found!");
        }
      })
      .catch((error) => {
        console.error("Error fetching menu details:", error);
        setError("Menu item not found!");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center text-cyan-400">Loading...</p>;
  if (error)
    return (
      <div className="text-center text-red-500">
        {error}
        <button
          onClick={() => navigate("/menu")}
          className="mt-4 px-6 py-2 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-600 transition-all"
        >
          🔙 Back to Menu
        </button>
      </div>
    );

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
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      {menuItem && (
        <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          {/* ✅ Image Slider for Multiple Images */}
          {Array.isArray(menuItem.image) && menuItem.image.length > 1 ? (
            <Slider {...sliderSettings}>
              {menuItem.image.map((img, index) => (
                <div key={index}>
                  <img src={img} alt={menuItem.name} className="w-full h-70 object-cover rounded-lg" />
                </div>
              ))}
            </Slider>
          ) : (
            <img src={menuItem.image?.[0] || menuItem.image} alt={menuItem.name} className="w-full h-60 object-cover rounded-lg" />
          )}

          <h2 className="text-3xl font-bold text-cyan-400 mt-4">{menuItem.name}</h2>
          <p className="text-gray-300 mt-2">{menuItem.description}</p>
          <p className="text-cyan-300 font-bold text-2xl mt-3">${menuItem.price}</p>

          {/* ✅ Corrected Add to Cart Button */}
          <button
            className="mt-4 px-6 py-2 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-600 transition-all"
            onClick={() => addToCart(menuItem)} // ✅ Use addToCart function
          >
            ➕ Add to Cart
          </button>

          <button
            onClick={() => navigate("/menu")}
            className="mt-4 ml-4 px-6 py-2 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-all"
          >
            🔙 Back to Menu
          </button>
        </div>
      )}
    </div>
  );
}

export default MenuDetails;
