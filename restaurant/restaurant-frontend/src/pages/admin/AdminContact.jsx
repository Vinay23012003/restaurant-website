import { useEffect, useState } from "react";
import { fetchContactMessages } from "../../api/Index";
import axios from "axios";

function AdminContact() {
    const [messages, setMessages] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            fetchContactMessages(token).then(setMessages);
        }
    }, [token]);

    // ✅ Function to Delete Message
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this message?")) return;
        
        try {
            await axios.delete(`http://localhost:5000/api/contact/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            
            setMessages(messages.filter((msg) => msg._id !== id)); // Remove from UI
        } catch (error) {
            console.error("❌ Error deleting message:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
            <h2 className="text-4xl font-extrabold mb-6 text-center">📩 Contact Messages</h2>

            {messages.length === 0 ? (
                <p className="text-lg text-center text-gray-400">No contact messages found.</p>
            ) : (
                <div className="max-w-5xl mx-auto space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg._id}
                            className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 border border-white/10"
                        >
                            <h3 className="text-xl font-semibold text-blue-400">✉️ {msg.name}</h3>
                            <p className="text-gray-300">📧 Email: {msg.email}</p>
                            <p className="text-gray-300">📅 Date: {new Date(msg.createdAt).toLocaleDateString()}</p>
                            <p className="mt-2 text-white">📝 Message:</p>
                            <p className="text-gray-300 bg-gray-800 p-3 rounded-md">{msg.message}</p>

                            {/* Delete Button */}
                            <button
                                onClick={() => handleDelete(msg._id)}
                                className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition transform hover:scale-105 shadow-md"
                            >
                                🗑️ Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminContact;
