const Order = require("../models/Order");
const Menu = require("../models/Menu");

// Place a new order
const placeOrder = async (req, res) => {
    try {
        const { items, address } = req.body;
        const userId = req.user.id;

        let totalPrice = 0;
        for (let item of items) {
            const menuItem = await Menu.findById(item.menuItem);
            totalPrice += menuItem.price * item.quantity;
        }

        const newOrder = new Order({
            user: userId,
            items,
            totalPrice,
            address
        });

        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get user orders
const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ user: userId }).populate("items.menuItem");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Admin - Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user items.menuItem");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Admin - Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });

        res.status(200).json({ message: "Order status updated", order: updatedOrder });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { placeOrder, getUserOrders, getAllOrders, updateOrderStatus };
