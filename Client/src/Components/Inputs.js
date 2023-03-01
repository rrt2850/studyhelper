import React, { Component } from 'react'

export class Inputs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleStartButtonClick = this.handleStartButtonClick.bind(this);
    }

    handleInput(event) {
        this.setState({ value: event.target.value });
    }

    handleButtonClick(event) {
        const buttonIndex = parseInt(event.target.value, 10);
        this.props.changePath(buttonIndex);
    }

    handleStartButtonClick() {
        this.props.toRead(this.state.value);
    }

    render() {
        return (
            <div className='Inputs' onKeyDown={this.props.handleTyping}>
                <textarea
                    value={this.state.value}
                    onChange={this.handleInput}
                    placeholder="Type something here..."
                ></textarea>
                <div className='ButtonHolder'>
                    <button type="button" value="0" onClick={this.handleButtonClick}>Subway Surfers</button>
                    <button type="button" value="1" onClick={this.handleButtonClick}>Kinetic Sand</button>
                    <button type="button" value="2" onClick={this.handleButtonClick}>Soap Cutting</button>
                    <button type="button" value="3" onClick={this.handleButtonClick}>Hydraulic Press</button>
                    <button type="button" value="4" onClick={this.handleButtonClick}>Minecraft Parkour</button>
                    <button type="button" value="5" onClick={this.handleButtonClick}>Cake Decorating</button>
                    <button type="button" value="6" onClick={this.handleButtonClick}>Family Guy</button>
                    <button type="button" value="7" onClick={this.handleButtonClick}>Gameplay Footage</button>
                    <button type="button" value="8" onClick={this.handleButtonClick}>Random ASMR</button>
                    <button type="button" value="9" onClick={this.handleButtonClick}>Surprise Me</button>
                    <button type="button" onClick={this.handleStartButtonClick}>Start</button>
                </div>

            </div>
        )
    }
}

export default Inputs;
