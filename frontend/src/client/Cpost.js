import React, { useState, useEffect } from "react";
import "./css/Cpost.css";
import BASE_URL from "../backendUrl";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const PostDetail = () => {
  const { username, post_id } = useParams();
  const [Username, setUsername] = useState("");

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const navigate = useNavigate();

  const verify = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(`${BASE_URL}/verifyToken`, { token });
      if (res.data.success === false) {
        navigate("/login");
      }
      setUsername(res.data.username);
    } catch (error) {
      navigate("/login");
    }
  };

  const [profile, setProfile] = useState("");

  const [post, setPost] = useState("");

  const profileImg = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/${username}`);
      setProfile(res.data.image);
    } catch (error) {
      // setProfile('https://img.freepik.com/premium-vector/businessman-cartoon-style-illustration_1234575-22.jpg')
    }
  };

  const postInfo = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/postInfo/${username}/${post_id}`
      );
      setProfile(res.data.image);
      setPost(res.data.post);
      setComments(res.data.comments);
    } catch (error) {
      alert(error.res.data.message);
    }
  };

  useEffect(() => {
    verify();
    profileImg();
    postInfo();
  }, []);

  const clickProfile = (username) => {
    // verify();
    navigate(`/userProfile/${username}`);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    const comment = {
      commenter: Username,
      content: newComment,
    };

    try {
      await axios.post(`${BASE_URL}/comment/${username}/${post_id}`, {
        newComment,
        commenter: Username,
      });
      setComments([comment, ...comments]);
      setNewComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="postdetail-container">
      <div className="postdetail-container2">
        <div className="postdetail-card">
          <div className="postdetail-card2">
            <div className="postdetail-header">
              <img src={profile} alt="profile" className="postdetail-avatar" />
              <div>
                <div
                  className="postdetail-username"
                  onClick={() => clickProfile(username)}
                >
                  {username}
                </div>
                <div className="postdetail-date">Posted on {post.date}</div>
              </div>
            </div>

            <div className="postdetail-content">{post.content}</div>
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt="Post"
                className="postdetail-image"
              />
            )}
          </div>
        </div>

        <div className="post-comment">
          <form className="comment-form" onSubmit={handleAddComment}>
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit">Comment</button>
          </form>

          <div className="comments-section">
            <h3>Comments</h3>
            {comments.map((cmt) => (
              <div key={cmt._id} className="comment">
                <strong>{cmt.commenter}: </strong> {cmt.content}
                <p>{cmt.date}</p>
                <div className="post-box"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
