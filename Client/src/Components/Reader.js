import React, { Component } from 'react';

class Reader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audioSentences: [],
            textSentences: [],
            toRead: props.toRead,
            currentIndex: 0,
        };
        this.audioContext = new AudioContext();
    }

    // This function is called when the component updates due to a change in props or state.
    componentDidUpdate(prevProps) {
        // Check if the 'toRead' prop has changed or if it is undefined and the new prop is defined.
        if (
            prevProps.toRead !== this.props.toRead ||
            (prevProps.toRead === undefined && this.props.toRead !== undefined)
        ) {
            // Replace all occurrences of 'AITA' with 'Am I The Asshole' and 'AH' with 'Asshole'.
            let updatedToRead = this.props.toRead.replace(/AITA/g, 'Am I The Asshole');
            updatedToRead = updatedToRead.replace(/AH/g, 'Asshole');

            // Split the updated text into an array of sentences using regular expressions.
            const slicedToRead = updatedToRead.split(/(?<=[.?!\n])/)
                .filter(slice => slice.trim() !== ''); // get rid of any empty slices

            // Set the state of the component with the updated values and generate the audio for the first sentence.
            this.setState(
                {
                    toRead: updatedToRead,
                    textSentences: slicedToRead,
                    currentIndex: 0,
                    audioSentences: [],
                },
                () => {
                    this.generateAudio();
                }
            );
        }
    }



    /**
     * Generates audio buffers from the text sentences using the text-to-speech API.
     * Populates the audioSentences state array with the generated audio buffers.
     * Calls the playAudio function after the audio buffers are generated and the state is set.
     */
    async generateAudio() {
        console.log('generateAudio called');

        // Get the text sentences and initialize an empty array to store the audio buffers.
        const { textSentences } = this.state;
        const audioSentences = [];

        try {
            // Loop through each sentence in the text and generate an audio buffer using the text-to-speech API.
            for (let i = 0; i < textSentences.length; i++) {
                if (textSentences[i]) {
                    const response = await fetch('http://localhost:5000/text-to-speech', {
                        method: 'POST',
                        body: JSON.stringify({ text: textSentences[i] }),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    // Convert the response to an array buffer and decode it into an audio buffer.
                    const arrayBuffer = await response.arrayBuffer();
                    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

                    // Push the generated audio buffer to the audioSentences array.
                    audioSentences.push(audioBuffer);
                }
            }
            // Set the audioSentences state array with the generated audio buffers and call the playAudio function.
            this.setState({ audioSentences }, () => {
                this.playAudio();
            });
        } catch (error) {
            console.log(error);
        }
    }




    /**
    * Plays the audio sentence at the current index in the array of audio buffers.
    * If there are more audio sentences, updates the current index and recursively
    * calls itself with the updated index.
    */
    playAudio() {
        // Destructure audioSentences and currentIndex from state
        const { audioSentences, currentIndex } = this.state;

        // Create a new buffer source node and set its buffer to the current audio sentence
        const source = this.audioContext.createBufferSource();
        source.buffer = audioSentences[currentIndex];

        // Connect the source to the audio destination and start playing the audio
        source.connect(this.audioContext.destination);
        source.start();

        // When the audio finishes playing, check if there are more sentences to play
        source.onended = () => {
            if (currentIndex < audioSentences.length - 1) {
                // If there are more sentences, update the current index and play the next sentence
                this.setState({ currentIndex: currentIndex + 1 }, () => {
                    this.playAudio();
                });
            } else {
                // If this was the last sentence, log a message
                console.log('Last sentence played');
            }
        };
    }

    render() {
        const { textSentences, currentIndex } = this.state;
        const currentSentence = textSentences[currentIndex];

        return (
            <div className="reader-container">
                <span className="current-sentence">{currentSentence ? currentSentence.trim() : ''}</span>
            </div>
        );
    }
}

export default Reader;
