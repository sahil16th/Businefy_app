import React, { useState } from "react";
import "./css/home.css";
import logo from "./Assets/logo.png";
import about from "./Assets/about.png";
import video from "../client/Assets/video1.mp4";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const options = [
    "Professional",
    "Funny",
    "Trendy",
    "Creative",
    "Minimalist",
    "Luxury",
    "Techy",
    "Elegant",
    "Edgy",
  ];

  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  const login = () => {
      navigate("/signup");  
  }

  return (
    <div className="home">
      <div className="home-Header">
        <div className="home-logo">
          <img src={logo} alt="logo" />
        </div>

        <div className={`home-nav ${menuOpen ? "active" : ""}`}>
          <li><a href="/home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="/blogs">Blogs</a></li>
          <li><a href="#contact">Contact</a></li>
          <button onClick={login} className="join-btn">Join us</button>
        </div>

        {/* Hamburger menu icon */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
      <div className="home-business">
        <div className="home-heading">
          <h1>
            Find the Perfect <spam className="home-name">Name</spam> for Your
            Business
          </h1>
          <p>
            Enter your idea or prompt and let AI generate unique, brand-ready
            names in seconds
          </p>
        </div>
        <div className="home-textbox">
          <textarea
            className="home-text"
            rows={5}
            placeholder="😃 Enter Your Idea here..."
          ></textarea>
          <div className="button-group">
            {options.map((option) => (
              <button
                key={option}
                className={`select-button ${
                  selected === option ? "active" : ""
                }`}
                onClick={() => setSelected(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="home-button"></div>
      </div>

      <div className="home-video">
        <video src={video} autoPlay muted playsInline loop />
      </div>

      <div className="home-about">
        <div className="home-aboutus" id="about">
          <h1>About Us</h1>
        </div>
        <div className="home-desc">
          <p>
            At Businefy, we believe every great idea deserves a powerful name.
            Whether you're starting a business, launching a product, or building
            a brand, your name is the first impression — and we help you make it
            unforgettable
          </p>
          <div className="home-about-list">
            <div className="home-list">
              <li>⚡ Instant suggestions tailored to your input</li>
              <li>🎯 Creative, brandable, and unique names</li>
              <li>💡 Perfect for startups, apps, blogs, and more</li>
              <li>🌍 Absolutely free to use!</li>
              <li>📝 Share your thoughts with others</li>
            </div>
            <img className="home-about-image" src={about} alt="about-image" />
          </div>
        </div>
      </div>

      <div className="center-line"></div>

      <div className="home-about" id="contact">
        <div className="home-aboutus">
          <h1>Contact Us</h1>
        </div>
        <div className="home-contact">
          {/* <img className="home-about-image" src={contact} alt="about-image" /> */}
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email Address" required />
            <input type="text" placeholder="Subject (Optional)" />
            <textarea placeholder="Write your message..." required></textarea>
            <button className="button-66" type="submit">Send Message</button>
          </form>
        </div>
      </div>

       <footer className="site-footer">
      <div className="footer-logo">
        <img src={logo} alt="Logo" />
      </div>

      <ul className="footer-nav">
        <li>Home</li>
        <li>About</li>
        <li>Blogs</li>
        <li>Contact</li>
      </ul>

      <p className="footer-copy">© {new Date().getFullYear()} Businefy. All rights reserved.</p>
    </footer>
    </div>
  );
};

export default Home;
