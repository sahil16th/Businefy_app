import React from "react";
import "../css/explorePage.css";
import quote from "quote";
import { useState, useEffect } from "react";

const ExploreQuote = () => {
  const [quoteData, setQuoteData] = useState({ text: "", author: "" });
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch("https://api.quotable.io/random");
        const data = await res.json();
        setQuoteData({ text: data.content, author: data.author });
      } catch (error) {
        console.error("Failed to fetch quote:", error);
        setQuoteData({
          text: "You're amazing. Keep going!",
          author: "Anonymous",
        });
      }
    };

    fetchQuote();
  }, []);

  return (
    <div className="explore-Quote">
      <div className="posts-box">
        <h2>Day in a life</h2>
      </div>
      <div className="explore-Quote-container">
        <div className="explore-2">
          <h2>Quote of the Day</h2>
        </div>

        <div className="Quote-container">
          <div className="Quote-box">
            <p>Success is not final, failure is not fatal: </p>
            <p> It is the courage to continue that counts."</p>
            <p> — Winston Churchill</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreQuote;
