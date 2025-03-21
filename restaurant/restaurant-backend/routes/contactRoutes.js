const express = require("express");
const { submitContactForm, getAllMessages, deleteMessage } = require("../controllers/contactController");
const router = express.Router();

// ✅ POST: Save Contact Message & Send Email
router.post("/", submitContactForm);

// ✅ GET: Retrieve All Contact Messages (Admin Only)
router.get("/", getAllMessages);

// ✅ DELETE: Remove a Contact Message (Admin Only)
router.delete("/:id", deleteMessage);

module.exports = router;
