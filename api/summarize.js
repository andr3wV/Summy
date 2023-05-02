const axios = require('axios');

module.exports = async (req, res) => {
  var textArray = [];
  if (req.method === 'POST') {
    var fullText = req.body.text;
    
    if (!fullText) {
      res.status(400).json({ message: 'No text provided.' });
      return;
    }
    
    // Splice text into an object for OpenAI - every new line is a new index in an array
    fullText = fullText.split(/\n+/);
    for(let i = 0; i < fullText.length; i++) {
      var text = fullText[i];
      const data = {
          "model": "gpt-3.5-turbo",
          "messages": [
              {
                  "role": "system",
                  "content": "You are an AI that summarizes text. Summarize all of the following text"
              },
              {
                  "role": "user", 
                  "content": text
              }
          ]
      };

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      };

      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          data,
          { headers }
        );
          textArray.push(response.data.choices[0].message.content);
      } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Error summarizing text. Please try again later.', error: error.message });
      }
    }
    res.status(200).json({ summary: textArray.join('\n') });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};