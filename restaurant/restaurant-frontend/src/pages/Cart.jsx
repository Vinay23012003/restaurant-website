import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../api/Index";

function Cart() {
  const { cart, removeFromCart, clearCart, totalPrice } = useCart();
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  const navigate = useNavigate();

  console.log("Cart Items:", cart); // ✅ Debugging

  const handleOrder = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to place an order.");
      return;
    }

    const orderData = {
      items: cart.map((item) => ({ menuItem: item._id, quantity: item.quantity })),
      address,
    };

    try {
      await placeOrder(orderData, token);
      clearCart();
      navigate("/order-success");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <h2 className="text-3xl font-extrabold text-center mb-6">🛒 Your Cart</h2>
      
      {cart.length === 0 ? (
        <p className="text-center text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="bg-gray-800 bg-opacity-50 backdrop-blur-lg p-4 rounded-lg shadow-md flex items-center justify-between transition-transform hover:scale-105"
              >
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-300">${item.price} × {item.quantity}</p>
                  </div>
                </div>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg transition-all duration-300 hover:bg-red-600"
                  onClick={() => removeFromCart(item._id)}
                >
                  ❌ Remove
                </button>
              </div>
            ))}
          </div>

          {/* ✅ Show Total Price */}
          <div className="mt-6 text-center">
            <h3 className="text-2xl font-bold">💰 Total: ${totalPrice().toFixed(2)}</h3>
          </div>

          {/* ✅ Address Input Fields */}
          <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">📍 Enter Address</h3>
            {["street", "city", "state", "zipCode", "country"].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="block w-full p-3 my-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-green-400"
                value={address[field]}
                onChange={(e) => setAddress((prev) => ({ ...prev, [field]: e.target.value }))}
              />
            ))}
          </div>

          {/* ✅ Place Order Button */}
          <div className="text-center mt-6">
            <button
              className="px-6 py-3 bg-green-500 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-green-600 transition-all duration-300"
              onClick={handleOrder}
            >
              ✅ Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
