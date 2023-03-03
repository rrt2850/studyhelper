/**
 * Inputs.js
 * @author Robert Tetreault
 * @summary Holds all the inputs for the website like the text area
 *          and buttons. Also handles what happens when they're used
 */

import React, { useState } from 'react';

const buttons = [
    'Subway Surfers',
    'Kinetic Sand',
    'Soap Cutting',
    'Hydraulic Press',
    'Minecraft Parkour',
    'Cake Decorating',
    'Family Guy',
    'Gameplay Footage',
    'Random ASMR',
    'Surprise Me'
];

const Inputs = ({ handleTyping, changePath, toRead }) => {
    const [userInput, setUserInput] = useState('');

    // When the category button is clicked, get it's index and send it out
    const handleButtonClick = event => {
        const buttonIndex = parseInt(event.target.value, 10);
        changePath(buttonIndex);
    };

    // Sends contents of textarea out as toRead when start is pushed
    const handleStartButtonClick = () => toRead(userInput);

    return (
        <div className='Inputs' onKeyDown={handleTyping}>
            <textarea 
                onChange={event => setUserInput(event.target.value)}
                placeholder="Type something here..." />
            <div className='ButtonHolder'>
                {buttons.map((buttonText, index) => (
                    <button
                        key={index}
                        type="button"
                        value={index}
                        onClick={handleButtonClick}
                    >
                        {buttonText}
                    </button>
                ))}
                <button type="button" onClick={handleStartButtonClick}>
                    Start
                </button>
            </div>
        </div>
    );
};

export default Inputs;
