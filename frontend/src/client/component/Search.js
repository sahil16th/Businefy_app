import React, { useState, useEffect } from "react";
import "../css/searchBar.css";
import axios from "axios";
import BASE_URL from "../../backendUrl";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const[user, setUser] = useState([]);

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

  const users = async () => {
    try{
      const res = await axios.get(`${BASE_URL}/search`);
      setUser(res.data.result);
    } catch(error){
      console.log("")
    }
  } 

  useEffect(() => {
    verify();
    users();
  },[]);
  
  const handleClick = (item) => {
    navigate(`/userProfile/${item.username}`);
  };

  const filteredNames = user.filter((item) =>
    item.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="explores-business-searchBar">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="post-box"></div>
      
      {searchTerm && ( 
      <ul className="search-results" >
        {filteredNames.map((item, index) => (
          <li
            key={index}
            className="search-item"
            onClick={() => handleClick(item)}
          >
            <img
              src={item.image} // Make sure each item has `imageUrl`
              alt={item.username}
              className="profile-img"
            />
            <span>{item.username}</span>
          </li>
        ))}
      </ul>
      )}

    </div>
  );
};
export default SearchBar;