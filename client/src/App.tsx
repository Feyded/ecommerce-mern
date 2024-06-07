import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import ShopPage from "./pages/shop";
import AuthPage from "./pages/auth";
import PurchasedItemsPage from "./pages/purchased-items";
import CheckOutPage from "./pages/checkout";
import CreateAccount from "./pages/register";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ShopPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/checkout" element={<CheckOutPage />} />
          <Route path="/purchased-items" element={<PurchasedItemsPage />} />
          <Route path="/create-account" element={<CreateAccount />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
