// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Serverer statiske filer fra mappen "public"
app.use(express.static(path.join(__dirname, 'public')));

// Standard route til forsiden
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server kører på port ${PORT}`);
});