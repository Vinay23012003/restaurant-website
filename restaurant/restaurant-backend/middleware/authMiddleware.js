const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ Middleware to Verify User Token
const authMiddleware = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        // ✅ Check if token exists
        if (!token) {
            return res.status(401).json({ message: "Access Denied. No Token Provided!" });
        }

        // ✅ Handle "Bearer token" format
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length);
        }

        // ✅ Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // ✅ Fetch User from Database
        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(401).json({ message: "User not found!" });
        }

        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid or Expired Token" });
    }
};

// ✅ Middleware to Check Admin Role
const adminMiddleware = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    if (req.user.role !== "Admin") { 
        return res.status(403).json({ message: "Forbidden. Admin access only." });
    }

    next();
};

module.exports = { authMiddleware, adminMiddleware };
