import React, { Component } from 'react';

export class Reader extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            toRead: props.toRead
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.toRead !== this.props.toRead) {
            this.setState({ toRead: this.props.toRead });
        }
    }



    render() {
        return <div>{this.state.toRead}</div>;
    }
}

export default Reader;
