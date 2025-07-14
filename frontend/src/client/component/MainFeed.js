import React from "react";
import { useState, useEffect } from "react";
import "../css/feed.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../backendUrl";
import ExploreQuote from "./ExploreQuote";
import SearchBar from "./Search";

const MainFeed = () => {
  const navigate = useNavigate();

  const verify = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(`${BASE_URL}/verifyToken`, { token });
      if (res.data.success === false) {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
    }
  };

  const [posts, setPosts] = useState([]);

  const mainfeed = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/mainfeed`);
      if (res.data.success === true) {
        setPosts(res.data.posts);
      }
    } catch (error) {
      alert(error.res.data.message);
    }
  };

  useEffect(() => {
    mainfeed();
  }, []);

  const clickPost = (username, post_id) => {
    verify();
    navigate(`/post/${username}/${post_id}`);
  };

  const clickProfile = (username) => {
    verify();
    navigate(`/userProfile/${username}`);
  };

  return (
    <div className="main-feed-explore">
      <div className="main-feed">
        <div className="post-box">
          <h1>Explore</h1>
        </div>

        {/* <div className="post-box"></div> */}

        <div className="tweet-grid">
          {posts.map((post) => (
            <div
              className="tweet"
              key={post._id}
            >
              <div className="tweet-header">
                <img src={post.userImage} alt="Profile" className="avatar" />
                <div className="data">
                  <span
                    className="data-username"
                    onClick={() => clickProfile(post.username)}
                  >
                    {post.username}
                  </span>
                  <span className="data-date">{post.date}</span>
                </div>
              </div>
              <div className="tweet-body" 
              onClick={() => clickPost(post.username, post.post_id)}
              >
                <p>{post.content}</p>
                <img src={post.imageUrl} alt="" />
              </div>
              <div className="tweet-footer">
                <span>{post.commentNo} 💬 comments</span>
              </div>
              {/* <div className="post-box"></div> */}
            </div>
          ))}
        </div>
      </div>

      <div className="feed-searchBar">
        <div className="explore-feed-box">
          <ExploreQuote />
        </div>
        <div className="explore-Quote-box">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default MainFeed;