import React, { useState, useEffect } from "react";
import "./css/message.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../backendUrl";

const Messaging = () => {
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

  const [messages, setMessages] = useState([
    { from: "other", text: "Hi! What's on your mind? Need some business advice?" },
    // { from: "me", text: "Hi! How are you?" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  // const sendMessage = () => {
  //   if (newMessage.trim() === "") return;
  //   setMessages([...messages, { from: "me", text: newMessage }]);
  //   setNewMessage("");
  // };

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    const userMessage = { from: "me", text: newMessage };
    setMessages((prev) => [...prev, userMessage]); // Show user message immediately
    setNewMessage("");

    try {
      const res = await axios.post(`${BASE_URL}/chat`, {
        message: newMessage,
        history: messages.map((m) => ({
          role: m.from === "me" ? "user" : "assistant",
          content: m.text,
        })),
      });

      const aiReply = res.data.reply || "AI did not respond.";
      setMessages((prev) => [...prev, { from: "other", text: aiReply }]);
    } catch (error) {
      console.error("Error from backend:", error);
      setMessages((prev) => [
        ...prev,
        { from: "other", text: "Error contacting AI." },
      ]);
    }
  };
 
  return (
    <div className="message-container max-w-md mx-auto h-screen flex flex-col bg-white border shadow-md">
      <div className="message-header p-4 bg-blue-600 text-white text-lg font-bold">
        Chat with AI
      </div>
      <div className="post-box"></div>

      <div className="message-body flex-1 overflow-y-auto p-4 space-y-3 bg-gray-100">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-bubble p-3 rounded-lg max-w-xs ${
              msg.from === "me"
                ? "bg-blue-500 text-white self-end message-from-me"
                : "bg-white text-black self-start message-from-other border"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="message-footer p-3 bg-white border-t flex items-center gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="message-input flex-1 p-2 border rounded-lg outline-none"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="message-send-btn bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Messaging;
