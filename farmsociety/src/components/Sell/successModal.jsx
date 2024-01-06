import React from "react";
import "./SuccessModal.css"; // Import the CSS file for modal styles

const SuccessModal = ({ message, onClose }) => {
  return (
    <div className="modal-background">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SuccessModal;
