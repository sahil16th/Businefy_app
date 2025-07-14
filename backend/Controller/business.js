const User = require('../MongoDB/model');
const axios = require('axios');
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

const generateNames = async (req, res) => {
  const { prompt, selected } = req.body;
  const style = selected;
  console.log(prompt)
  console.log(style) 

  if (!prompt || !style) {
    return res.status(400).json({ success: false, message: "Prompt and style are required" });
  }

  const mergedPrompt = `Generate 150 unique, brandable business names based on this idea: "${prompt}", with a "${style}" style. Only return the names(1-2 word) as a list without any extra explanation(just names), I don't even want the single name jut pure names`;

  try {
    const response = await axios.post(
      GROQ_URL,
      {
        model: "llama3-70b-8192",
        messages: [
          { role: "system", content: "You are a brand name generator AI." },
          { role: "user", content: mergedPrompt }
        ],
        temperature: 0.9
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const text = response.data.choices[0].message.content;
    const names = text
      .split("\n")
      .map(line => line.replace(/^\d+[\.\)]?\s*/, "").trim())
      .filter(name => name.length > 0);

    res.json({ success: true, names });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Failed to generate names" });
  }
};

module.exports = generateNames;