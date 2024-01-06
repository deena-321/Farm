import React, { useState } from "react";
import FarmProfile from "./Profile/FarmProfile";
import ProductUpload from "./Product/ProductUpload";
import SalesManagement from "./Sales/SalesManagement";
import ChatRoom from "./Chat/FchatRoom"; // Import ChatRoom component
import "./FarmerDashboard.css"; // Style it as needed

function FarmerDashboard() {
  const [selectedSection, setSelectedSection] = useState("upload-product");

  const renderSelectedSection = () => {
    switch (selectedSection) {
      // case "profile":
      //   return <FarmProfile />;
      case "upload-product":
        return <ProductUpload />;
      case "sales-management":
        return <SalesManagement />;
      case "chat-room": // Add a new case for the ChatRoom component
        return <ChatRoom />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        
        <ul>
         
          <li>
            <button className="nav-button" onClick={() => setSelectedSection("upload-product")}>Upload Product</button>
          </li>
          <li>
            <button className="nav-button" onClick={() => setSelectedSection("sales-management")}>Sales Management</button>
          </li>
          <li>
            <button className="nav-button" onClick={() => setSelectedSection("chat-room")}>Chat Room</button>
          </li>
        </ul>
      </nav>
      <div className="farm-content">{renderSelectedSection()}</div>
    </div>
  );
}

export default FarmerDashboard;
