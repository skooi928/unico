import { Footer } from './components';
import { AllRoutes } from "./routes/AllRoutes"
import { CartProvider } from "./pages/Cart/CartContext";
import './App.css';

function App() {
  return (
    <>
      <CartProvider>
        <AllRoutes/>
        <Footer/>
      </CartProvider>
    </>
  );
}

export default App;