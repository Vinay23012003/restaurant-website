import { useEffect, useState } from "react";
import { fetchAllOrders, updateOrderStatus } from "../../api/Index";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchAllOrders(token).then(setOrders);
    }
  }, [token]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus, token);
      setOrders((orders) =>
        orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("❌ Failed to update order status.");
    }
  };

  // ✅ Function to determine status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500";
      case "Preparing":
        return "bg-blue-500";
      case "Completed":
        return "bg-green-500";
      case "Cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <h2 className="text-4xl font-extrabold mb-6 text-center">📦 Manage Orders</h2>

      {orders.length === 0 ? (
        <p className="text-lg text-center text-gray-400">No orders available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 border border-white/10"
            >
              {/* Order ID */}
              <h3 className="text-lg font-bold text-gray-200">
                🆔 Order ID:{" "}
                <span className="text-blue-400">{order._id.slice(-6)}</span>
              </h3>

              {/* Status Badge */}
              <p
                className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-semibold text-white ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </p>

              {/* Order Details */}
              <p className="mt-2 text-gray-300">
                💵 Total Price:{" "}
                <span className="font-semibold text-green-400">
                  ${order.totalPrice?.toFixed(2) || "0.00"}
                </span>
              </p>
              <p className="text-gray-300">
                🏠 Address:{" "}
                <span className="font-semibold">
                  {order.address?.street || "N/A"}, {order.address?.city || "N/A"}
                </span>
              </p>

              {/* ✅ Ordered Items */}
              <div className="mt-4">
                <h4 className="text-lg font-bold text-white">🍽️ Ordered Items:</h4>
                <div className="space-y-2">
                  {order.items?.map((item) => (
                    <div
                      key={item?.menuItem?._id || Math.random()}
                      className="flex items-center gap-3 p-2 bg-gray-800 rounded-lg"
                    >
                      {/* Item Image */}
                      {item?.menuItem?.image ? (
                        <img
                          src={item.menuItem.image}
                          alt={item.menuItem.name || "Item"}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-600 flex items-center justify-center rounded-lg">
                          ❌ No Image
                        </div>
                      )}

                      {/* Item Details */}
                      <div>
                        <p className="text-white font-semibold">{item?.menuItem?.name || "Unknown Item"}</p>
                        <p className="text-gray-400">${item?.menuItem?.price || "0.00"} × {item?.quantity || 0}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Dropdown */}
              <select
                value={order.status}
                onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                className="mt-4 w-full p-2 bg-gray-800 text-white border border-gray-500 rounded-md focus:ring-2 focus:ring-blue-400 transition duration-200"
              >
                <option value="Pending">⏳ Pending</option>
                <option value="Preparing">🍳 Preparing</option>
                <option value="Completed">✅ Completed</option>
                <option value="Cancelled">❌ Cancelled</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
