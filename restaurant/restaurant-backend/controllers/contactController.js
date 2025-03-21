const Contact = require("../models/contactModel");
const nodemailer = require("nodemailer");
require("dotenv").config();

// ✅ Handle Contact Form Submission
const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // ✅ Validate Input
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // ✅ Save Message to MongoDB
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    // ✅ Send Email Notification to Admin
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // App Password from Gmail
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL, // Admin's email to receive notifications
      subject: "New Contact Form Submission",
      text: `New message from ${name} (${email}): \n\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// ✅ Fetch All Messages (Admin Only)
const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// ✅ Delete a Message (Admin Only)
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    res.status(200).json({ message: "Message deleted successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { submitContactForm, getAllMessages, deleteMessage };
