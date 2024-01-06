import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sellForm.css";

const SellSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      email,
      password,
    };
    console.log(data)

    fetch("http://127.0.0.1:8000/sSignin/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error("Sign In failed");
          throw new Error("Sign In failed");
        }
      })
      .then((data) => {
        const { user_id } = data;
        if (user_id) {
          setUserId(user_id);
          navigate(`/dashBoard/${user_id}`);
        } else {
          console.error("User ID not found in the response");
        }
      })
      .catch((error) => {
        console.error("An error occurred", error);
      });
  };

  return (
    <div className="signpage-container">
      <div className="form-container">
        <h2 className="form-heading">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            name="email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            name="password"
          />
          <button type="submit" className="form-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellSignin;
