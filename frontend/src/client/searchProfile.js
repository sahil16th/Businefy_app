import React, { useState, useEffect } from 'react';
import './css/profile.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BASE_URL from '../backendUrl';
import ExploreQuote from './component/ExploreQuote';
import SearchBar from './component/Search';

const SearchProfile = () => {
  const navigate = useNavigate();
  const { username } = useParams();

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

  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState([]);

  const users = username;

  const userDetail = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/userProfile`, {users});
      if(res.data.success) {
        setUserData(res.data.user);
        setPosts(res.data.posts);
      }
    } catch (error) {
      console.log("");
    }
  }

  useEffect(() => {
    verify();
    userDetail();
  },[]);

  const clickPost = (postid)=> {
    navigate(`/post/${userData.username}/${postid}`);
  }

  return (
    <div className="profile-container">
      <div className="profile-container2">
        <h1>Profile</h1>
        <div className="post-box"></div>

        <div className="profile-tops">
          <div className="profile-image-section">
            <img src={userData.image} alt="Profile" className="profile-image" />
            {/* <label
              htmlFor="profile-image-upload"
              className="profile-upload-btn"
            >
              ➕
            </label> */}
            {/* <input
              type="file"
              id="profile-image-upload"
              accept="image/*"
              className="profile-file"
              onChange={handleProfileImageChange}
            /> */}
          </div>

          <div className="profile-infos">
            <h2 className="profile-username">{username}</h2>
            {/* 
            <form
              className="profile-password-form"
              onSubmit={handlePasswordSubmit}
            >
              <input
                type="password"
                name="current"
                value={passwords.current}
                onChange={handlePasswordChange}
                placeholder="Current Password"
                required
              />
              <input
                type="password"
                name="new"
                value={passwords.new}
                onChange={handlePasswordChange}
                placeholder="New Password"
                required
              />
              <button type="submit">Change Password</button>
            </form> */}
          </div>
        </div>

        <div className="profile-posts">
          <h2>Your Posts</h2>
          {posts.slice().reverse().map((post) => (
            <div
              key={post._id}
              className="profile-post"
              onClick={() => clickPost(post._id)}
            >
              <div className="profile-post-containet2">
                <div className="profile-post-header">
                  <img
                    src={userData.image || ""}
                    alt="Profile"
                    className="profile-post-avatar"
                  />
                  <div>
                    <div className="profile-post-username">{username}</div>
                    <div className="profile-post-date">{post.date}</div>
                  </div>
                </div>
                <div className="profile-post-container3">
                  <div className="profile-post-content">{post.content}</div>
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt="Post"
                      className="profile-post-image"
                    />
                  )}
                </div>
                <div className="profile-post-footer">
                  💬 {post.commentNo} Comments
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="profile-section-Quote">
        <div className="profile-Explore-Quote"><ExploreQuote/></div>
        <div className="profile-Search-Bar"><SearchBar/></div>
      </div>
    </div>
  );
};

export default SearchProfile;