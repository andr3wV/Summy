const axios = require('axios');
const { response } = require('express');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const text = req.body.text;

    if (!text) {
      res.status(400).json({ message: 'No text provided.' });
      return;
    }

    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          system: 'You are an AI that summarizes text. Summarize all of the following text',
        },
        { role: 'user', content: text },
      ],
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

      res.status(200).json({ summary: response.data.choices[0].message.content });
    } catch (error) {
        console.log(response.data.error);
      res.status(500).json({ message: 'Error summarizing text. Please try again later.2' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};