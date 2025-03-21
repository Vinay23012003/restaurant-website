const express = require("express");
const { placeOrder, getUserOrders, getAllOrders, updateOrderStatus } = require("../controllers/orderController");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Place an Order (User Only)
router.post("/", authMiddleware, placeOrder);

// ✅ Fetch User Orders
router.get("/", authMiddleware, getUserOrders);

// ✅ Fetch All Orders (Admin Only)
router.get("/all", authMiddleware, adminMiddleware, getAllOrders);

// ✅ Update Order Status (Admin Only)
router.put("/:id", authMiddleware, adminMiddleware, updateOrderStatus);

module.exports = router;
