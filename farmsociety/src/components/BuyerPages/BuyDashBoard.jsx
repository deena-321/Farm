import React, { useState } from "react";
import "./BuyDashboard.css";
import EditProfile from "../FarmDash/Profile/FarmProfile";
import Sales from "./Sales/sales";
import ChatRoom from "./Chat/ChatRoom";
import fruits from "./fruits.jpg";
import ric from "./ric.jpg";

function BuyDashboard() {
  const [selectedSection, setSelectedSection] = useState("sales");

  const renderSelectedSection = () => {
    switch (selectedSection) {
     
      case "sales":
        return (
          <div className="content-container">
            <img class="lf"src={fruits}></img>
      <img class="rf"src={ric}></img>
            <Sales />
          </div>
        );
      case "chat":
        return (
          <div className="content-container">
            <img class="lf"src={fruits}></img>
      <img class="rf"src={ric}></img>
            <ChatRoom />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="buy-dashboard-container">
      <div className="tabs">

        <button className={selectedSection === "sales" ? "active" : ""} onClick={() => setSelectedSection("sales")}>Search Product</button>
        <button className={selectedSection === "chat" ? "active" : ""} onClick={() => setSelectedSection("chat")}>Chat Room</button>
      </div>
      <div className="main-content">{renderSelectedSection()}</div>
    </div>
  );
}

export default BuyDashboard;
