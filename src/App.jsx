import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header/Header";
import Navigation from "./Components/Header/Navigation";
import Footer from "./Components/Footer/Footer";
import Shop from "./Pages/Shop";
import CategoryProducts from "./Pages/CategoryProducts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import About from "./Pages/About";
import HelpAndHope from "./Pages/HelpAndHope";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Cart from "./Pages/Cart";
import OrdersHistory from "./Pages/OrdersHistory";
import Profile from "./Pages/Profile";
import Wishlist from "./Pages/Wishlist";
import OrderDetails from "./Pages/OrderDetails";
import SearchResults from "./Pages/SearchResults";

function App() {
  return (
   
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/helpAndHope" element={<HelpAndHope />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/ordersHistory" element={<OrdersHistory />} />
          <Route path="/ordersHistory/:id/Details" element={<OrderDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/shop/:category" element={<CategoryProducts />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      
  
  );
}

export default App;
