import React, { useState, useEffect } from 'react';
import './css/contact.css';
import BASE_URL from '../backendUrl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  const verify = async ()=> {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(`${BASE_URL}/verifyToken`,  {token});
      if(res.data.success === false) {
        navigate('/login');
      }
    } catch (error) {
      navigate('/login');
    }
  }
  useEffect(() => {
    verify();
  },[]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Message submitted:', form);
    alert('Your message has been sent!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-container">
      <div className='contact-container2'>
      <h2 className="contact-title">Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows="6"
          required
        ></textarea>
        <button type="submit" className="contact-submit">Send Message</button>
      </form>
      </div>
    </div>
  );
};

export default Contact;
