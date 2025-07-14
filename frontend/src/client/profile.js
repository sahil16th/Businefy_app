import React, { useState, useEffect } from "react";
import "./css/profile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../backendUrl";
import ExploreQuote from "./component/ExploreQuote";
import SearchBar from "./component/Search";

const Profile = () => {
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

  const [profile, setProfile] = useState("");
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);

  const profileImg = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${BASE_URL}/profile/${token}`);
      setProfile(res.data.image);
      setUser(res.data.username);
    } catch (error) {
      // setProfile('https://img.freepik.com/premium-vector/businessman-cartoon-style-illustration_1234575-22.jpg')
    }
  };

  const Userposts = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(`${BASE_URL}/posts/${token}`);
      if (res.data.success === true) {
        setPosts(res.data.posts);
      }
    } catch (error) {}
  };

  useEffect(() => {
    verify();
    profileImg();
    Userposts();
  }, []);

  const [passwords, setPasswords] = useState({ current: "", new: "" });
  const username = user;

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfile(URL.createObjectURL(file));
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await axios.post(
          `${BASE_URL}/profileImg/${token}`,
          formData
        );
        if (res.data.success === true) {
          alert("Uploaded successfully");
        }
      } catch (error) {
        // alert(error.res.data.message);
      }
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    console.log("Password changed:", passwords);
    setPasswords({ current: "", new: "" });

    if (passwords.current !== passwords.new) {
      alert("Password do not match");
    }

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `${BASE_URL}/updatePassword/${token}`,
        passwords
      );
      if (res.data.success === true) {
        alert(res.data.message);
      }
    } catch (error) {
      alert(error.res.data.message);
    }
  };

  const clickPost = (post_id) => {
    navigate(`/post/${user}/${post_id}`);
  };

  return (
    <div className="profile-container">
      <div className="profile-container2">
        <h1>Profile</h1>
        <div className="post-box"></div>

        <div className="profile-top">
          <div className="profile-image-section">
            <img src={profile} alt="Profile" className="profile-image" />
            <label
              htmlFor="profile-image-upload"
              className="profile-upload-btn"
            >
              ➕
            </label>
            <input
              type="file"
              id="profile-image-upload"
              accept="image/*"
              className="profile-file"
              onChange={handleProfileImageChange}
            />
          </div>

          <div className="profile-info">
            <h2 className="profile-username">{user}</h2>

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
            </form>
          </div>
        </div>

        <div className="profile-posts">
          <h2>Your Posts</h2>
          {posts.map((post) => (
            <div
              key={post._id}
              className="profile-post"
              onClick={() => clickPost(post._id)}
            >
              <div className="profile-post-containet2">
                <div className="profile-post-header">
                  <img
                    src={profile || ""}
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

export default Profile;