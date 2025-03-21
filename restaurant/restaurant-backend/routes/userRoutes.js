const express = require("express");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");
const { registerUser, loginUser, getUserProfile } = require("../controllers/userController");

const router = express.Router();

// ✅ Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ Protected Routes (User must be logged in)
router.get("/profile", authMiddleware, getUserProfile);

// ✅ Admin-Only Route (Only Admins can access)
router.get("/admin-dashboard", authMiddleware, adminMiddleware, (req, res) => {
    res.json({ message: "Welcome to the Admin Dashboard" });
});

module.exports = router;
