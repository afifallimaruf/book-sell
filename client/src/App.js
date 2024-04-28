import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import OnlyAdmin from "./components/OnlyAdmin";
import FooterComponent from "./components/FooterComponent";
import UpdateProduct from "./pages/UpdateProduct";
import AOS from "aos";
import "aos/dist/aos.css";
import Fiction from "./pages/Fiction";
import NonFiction from "./pages/NonFiction";
import SciFi from "./pages/SciFi";
import SelfDev from "./pages/SelfDev";
import History from "./pages/History";

function App() {

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route element={<OnlyAdmin />}>
            <Route path="/admin-panel" element={<Admin />} />
            <Route path="/update/:bookId" element={<UpdateProduct />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/category/fiction" element={<Fiction />} />
          <Route path="/category/non-fiction" element={<NonFiction />} />
          <Route path="/category/sci-fi" element={<SciFi />} />
          <Route path="/category/self-dev" element={<SelfDev />} />
          <Route path="/category/history" element={<History />} />
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
