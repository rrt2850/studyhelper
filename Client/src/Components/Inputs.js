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
    const [value, setValue] = useState('');

    const handleInput = event => setValue(event.target.value);

    const handleButtonClick = event => {
        const buttonIndex = parseInt(event.target.value, 10);
        changePath(buttonIndex);
    };

    const handleStartButtonClick = () => toRead(value);

    return (
        <div className='Inputs' onKeyDown={handleTyping}>
            <textarea
                value={value}
                onChange={handleInput}
                placeholder="Type something here..."
            />
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
