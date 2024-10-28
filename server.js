// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.static('public')); // Server 'index.html' som frontend

// Chatbot endpoint til at modtage brugerbeskeder og sende dem til OpenAI API
app.post('/api/chat', async (req, res) => {
    const { userMessage } = req.body;

    const messages = [
        { role: 'system', content: 'Skriv på tysk' }, // Automatisk prompt-tilpasning
        { role: 'user', content: userMessage }
    ];

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // Sikret API-nøgle
            },
            body: JSON.stringify({
                model: 'gpt-4', // Juster modellen, hvis nødvendigt
                messages: messages
            })
        });

        const data = await response.json();
        const botMessage = data.choices[0].message.content;
        res.json({ botMessage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'En fejl opstod, prøv venligst igen senere.' });
    }
});

app.listen(PORT, () => {
    console.log(`Serveren kører på port ${PORT}`);
});
