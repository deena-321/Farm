import React, { useState } from "react";
import SignInForm from "./signinForm";
import CreateAccount from "./createForm";
import "./Buyoption.css"

function Buyer() {
  const [showSignIn, setShowSignIn] = useState(true); // Initialize with true to show Sign In form

  const showSignInForm = () => {
    setShowSignIn(true);
  };

  const showCreateAccountForm = () => {
    setShowSignIn(false);
  };

  return (
    <div className="buy-">
    <div className="buy-option-container">
      <button onClick={showSignInForm} className="buy-option-button">
        Sign In
      </button>
      <button onClick={showCreateAccountForm} className="buy-option-button">
        Create Account
      </button>
      </div>
      {showSignIn ? <SignInForm /> : <CreateAccount />}
    
    </div>
  );
}

export default Buyer;
