import "./App.css";

import AppRouter from "./paths";
import AuthProvider from "src/context/auth.context";
import { CartProvider } from "./context/cart.context";
import { CartFlagsProvider } from "./context/cartFlags.context";
function App() {
  return (
    <div>
      <CartProvider>
      <CartFlagsProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
        </CartFlagsProvider>
      </CartProvider>
    </div>
  );
}

export default App;
