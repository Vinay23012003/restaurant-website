const express = require("express");
const {
    addMenuItem,
    getMenuItems,
    getMenuItemById,  
    updateMenuItem,
    deleteMenuItem
} = require("../controllers/menuController");

const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();


//   GET /api/menu

router.get("/", getMenuItems);


//  GET /api/menu/:id

router.get("/:id", getMenuItemById);  

//   POST /api/menu

router.post("/", authMiddleware, adminMiddleware, addMenuItem);


//   PUT /api/menu/:id
 
router.put("/:id", authMiddleware, adminMiddleware, updateMenuItem);


//   DELETE /api/menu/:id
 
router.delete("/:id", authMiddleware, adminMiddleware, deleteMenuItem);

module.exports = router;
