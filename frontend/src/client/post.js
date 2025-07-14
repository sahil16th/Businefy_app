import React, { useState, useEffect } from "react";
import "./css/createPost.css";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../backendUrl";
import axios from "axios";
import ExploreQuote from "./component/ExploreQuote";
import SearchBar from "./component/Search";

const CreatePost = () => {
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

  useEffect(() => {
    verify();
  }, []);

  const [image, setImage] = useState(null);
  const [images, setImages] = useState(null);
  const [imageName, setImageName] = useState("");
  const [text, setText] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImages(URL.createObjectURL(file));
    setImageName(file ? file.name : "image");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text) {
      alert("where is text?");
    }

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("text", text);
    formData.append("token", token);

    setUploading(true);

    try {
      const res = await axios.post(`${BASE_URL}/post`, formData);
      if (res.data.success === true) {
        alert(res.data.message);
      }
    } catch (error) {
      alert(error.res.data.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="createpost-container">
      <div className="createpost-container2">
        <h2 className="createpost-heading">Create a New Post</h2>
        {/* <div className="post-box"></div> */}
        <form className="createpost-form" onSubmit={handleSubmit}>
          <textarea
            name="content"
            placeholder="Write your content here..."
            className="createpost-textarea"
            rows="6"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
          <div className="post-upload-image">
          <label htmlFor="createpost-file" className="image-Upload-logo">
            <span>➕</span>
          </label>
          {/* {imageName && <span className="image-filename">{imageName}</span>} */}
          {imageName && <img src={images} alt=""/>}
          </div>
          <input
            type="file"
            name="image"
            id="createpost-file"
            accept="image/*"
            className="createpost-file"
            onChange={handleImageChange}
          />
          <button
            type="submit"
            className="createpost-button"
            disabled={uploading}
          >
            {uploading ? "Uploading" : "Post"}
          </button>
        </form>
      </div>
      <div className="create-post-container">
        <div className="create-post-explore">
          <ExploreQuote />
        </div>
        <div className="create-post-search">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
