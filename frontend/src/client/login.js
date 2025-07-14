import React, { useState, useEffect } from "react";
import "./css/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../backendUrl";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
 
  useEffect(() => {
    const token = localStorage.getItem("token");
    const verify = async () => {
      try {
        const res = await axios.post(`${BASE_URL}/verifyToken`, {
          token,
        });
        if (res.data.success === true) {
          navigate("/home");
        }
      } catch (error) {
        console.log("");
      }
    };
    verify();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const res = await axios.post(`${BASE_URL}/login`, formData);
      if (res.data.success === false) {
        console.log(res.data.message);
        alert(res.data.message);
      } else {
        const token = res.data.AuthToken;
        localStorage.setItem("token", token);
        navigate("/home");
      }
    } catch (error) {
      // alert(res.data.message);
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message); // ✅ correct way to access error message
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="login">
      <div className="login-background">
        <div className="login-shape"></div>
        <div className="login-shape"></div>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h3>Login Here</h3>

        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="text"
          placeholder="Email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />

        <div className="login-forget-password">
          <p>
            <a href="/forget-password" className="login-signup-button">
              forget password?
            </a>
          </p>
        </div>

        <button type="submit">Log In</button>

        
        <div className="login-signup">
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="login-signup-button">
              Signup
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
