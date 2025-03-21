const Menu = require("../models/Menu");

// ✅ नया मेनू आइटम जोड़ें (Admin Only)
const addMenuItem = async (req, res) => {
    try {
        const { name, description, price, category, image, image2, image3 } = req.body;

        // ✅ जरूरी फ़ील्ड्स चेक करें
        if (!name || !price || !category || !image) {
            return res.status(400).json({ message: "Name, price, category, and at least one image are required." });
        }

        // ✅ नया मेनू आइटम बनाएं
        const newItem = new Menu({ name, description, price, category, image, image2, image3 });
        await newItem.save();

        res.status(201).json({ message: "Menu item added successfully", item: newItem });
    } catch (error) {
        console.error("Error adding menu item:", error);
        res.status(500).json({ message: "Server error while adding menu item", error: error.message });
    }
};

// ✅ सभी मेनू आइटम्स प्राप्त करें
const getMenuItems = async (req, res) => {
    try {
        const items = await Menu.find();
        res.status(200).json(items);
    } catch (error) {
        console.error("Error fetching menu items:", error);
        res.status(500).json({ message: "Server error while fetching menu items", error: error.message });
    }
};

// ✅ **ID द्वारा एकल मेनू आइटम प्राप्त करें**
const getMenuItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const menuItem = await Menu.findById(id);

        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        res.status(200).json(menuItem);
    } catch (error) {
        console.error("Error fetching menu item:", error);
        res.status(500).json({ message: "Invalid menu item ID", error: error.message });
    }
};

// ✅ मेनू आइटम अपडेट करें (Admin Only)
const updateMenuItem = async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ आइटम अपडेट करें
        const updatedItem = await Menu.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        res.status(200).json({ message: "Menu item updated successfully", item: updatedItem });
    } catch (error) {
        console.error("Error updating menu item:", error);
        res.status(500).json({ message: "Server error while updating menu item", error: error.message });
    }
};

// ✅ मेनू आइटम डिलीट करें (Admin Only)
const deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ आइटम डिलीट करें
        const deletedItem = await Menu.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        res.status(200).json({ message: "Menu item deleted successfully" });
    } catch (error) {
        console.error("Error deleting menu item:", error);
        res.status(500).json({ message: "Server error while deleting menu item", error: error.message });
    }
};

// ✅ सभी कंट्रोलर एक्सपोर्ट करें
module.exports = { 
    addMenuItem, 
    getMenuItems, 
    getMenuItemById,  
    updateMenuItem, 
    deleteMenuItem 
};
