const axios = require('axios');
const GROQ_API_KEY = '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';


const chat = async (req, res) => {
  const { message, history } = req.body;
  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-70b-8192',
        messages: [...history, { role: "user", content: message }, {role : "system", content: "you are a business advisor, and answer accurately and shorter phrases like a real human"}]
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Groq API error" });
  }
};

module.exports = chat;
