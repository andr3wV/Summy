const express = require('express');
const cors = require('cors');   
const dotenv = require('dotenv');
const {Configuration, OpenAIApi} = require('openai');
const app = express();

dotenv.config({ path: '../.env' }); //loads .env file from parent directory
app.use(cors());
app.use(express.json());

app.post('/summarize', async (req, res) => {
    const text = req.body.text;
    console.log('Server received text:', text);

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY
    });

    const openai = new OpenAIApi(configuration);

    const messages = [
        {
            role: 'system',
            content: 'You are an AI that summarizes text. Summarize all of the following text:',
        },
        { role: 'user', content: text || 'No text provided.' },
    ];

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
         });
        const summary = completion.data.choices[0].message.content;
        res.json({ summary });
    } catch (error) {
        console.error('Server error summarizing text:', error);
        res.status(500).json({ error: 'Error summarizing text. Please try again.' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});