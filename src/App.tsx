import "./App.css";

import AppRouter from "./paths";
import AuthProvider from "src/context/auth.context";
import { CartProvider } from "./context/cart.context";
function App() {
  return (
    <div>
      <CartProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </CartProvider>
    </div>
  );
}

export default App;
