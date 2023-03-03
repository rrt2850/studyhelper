import React, { Component } from 'react';

const audioContext = new AudioContext();

export class Reader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            words: [],
            toRead: props.toRead,
            currentIndex: 0,
        };
        this.audioBuffer = null;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.toRead !== this.props.toRead || (prevProps.toRead === undefined && this.props.toRead !== undefined)) {

            let updatedToRead = this.props.toRead.replace(/AITA/g, 'Am I The Asshole');
            updatedToRead = updatedToRead.replace(/AH/g, 'Asshole')
            this.setState({
                toRead: updatedToRead,
                currentIndex: 0
            }, () => {
                this.generateAudio();
            });
        }
    }


    async generateAudio() {
        console.log('generateAudio called');
        const { toRead } = this.state;
        try {
            const response = await fetch('http://localhost:5000/text-to-speech', {
                method: 'POST',
                body: JSON.stringify({ text: toRead }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
            console.log("got response");
            this.audioBuffer = audioBuffer;
            await this.calculateSegments();
            this.playNextSegment();
        } catch (error) {
            console.log(error);
        }
    }


    async calculateSegments() {
        return new Promise(resolve => {
            let words = [];
            if (typeof this.state.toRead === 'string') {
                words = this.state.toRead.split(' ');
            }
            const segments = [];
            let offset = 0;
            words.forEach((word) => {
                const duration = word.length / 10;
                const start = offset;
                const end = start + duration;
                segments.push({ word, start, end }); // create new object with word property
                offset = end;
            });
            this.setState({ words: segments }, () => {
                console.log('State updated:', this.state.words);
                resolve();
            });
        });
    }


    playNextSegment() {
        const { words, currentIndex } = this.state;
        const currentSegment = words[currentIndex];
        if (currentSegment) {
            const { start, end } = currentSegment;
            const audioSegment = audioContext.createBuffer(
                1, // number of channels
                Math.ceil((end - start) * this.audioBuffer.sampleRate), // length of the segment in frames
                this.audioBuffer.sampleRate // sample rate
            );
            const sourceChannel = this.audioBuffer.getChannelData(0);
            const segmentChannel = new Float32Array(audioSegment.length);
            const startFrame = Math.floor(start * this.audioBuffer.sampleRate);
            const endFrame = Math.floor(end * this.audioBuffer.sampleRate);
            segmentChannel.set(sourceChannel.subarray(startFrame, endFrame));
            audioSegment.copyToChannel(segmentChannel, 0); // add segmentChannel to audioSegment buffer
            const source = audioContext.createBufferSource();
            source.buffer = audioSegment;
            source.connect(audioContext.destination);
            source.start(0);
            source.addEventListener('ended', () => {
                this.setState({ currentIndex: currentIndex + 1 }, () => {
                    this.playNextSegment();
                });
            });
        } else {
            // reached the end of the audio
            this.setState({ currentIndex: 0 });
        }
    }




    render() {
        const { words, currentIndex } = this.state;
        const currentSegment = words[currentIndex];
        return (
            <>
                {currentSegment && (
                    <div>
                        <h2>Current Segment:</h2>
                        <p>{currentSegment.word}</p>
                    </div>
                )}
            </>
        );
    }

}

export default Reader;
