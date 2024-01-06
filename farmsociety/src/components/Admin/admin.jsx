import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css"

const Admin = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navi = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      name,
      password,
    };

    fetch("http://127.0.0.1:8000/admins/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
            navi(`/adminDash/`); // Parse the JSON response
        } else {
          console.error("Sign In failed");
          throw new Error("Sign In failed");
        }
      })
      
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
