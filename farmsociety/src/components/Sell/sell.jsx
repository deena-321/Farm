import React, { useState } from "react";
import SellSignin from "./sellSignin";
import SellAccount from "./SellAccount"
import "./sell.css"


function SellOption() {
    const [showSignIn,setShowSignIn]= useState(true);
    const showSignInForm = () => {
        setShowSignIn(true);
    };
    const showSellCreateForm = () => {
        setShowSignIn(false);
    };

    return(
        <div className="Sell">
            <div className="sell-option-container">
                <button onClick={showSignInForm} className="sell-option-button">
                    Sign In
                </button>
                <button onClick={showSellCreateForm} className="sell-option-button">
                    Create Account
                </button>
            </div>
            {showSignIn ? <SellSignin />: <SellAccount />}
        </div>
    )
}

export default SellOption;