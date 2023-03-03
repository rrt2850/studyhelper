/**
 * TTS.js
 * @author Robert Tetreault
 * @summary Recieves text through a post command and converts it to speech
 *          using the google cloud api
 */

const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const textToSpeech = require('@google-cloud/text-to-speech');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

require('dotenv').config();

const port = 5000;
const client = new textToSpeech.TextToSpeechClient();

/**
 * @function synthesizeText: Takes text and converts it into speech
 * @param {String} text: The text to synthesize
 * @returns an array buffer containing the audio data
 */
async function synthesizeText(text) {
    // Format the request json to send to the api
    const request = {
        "audioConfig": {
            "audioEncoding": "LINEAR16",
            "effectsProfileId": [
                "small-bluetooth-speaker-class-device"
            ],
            "pitch": 0,
            "speakingRate": 1.15
        },
        "input": {
            text: text
        },
        "voice": {
            "languageCode": "en-US",
            "name": "en-US-Neural2-J"
        }
    };

    

    // Wait until the api finishes
    const [response] = await client.synthesizeSpeech(request);

    // Return audio data
    return response.audioContent;
}

/**
 * POST endpoint to convert text to speech
 * @param {Object} req - Request object
 * @param {string} req.body.text - Text to be converted to speech
 * @param {Object} res - Response object
 * @returns {Promise<Object>} - Returns a Promise which resolves to the audio file as a Buffer
 * @throws {Error} - Throws an error if the server encounters an issue while processing the request
 */
app.post('/text-to-speech', async (req, res) => {
    try {
        const text = req.body.text;
        const audioContent = await synthesizeText(text);
        console.log("text converted");
        res.set({ 'Content-Type': 'audio/mp3' });
        res.send(audioContent);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

/**
 * Starts the server on the specified port
 * @param {number} port - Port number to start the server on
 */
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
