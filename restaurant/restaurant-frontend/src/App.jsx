import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import AdminOrders from "./pages/admin/AdminOrders";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OrderSuccess from "./pages/OrderSuccess";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Profile from "./pages/Profile";
import AdminMenu from "./pages/admin/AdminMenu";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import About from "./pages/About";
import MenuDetails from './pages/MenuDetails'
import AdminContact from "./pages/admin/AdminContact";

function App() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/menu/:id" element={<MenuDetails/>} />
                <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contact" element={<Contact />} />
                <Route  path="/about" element={<About/>}/>
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/order-success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
                <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                <Route path="/admin/menu" element={<AdminRoute><AdminMenu /></AdminRoute>} />
                <Route path="/admin/contact" element={<AdminRoute><AdminContact/></AdminRoute>} />
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
