import { useEffect, useState } from "react";
import { fetchUserOrders } from "../api/Index";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("Please log in to view your orders.");
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await fetchUserOrders(token);
        setOrders(data);
      } catch (err) {
        console.error("Error fetching user orders:", err);
        setError("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <h2 className="text-3xl font-extrabold text-center mb-6">📦 Your Orders</h2>

      {loading && <p className="text-center text-gray-400">Loading your orders...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {orders.length === 0 && !loading && !error ? (
        <p className="text-center text-gray-400">You have no orders yet.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-800 bg-opacity-60 backdrop-blur-lg p-6 rounded-lg shadow-md transition-transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold mb-2">🆔 Order ID: {order._id}</h3>
              <p className="text-gray-300">
                <span className="font-bold">📦 Status:</span> {order.status}
              </p>
              <p className="text-gray-300">
                <span className="font-bold">💰 Total Price:</span> ${order.totalPrice.toFixed(2)}
              </p>
              <p className="text-gray-300">
                <span className="font-bold">📍 Address:</span> {order.address.street}, {order.address.city}
              </p>
              {/* Display Ordered Items */}
              <div className="mt-4">
                <h4 className="text-lg font-semibold">🍽️ Ordered Items:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  {order.items.map((item) => (
                    <div key={item.menuItem._id} className="flex items-center bg-gray-700 p-3 rounded-lg">
                      <img
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        className="w-16 h-16 rounded-lg object-cover mr-4"
                      />
                      <div>
                        <p className="text-white font-bold">{item.menuItem.name}</p>
                        <p className="text-gray-300">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
