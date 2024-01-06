import React, { useState } from "react";
import "./buyform.css";

const CreateAccount = () => {
  // Define state variables to manage input field values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [location, setLoc] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior.
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
      setNameError("Name should contain only alphabets");
      return;
    } else {
      setNameError("");
    }
    const data = {
      name,
      email,
      password,
      location,
    };

    fetch("http://127.0.0.1:8000/bcreate-account/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          // Handle success, e.g., show a success message or redirect the user
          console.log("Account created successfully");
        } else {
          // Handle errors, e.g., display an error message to the user
          console.error("Account creation failed");
        }
      })
      .catch((error) => {
        // Handle network errors or other exceptions
        console.error("An error occurred", error);
      });
  };

  return (
    <div className="buy-form-container">
      <div className="buy-form-content">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="buy-input-field"
            placeholder="FullName"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update the name state
            name="name"
          />
            <div className="error-message">{nameError}</div>
          <input
            type="email"
            className="buy-input-field"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update the email state
            name="email"
          />
           
           <div className="error-message">{emailError}</div>

           <input
            type="text"
            className="buy-input-field"
            placeholder="Location"
            value={location}
            onChange={(e) => setLoc(e.target.value)} // Update the name state
            name="name"
          />
          <input
            type="password"
            className="buy-input-field"
            placeholder="PassWord"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update the password state
            name="password"
          />
          <button type="submit" className="buy-submit-button">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
