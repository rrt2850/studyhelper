/**
 * Reader.js
 * @author Robert Tetreault
 * @summary Gets a text input from Inputs.js, converts it to speech and plays it.
 */

import React, { Component } from 'react';
import $ from 'jquery';

export class Reader extends Component {
    
    // Called whenever props are passed from App.js to here
    constructor(props) {
        super(props);
        this.state = {
            toRead: props.toRead
        };
    }

    // Called whenever prevProps changes
    componentDidUpdate(prevProps) {

        // If toRead has changed it means the start button was pressed
        // Maybe change later incase user wants to read same message twice
        if (prevProps.toRead !== this.props.toRead) {

            // Use jquery to send the new text to the backend
            $.ajax({
                url: 'http://localhost:5000/text-to-speech',
                method: 'POST',
                data: { text: this.props.toRead },
                xhrFields: {
                    // Expect an arraybuffer containing the audio
                    responseType: 'arraybuffer'
                },
                success: function (response) {
                    // play the audio
                    console.log("recieved audio");
                    const context = new AudioContext();
                    context.decodeAudioData(response, function (buffer) {
                        const source = context.createBufferSource();
                        source.buffer = buffer;
                        source.connect(context.destination);
                        source.start(0);
                    });
                },
                error: function (error) {
                    console.log(error);
                }
            });
            this.setState({ toRead: this.props.toRead });
        }
    }

    render() {
     return<></>   
    }
}

export default Reader;
