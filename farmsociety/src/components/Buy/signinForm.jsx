import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./buyform.css";

const SellSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(null); // Add a state to store the user ID
  const navi = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    fetch("http://127.0.0.1:8000/bSignin/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse the JSON response
        } else {
          console.error("Sign In failed");
          throw new Error("Sign In failed");
        }
      })
      .then((data) => {
        // Assuming the server sends the user ID in the response as "user_id"
        const { user_id } = data;
        if (user_id) {
          // Set the user ID in state
          setUserId(user_id);
          // Redirect to the dashboard with the user ID
          navi(`/buypage/${user_id}`);
        } else {
          console.error("User ID not found in the response");
        }
      })
      .catch((error) => {
        // Handle network errors or other exceptions
        console.error("An error occurred", error);
      });
  };

  return (
    <div className="buy-form-container"> {/* Updated class name */}
      <div className="buy-form-content"> 
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="buy-input-field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            required
          />
          <input
            className="buy-input-field" 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            required
          />
          <button type="submit" className="buy-submit-button"> 
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};


export default SellSignin;
