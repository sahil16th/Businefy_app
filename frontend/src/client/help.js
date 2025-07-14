import React, { useState, useEffect } from 'react';
import './css/help.css';
import axios from 'axios';
import BASE_URL from '../backendUrl';
import { useNavigate } from 'react-router-dom';

const faqs = [
  {
    question: "How do I reset my password?",
    answer: "Click on your profile, go to 'Change Password', and follow the instructions.",
  },
  {
    question: "How do I upload a profile picture?",
    answer: "Go to your profile page and click on the 'Upload Image' button to choose a photo.",
  },
  {
    question: "How can I delete my account?",
    answer: "Please contact support via the Contact page to request account deletion.",
  },
  {
    question: "Why can't I see my posts?",
    answer: "Make sure you're logged in. If the issue persists, try refreshing the page or contact support.",
  },
];

const Help = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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

  return (
    <div className="help-container">
      <div className='help-container2'>
      <h2 className="help-title">Help & FAQ</h2>
      <div className='post-box'></div>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div
              className={`faq-question ${openIndex === index ? 'active' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span>{openIndex === index ? '-' : '+'}</span>
            </div>
            {openIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};
export default Help;