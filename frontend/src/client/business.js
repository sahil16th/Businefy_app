import React, { useState, useEffect } from "react";
import "./css/business.css";
import axios from "axios";
import BASE_URL from "../backendUrl";
import { useNavigate } from "react-router-dom";

const Business = () => {
  const navigate = useNavigate();

  const verify = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(`${BASE_URL}/verifyToken`, {token});
      if (res.data.success === false) {
        navigate('/login');
      }
    } catch (error) {
      navigate('/login');
    }
  };

  useEffect(() => {
    verify();
  },[]);

  // const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [prompt, setPrompt] = useState("");
  const [showNames, setShowNames] = useState("");
  const [visibleNames, setVisibleNames] = useState(20);
  const [loading, setLoading] = useState(false);

  // Color, text color, and font family for each card
  const cardStyles = [
    { bg: "#1E1E1E", color: "#FFFFFF", font: "'Poppins', sans-serif" },
    { bg: "#2C2C2E", color: "#FF6B6B", font: "'Orbitron', sans-serif" },
    { bg: "#242424", color: "#00FFB2", font: "'Rubik', sans-serif" },
    { bg: "#1A1A1D", color: "#E0E0E0", font: "'Raleway', sans-serif" },
    { bg: "#292929", color: "#F6C90E", font: "'Inter', sans-serif" },

    { bg: "#1F1F1F", color: "#B8B8B8", font: "'Playfair Display', serif" },
    { bg: "#2D2D2D", color: "#9AE66E", font: "'Montserrat', sans-serif" },
    { bg: "#333", color: "#A0C4FF", font: "'Lora', serif" },
    { bg: "#181818", color: "#FFADAD", font: "'Josefin Sans', sans-serif" },
    { bg: "#2A2B2E", color: "#CFCFCF", font: "'Work Sans', sans-serif" },
  ];

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (prompt.trim() === "" || selected === "") {
      alert("Please enter a prompt and select a style.");
      return;
    }
    setLoading(true);
    try{
      const res = await axios.post(`${BASE_URL}/generate`, {prompt, selected});
      if(res.data.success === true){
        setShowNames(res.data.names);
        setVisibleNames(20)
      }
      setLoading(false);
    } catch (error) {
      console.log(" ")
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setVisibleNames((prev) => prev + 20);
  };

  const domainName = (name) => {
    return `https://www.godaddy.com/domains/searchresults.aspx?checkAvail=1&domainToCheck=${name}.com&isc=pltest01`
  }

  return (
    <div className="business-home-generator-container">
      <div className="post-box">
        <h1>Businefy</h1>
      </div>
      <div className="business-home-generator-main">
        <div className="business-home-generator-input-box">
          <textarea
            className="business-home-generator-textarea"
            rows={5}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="😃 Enter Your Idea here..."
          ></textarea>

          <div className="business-home-generator-style-buttons">
            {[
              "Professional",
              "Funny",
              "Trendy",
              "Creative",
              "Minimalist",
              "Luxury",
              "Techy",
              "Elegant",
              "Edgy",
            ].map((option) => (
              <button
                key={option}
                className={`business-home-generator-style-button ${
                  selected === option ? "active" : ""
                }`}
                onClick={() => setSelected(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <button
            className="business-home-generator-generate-btn"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Names"}
          </button>
        </div>

        {showNames && (
          <div className="business-home-generator-results">
            <div className="business-home-generator-name-grid">
              {showNames.slice(1, visibleNames+1).map((name, index) => {
                const style = cardStyles[index % cardStyles.length];
                return (
                  <div
                    key={index}
                    className="business-home-generator-name-card"
                    style={{
                      backgroundColor: style.bg,
                      color: style.color,
                      fontFamily: style.font,
                    }}
                  >
                    <h3 className="business-home-generator-brand-name">
                      {name}
                    </h3>
                    <button onClick={() => window.open(domainName(name))} className="business-home-generator-domain-btn">
                      Buy Now
                    </button>
                  </div>
                );
              })}
            </div>

            {visibleNames < showNames.length && (
              <button 
                className="business-home-generator-load-more"
                onClick={handleLoadMore}
              >
                Load More
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Business;
