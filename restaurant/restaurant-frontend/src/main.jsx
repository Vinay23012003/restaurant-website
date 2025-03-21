import App from "./App";
import { CartProvider } from "./context/CartContext";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartProvider>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </CartProvider>
);
