import React, { useState } from "react";
import QrCode from "react-qr-code";
import SuccessModal from "./successModal"; // Import the SuccessModal component
import "./sellForm.css";

const SellAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLoc] = useState("");
  const [password, setPassword] = useState("");
  const [subscriptionPlan, setSubscriptionPlan] = useState("silver");
  const [isPlatinumPlanSelected, setIsPlatinumPlanSelected] = useState(false);
  const [aadharCard, setAadharCard] = useState("null");
  const [farmIdsImage, setFarmIdsImage] = useState("null");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [amountToPay, setAmountToPay] = useState(0);
  const [transactionId, setTransactionId] = useState("");
  const [isAccountCreated, setIsAccountCreated] = useState(false);


  const handleSubscriptionPlanChange = (e) => {
    const plan = e.target.value;
    setSubscriptionPlan(plan);
    setIsPlatinumPlanSelected(plan === "platinum");
    setAmountToPay(plan === "silver" ? 0 : 1000);
  };
  const handleAadharCardChange = (e) => {
    const file = e.target.files[0];
    setAadharCard(file);
  };

  const handleFarmerIdsChange = (e) => {
    const file = e.target.files[0];
    setFarmIdsImage(file);
  };

  const resetFormFields = () => {
    setName("");
    setEmail("");
    setPassword("");
    setSubscriptionPlan("silver");
    setIsPlatinumPlanSelected(false);
    setAadharCard("");
    setFarmIdsImage("");
    setLoc("");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Email format validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Name validation regex (only alphabets)
    const nameRegex = /^[A-Za-z]+$/;

    // Check if email is in correct format
    if (!email.match(emailRegex)) {
      setEmailError("Invalid email format");
      return;
    } else {
      setEmailError("");
    }

    // Check if name contains only alphabets
    if (!name.match(nameRegex)) {
      setNameError("Invalid name format. Name should contain only alphabets.");
      return;
    } else {
      setNameError("");
    }


    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("location", location);
    formData.append("subscriptionPlan", subscriptionPlan);
    formData.append("aadharCardImage", aadharCard);
    formData.append("farmerIdsImage", farmIdsImage);
    formData.append("transactionId", transactionId);
    formData.append("amountToPay", amountToPay); 


    fetch("http://127.0.0.1:8000/screate-account/", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          // Handle success
          console.log("Account created successfully");
        } else {
          // Handle errors
          console.error("Account creation failed");
        }
      })
      .catch((error) => {
        // Handle network errors or other exceptions
        console.error("An error occurred", error);
      });
      setTimeout(() => {
        setIsAccountCreated(true);
      }, 2000);
    };
  
    return (
      <div className="spage-container">
        <div className="form-container">
          {isAccountCreated && (
            <SuccessModal
              message="Account created successfully! Please check your email for further instructions."
              onClose={() => {
                setIsAccountCreated(false);
                resetFormFields(); // Clear form fields when modal is closed
              }}
            />
          )}
          {!isAccountCreated && (
            <div>
              <h2>Create Account</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={name}
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="error-message">{emailError}</div>
            
                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="error-message">{nameError}</div>
                <input
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                 <input
                  type="text"
                  value={location}
                  placeholder="Address"
                  onChange={(e) => setLoc(e.target.value)}
                />
                <select value={subscriptionPlan} onChange={handleSubscriptionPlanChange}>
                  <option value="silver">Silver (Free)</option>
                
                  <option value="platinum">Platinum (Rs. 1000)</option>
                </select>
                {isPlatinumPlanSelected && (
                  <div>
                     <input
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleAadharCardChange}
                required
              />
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleFarmerIdsChange}
                required
              />
                     <input
                type="text"
                value={transactionId}
                placeholder="TransactionId"
                onChange={(e) => setTransactionId(e.target.value)}
              />
                  </div>
                )}
                <button type="submit">Create Account</button>
              </form>
            </div>
          )}
          {!isAccountCreated && isPlatinumPlanSelected && (
            <div className="qr-code-container">
              <p>Scan QR Code to Pay: {amountToPay} </p>
              <QrCode value={`Amount: ${amountToPay} INR, Transaction ID: 12345678`} />
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default SellAccount;