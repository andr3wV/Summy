const express = require('express');
const cors = require('cors');
const openai = require('openai');
const dotenv = require('dotenv');

dotenv.config();

openai.apiKey = process.env.OPENAI_API_KEY;

const app = express();
app.use(cors());
app.use(express.json());

app.post('/summarize', async (req, res) => {
    const text = req.body.text;

    const messages = [
        {
            role: 'system',
            content: 'You are an AI that summarizes text. Summarize the following text:',
        },
        { role: 'user', content: text },
    ];

    try {
        const completion =  await openai.createCompletion({
            model: 'gpt-3.5-turbo',
            messages: messages,
        });

        //data.choices[0].message.content
        const summary = completion.choices[0].message.content.trim();
        res.json({ summary });
    } catch (error) {
        console.error('Error summarizing text:', error);
        res.status(500).json({ error: 'Error summarizing text. Please try again.' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});