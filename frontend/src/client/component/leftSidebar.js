import React from "react";
import "../css/feed.css";
import { useNavigate } from "react-router-dom";

const LeftSidebar = () => {
  const menu = [
    { name: "Home", logo: "🏠" },
    { name: "Explore", logo: "🌍" },
    { name: "Search", logo: "🔍" },
    { name: "Chat", logo: "🧠" },
    { name: "Create", logo: "➕" },
    { name: "Profile", logo: "👤" },
    { name: "Help", logo: "❓" },
    { name: "Contact", logo: "📞" },
    { name: "", logo: "" },
    { name: "", logo: "" },
    { name: "", logo: "" },
  ];

  const navigate = useNavigate();

  const click = (link) =>{
    navigate(`/${link}`);
  }

  const logOut = () => {
    localStorage.removeItem("token");
    navigate('/login');
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">B</div>
      {menu.map((item, index) => (
        <div onClick={() => click(item.name)} className="sidebar-item" key={index}>
          <div className="sidebar-item-logo">{item.logo}</div>
          <div className="sidebar-item-name">{item.name}</div>
        </div>
      ))}
      <div className="post-btn-logo" onClick={logOut}>🔓</div>
      <button className="post-btn" onClick={logOut}>Log Out</button>
    </aside>
  );
};

export default LeftSidebar;
