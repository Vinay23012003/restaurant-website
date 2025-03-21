import axios from "axios";

const API_URL = "http://localhost:5000/api";

// ✅ Function to Get Token from LocalStorage
const getToken = () => localStorage.getItem("token");

// ✅ Function to Get Headers for Requests
const getHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  "Content-Type": "application/json",
});

// ✅ Fetch Menu Items
export const fetchMenuItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/menu`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching menu items:", error.response?.data || error);
    throw error;
  }
};

// ✅ Place an Order (Authenticated Users Only)
export const placeOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/orders`, orderData, { headers: getHeaders() });
    return response.data;
  } catch (error) {
    console.error("❌ Error placing order:", error.response?.data || error);
    throw error;
  }
};

// ✅ Fetch User Orders
export const fetchUserOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders`, { headers: getHeaders() });
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching user orders:", error.response?.data || error);
    throw error;
  }
};

// ✅ Fetch All Orders (Admin Only)
export const fetchAllOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders/all`, { headers: getHeaders() });
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching all orders:", error.response?.data || error);
    throw error;
  }
};

// ✅ Update Order Status (Admin Only)
export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await axios.put(`${API_URL}/orders/${orderId}`, { status }, { headers: getHeaders() });
    return response.data;
  } catch (error) {
    console.error("❌ Error updating order status:", error.response?.data || error);
    throw error;
  }
};

// ✅ Add a New Menu Item (Admin Only)
export const addMenuItem = async (menuData) => {
  try {
    const response = await axios.post(`${API_URL}/menu`, menuData, { headers: getHeaders() });
    return response.data;
  } catch (error) {
    console.error("❌ Error adding menu item:", error.response?.data || error);
    throw error;
  }
};

// ✅ Update a Menu Item (Admin Only)
export const updateMenuItem = async (id, menuData) => {
  try {
    const response = await axios.put(`${API_URL}/menu/${id}`, menuData, { headers: getHeaders() });
    return response.data;
  } catch (error) {
    console.error("❌ Error updating menu item:", error.response?.data || error);
    throw error;
  }
};

// ✅ Delete a Menu Item (Admin Only)
export const deleteMenuItem = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/menu/${id}`, { headers: getHeaders() });
    return response.data;
  } catch (error) {
    console.error("❌ Error deleting menu item:", error.response?.data || error);
    throw error;
  }
};

// ✅ Register a New User
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error registering user:", error.response?.data || error);
    throw error;
  }
};

// ✅ Login User
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error logging in user:", error.response?.data || error);
    throw error;
  }
};

// ✅ Fetch Contact Messages (Admin Only)
export const fetchContactMessages = async () => {
  try {
    const response = await axios.get(`${API_URL}/contact`, { headers: getHeaders() });
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching contact messages:", error.response?.data || error);
    return [];
  }
};
