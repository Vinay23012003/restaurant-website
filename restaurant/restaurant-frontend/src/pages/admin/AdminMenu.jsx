import { useEffect, useState } from "react";
import { fetchMenuItems, addMenuItem, updateMenuItem, deleteMenuItem } from "../../api/Index";

function AdminMenu() {
    const [menu, setMenu] = useState([]);
    const [newItem, setNewItem] = useState({
        id: null,
        name: "",
        description: "",
        price: "",
        category: "",
        image1: "",
        image2: "",
        image3: ""
    });
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        loadMenuItems();
    }, []);

    const loadMenuItems = async () => {
        try {
            const data = await fetchMenuItems();
            setMenu(data);
        } catch (error) {
            console.error("Error fetching menu items:", error);
            alert("Failed to load menu items.");
        }
    };

    const handleAddOrUpdateItem = async () => {
        if (!newItem.name || !newItem.price || !newItem.category || !newItem.image1) {
            alert("Please fill in Name, Price, Category, and at least one Image.");
            return;
        }

        const formattedItem = {
            name: newItem.name,
            description: newItem.description,
            price: parseFloat(newItem.price) || 0,
            category: newItem.category,
            image: [newItem.image1, newItem.image2, newItem.image3].filter(img => img) // ✅ Ensure array format
        };

        try {
            setLoading(true);
            if (newItem.id) {
                const response = await updateMenuItem(newItem.id, formattedItem, token);
                setMenu((prevMenu) => prevMenu.map((item) => (item._id === newItem.id ? response : item)));
                alert("✅ Menu item updated successfully!");
            } else {
                const response = await addMenuItem(formattedItem, token);
                setMenu((prevMenu) => [...prevMenu, response]);
                alert("✅ New menu item added successfully!");
            }
            setNewItem({ id: null, name: "", description: "", price: "", category: "", image1: "", image2: "", image3: "" });
        } catch (error) {
            console.error("Error saving item:", error.response?.data || error);
            alert(`❌ Failed to save menu item: ${error.response?.data?.message || "Unknown Error"}`);
        } finally {
            setLoading(false);
        }
    };

    const handleEditItem = (item) => {
        setNewItem({ 
            id: item._id, 
            name: item.name, 
            description: item.description, 
            price: item.price, 
            category: item.category,
            image1: item.image?.[0] || "",  // ✅ Safe access
            image2: item.image?.[1] || "",  
            image3: item.image?.[2] || ""   
        });
    };

    const handleDeleteItem = async (id) => {
        if (!window.confirm("Are you sure you want to delete this menu item?")) return;
        try {
            await deleteMenuItem(id, token);
            setMenu((prevMenu) => prevMenu.filter((item) => item._id !== id));
            alert("✅ Menu item deleted successfully!");
        } catch (error) {
            console.error("Error deleting item:", error.response?.data || error);
            alert("❌ Failed to delete menu item.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
            <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-100">🍽️ Admin Menu Management</h2>

            {/* Add / Edit Item Form */}
            <div className="mb-6 p-6 bg-gray-800 shadow-lg rounded-xl">
                <h3 className="text-2xl font-bold mb-4 text-gray-200">{newItem.id ? "✏️ Edit Menu Item" : "➕ Add New Menu Item"}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input type="text" placeholder="🍔 Name" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} className="p-3 border rounded bg-gray-700 text-white" />
                    <input type="text" placeholder="📝 Description" value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} className="p-3 border rounded bg-gray-700 text-white" />
                    <input type="number" placeholder="💰 Price" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} className="p-3 border rounded bg-gray-700 text-white" />
                    <input type="text" placeholder="📂 Category" value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} className="p-3 border rounded bg-gray-700 text-white" />
                    <input type="text" placeholder="🖼️ Main Image URL" value={newItem.image1} onChange={(e) => setNewItem({ ...newItem, image1: e.target.value })} className="p-3 border rounded bg-gray-700 text-white" />
                    <input type="text" placeholder="🖼️ Second Image URL" value={newItem.image2} onChange={(e) => setNewItem({ ...newItem, image2: e.target.value })} className="p-3 border rounded bg-gray-700 text-white" />
                    <input type="text" placeholder="🖼️ Third Image URL" value={newItem.image3} onChange={(e) => setNewItem({ ...newItem, image3: e.target.value })} className="p-3 border rounded bg-gray-700 text-white" />
                </div>
                <button onClick={handleAddOrUpdateItem} className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition transform hover:scale-105" disabled={loading}>
                    {loading ? "⏳ Saving..." : newItem.id ? "✏️ Update Item" : "✅ Add Item"}
                </button>
            </div>

            {/* Menu Items List */}
            <div className="mt-6">
                <h3 className="text-3xl font-bold mb-4 text-gray-100">📜 Menu List</h3>
                {menu.length === 0 ? (
                    <p className="text-gray-400 text-center">No menu items found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {menu.map((item) => (
                            <div key={item._id} className="bg-gray-900 p-5 rounded-xl shadow-md hover:shadow-2xl transition duration-300 transform hover:scale-105">
                                <div className="flex space-x-2">
                                    {(item.image || []).map((img, index) => (  // ✅ Safe access to image array
                                        <img key={index} src={img} alt={item.name} className="w-1/3 h-24 object-cover rounded-lg" />
                                    ))}
                                </div>
                                <h3 className="text-2xl font-bold mt-3 text-gray-200">{item.name}</h3>
                                <p className="text-gray-400">{item.description}</p>
                                <p className="text-xl font-semibold text-green-400 mt-2">${item.price}</p>
                                <div className="mt-4 flex justify-between">
                                    <button onClick={() => handleEditItem(item)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">✏️ Edit</button>
                                    <button onClick={() => handleDeleteItem(item._id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">🗑️ Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminMenu;
