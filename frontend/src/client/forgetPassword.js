import React from "react";
import "./css/login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../backendUrl";
import axios from 'axios';

const Forgetpassword = () => {
  const [inputvalue, setInputValue] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/forgetpassword`, {
        email: inputvalue
      })

      if(res.data.success === true) {
        alert(res.data.message);
        navigate('/verify-email', {
          state : {
            email : inputvalue
          }
        })
      }
    } catch(error) {
      alert("Error, Please try again later")
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login">
      <div className="otp-background">
        <div className="login-shape"></div>
        <div className="login-shape"></div>
      </div>

      <form className="otp-form" onSubmit={handleSubmit}>
        <h3 className="register">Enter Your Email</h3>

        <label htmlFor="otp">Email</label>
        <input type="email" value={inputvalue} placeholder="📧 Enter your email" id="username" onChange={(e) => setInputValue(e.target.value)}/>

        <button type="submit" disabled={loading}>{loading ? "Verifying..." : "Verify Now!"}</button>
      </form>
    </div>
  );
};

export default Forgetpassword;