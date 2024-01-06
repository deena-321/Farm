import React from "react";
import Header from "./components/Header/header";
import ImageCont from "./components/ImageContainer/imageContainer"
import Footer from "./components/footer/footer";
import Buy from "./components/Buy/buy"
import Sell from "./components/Sell/sell"
import FarmDashBoard from "./components/FarmDash/farmDashBoard"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BuyDashboard from "./components/BuyerPages/BuyDashBoard";
import HomePage from "./components/BuyerPages/Chat/chat";
import Chat from "./components/BuyerPages/Chat/room";
import FChat from "./components/FarmDash/Chat/FRoom";
import Admin from "./components/Admin/admin";
import AdminDash from "./components/Admin/Dash/adminDash";
import Catalogue from "./components/ImageContainer/Catalogue";
import Buyer from "./components/ImageContainer/buyer";
function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<ImageCont />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/buyer/:sid" element={<Buyer />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/adminDash" element={<AdminDash />} />
          <Route path="/dashBoard/:sid" element={<FarmDashBoard />} />
          <Route path="/buypage/:sid" element={<BuyDashboard />} />
          <Route path="/home/:sellerId/:buyerId" element={<HomePage />} />
          <Route path="/room/:name/:password/:sid/:bid" element={<Chat />} />
          <Route path="/froom/:name/:password/:sid/:bid" element={<FChat />} />
  
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
