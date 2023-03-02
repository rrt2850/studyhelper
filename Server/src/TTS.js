// Import the required libraries
const fs = require('fs');
const textToSpeech = require('@google-cloud/text-to-speech');
require('dotenv').config();

// Instantiates a client
const client = new textToSpeech.TextToSpeechClient();

// The text to synthesize
const text = "let me see that thug shaker. That Rump Shaker. Let me see that ass, I know you got one. I bet you got a thug ass";

// Construct the request
const request = {
    input: { text: text },
    // Select the language and SSML Voice Gender (optional)
    voice: { languageCode: 'en-US', ssmlGender: 'MALE' },
    // Select the type of audio encoding
    audioConfig: { audioEncoding: 'MP3' },
};

// Performs the Text-to-Speech request
client.synthesizeSpeech(request, (err, response) => {
    if (err) {
        console.error('Error:', err);
        return;
    }

    // Write the binary audio content to a local file
    fs.writeFile('output.mp3', response.audioContent, 'binary', err => {
        if (err) {
            console.error('Error:', err);
            return;
        }
        console.log('Audio content written to file: output.mp3');
    });
});


