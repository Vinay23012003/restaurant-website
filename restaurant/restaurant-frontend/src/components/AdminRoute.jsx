import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // Get the user's role from localStorage

  return token && role === "Admin" ? children : <Navigate to="/" replace />;
};

export default AdminRoute;
