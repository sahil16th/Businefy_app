import React from "react";
import "./css/login.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BASE_URL from "../backendUrl";
import axios from 'axios';

const ChangePassword = () => {
  const location = useLocation();
  const data = location.state;
  const email = data?.email || "";
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    password: '',
    ConfirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { password, ConfirmPassword } = formData;

    if(password !== ConfirmPassword) {
      alert("Password do not match");
      return;
    }
    // alert(email);
    setLoading(true);
    try{
      const res = await axios.post(`${BASE_URL}/changePassword`, {
        email,
        password
      });
      if (res.data.success === true) {
        alert("Password changed successfully!");
        navigate("/login");
      } else {
        alert(res.data.message || "Something went wrong.");
      }
      
    } catch(error) {
        alert(error.response?.data?.message || "Failed to change password.");
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className="login">
      <div className="login-background">
        <div className="login-shape"></div>
        <div className="login-shape"></div>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h3 className="register">Enter New Password</h3>

        <label htmlFor="username">Password</label>
        <input name="password" type="text" placeholder="🔑 passowrd" id="username" value={formData.password} onChange={handleChange}/>

        <label htmlFor="password">Confirm Password</label>
        <input name="ConfirmPassword" type="text" placeholder="🔑 confirm password" id="password" value={formData.ConfirmPassword} onChange={handleChange}/>
          
        <div className="login-blank">
            {/* <p><a href="/login" className="login-signup-button">forget password?</a></p> */}
        </div>
        <button type="submit" disabled={loading}>{loading ? "Updating..." : "Change Password"}</button>
      </form>
    </div>
  );
};

export default ChangePassword;