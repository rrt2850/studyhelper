const express = require('express');
const app = express();
const tts = require('./src/TTS');

app.post('/text-to-speech', async (req, res) => {
    const { text } = req.body;
    const audioBuffer = await tts(text);
    res.set('Content-Type', 'audio/mpeg');
    res.send(audioBuffer);
});

