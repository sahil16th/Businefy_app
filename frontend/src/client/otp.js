import React from "react";
import "./css/login.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import BASE_URL from "../backendUrl";

const OTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const[loading, setLoading] = useState(false);

  const verify = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(`${BASE_URL}/verifyToken`, { token });
      if (res.data.success === true) {
        navigate("/home");
      }
    } catch (error) {}
  };

  useEffect(() => {
    verify();
  }, []);

  const email = data?.email;

  const [formData, setFormData] = useState({
    email: email || "",
    otp: "",
  });

  useEffect(() => {
    if (email) {
      setFormData((prev) => ({ ...prev, email }));
    }
  }, [email]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ Prevent page refresh
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/otp`, formData);
      if (res.data.success === true) {
        alert("Verification successful")
        navigate("/login");
      }
    } catch (error) {
      setLoading(false);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="login">
      <div className="otp-background">
        <div className="login-shape"></div>
        <div className="login-shape"></div>
      </div>

      <form className="otp-form" onSubmit={handleSubmit}>
        <h3 className="register">Verify Your Email</h3>

        <label htmlFor="otp">Enter one time password</label>
        <input
          name="otp"
          type="text"
          inputMode="numeric"
          pattern="\d{6}"
          maxLength={6}
          placeholder="📧 Enter your OTP"
          id="otp"
          value={formData.otp}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>{loading ? "Verifing..." : "Verify Now!"}</button>
      </form>
    </div>
  );
};

export default OTP;
