import React, { Component } from 'react'

export class Inputs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(event) {
        this.setState({ value: event.target.value });
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
                    <button type="button">Subway Surfers</button>
                    <button type="button">Kinetic Sand</button>
                    <button type="button">Hydraulic Press</button>
                    <button type="button">Family Guy</button>
                    <button type="button">Mobile Game</button>
                    <button type="button">Surprise Me</button>
                </div>
            </div>
        )
    }
}

export default Inputs;
