import React, { useState, useEffect } from "react";
import "./css/login.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import BASE_URL from "../backendUrl";


const Register = () => {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const verify = async () => {
      try {
        const res = await axios.post(`${BASE_URL}/verifyToken`, {token});
        if(res.data.success === true){
          navigate('/home');
        }
      } catch(error){
        console.log(error.response.data.message);
      }
    }
    verify();
  },[])

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.email || !formData.password) {
      alert('fill the form correctly')
    }
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/register`, formData); // ✅ Fix request type
      alert(res.data.message);
      const data = { email: formData.email.toLowerCase() };
      navigate('/otp', { state: data});
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="login">
      <div className="login-background">
        <div className="login-shape"></div>
        <div className="login-shape"></div>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h3 className="register">Register Here</h3>

        <label htmlFor="email">Email</label>
        <input
        name="email"
          type="email"
          placeholder="📧 Enter your email..."
          id="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
        name="password"
          type="password"
          placeholder="🔑 Enter your password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />

        <div className="login-blank">
          {/* <p><a href="/login" className="login-signup-button">forget password?</a></p> */}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Join Our Community!"}</button>

        
        <div className="login-signup">
          <p>
            Already have an account?{" "}
            <a href="/login" className="login-signup-button">
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
