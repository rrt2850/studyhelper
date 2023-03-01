import React, { Component } from 'react';
import ReactPlayer from 'react-player/youtube';

class BackgroundPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPathIndex: props.pathIndex,
        };
    }

    paths = [
        /*Subway Surfer*/[['https://www.youtube.com/watch?v=AmUQhXJGk-s', 0]],
        /*Kinetic Sand*/[['https://www.youtube.com/watch?v=etp46Aca_UM', 0], ['https://www.youtube.com/watch?v=3clqk2U3T9Y', 13], ['https://www.youtube.com/watch?v=IeOJm025RlE', 6], ['https://www.youtube.com/watch?v=8BYrvVeejzg', 9]],
        /*Soap Cutting*/[['https://www.youtube.com/watch?v=J9dvPQuHz-I', 0], ['https://www.youtube.com/watch?v=2YyXDhE2jJU', 6], ['https://www.youtube.com/watch?v=ORH2XgFFsFY', 0], ['https://www.youtube.com/watch?v=04IQf9Jc5dQ', 0]],
        /*Hydraulic Press*/[['https://www.youtube.com/watch?v=DGxDVLx3Szs', 0], ['https://www.youtube.com/watch?v=JUlL6vqdjms', 0], ['https://www.youtube.com/watch?v=1gGQy4nxyUo', 0], ['https://www.youtube.com/watch?v=eSvhnGdncP8', 0], ['https://www.youtube.com/watch?v=apg7msNcOFw', 0], ['https://www.youtube.com/watch?v=t8_5erSd92Q', 0]],
        /*Minecraft Parkour*/[['https://www.youtube.com/watch?v=n_Dv4JMiwK8', 10], ['https://www.youtube.com/watch?v=ps20zN1ZqUo', 10]],
        /*Cake Decorating*/[['https://www.youtube.com/watch?v=xSRk4dgNdXc', 0], ['https://www.youtube.com/watch?v=xVWwDc5aNDM', 0], ['https://www.youtube.com/watch?v=eS-QL5HAAr8', 0], ['https://www.youtube.com/watch?v=-xlmBoQ4paI', 8], ['https://www.youtube.com/watch?v=XRXMMA4YZp0', 0], ['https://www.youtube.com/watch?v=fljAYOAZovc&t=2492s', 0]],
        /*Family Guy*/[['https://www.youtube.com/watch?v=z5dcLXMoNAs', 0], ['https://www.youtube.com/watch?v=4pPdv6ataBU', 0], ['https://www.youtube.com/watch?v=fytR78K6rHs', 0], ['https://www.youtube.com/watch?v=zTQyO9c6nAg', 0]],
        /*Gameplay Footage*/[['https://www.youtube.com/watch?v=ZnW327PDAuU', 24], ['https://www.youtube.com/watch?v=UpXhso0F9aI', 0], ['https://www.youtube.com/watch?v=41tHAs0fVRM', 0], ['https://www.youtube.com/watch?v=URSUXKXrxl8', 0], ['https://www.youtube.com/watch?v=hKOg8Q1OBCE', 0], ['https://www.youtube.com/watch?v=gZY0v5rHr1U', 0], ['https://www.youtube.com/watch?v=kBJjoA2dnf0', 0], ['https://www.youtube.com/watch?v=oowQ1ckp-VQ', 0], ['https://www.youtube.com/watch?v=nelklXCeDYs', 0]],
        /*Misc ASMR*/[['https://www.youtube.com/watch?v=9eqvo0uqpTs', 0], ['https://www.youtube.com/watch?v=8M7S-d9KCco', 0], ['https://www.youtube.com/watch?v=kCLjXhnUqOg', 0], ['https://www.youtube.com/watch?v=zmbZ5klT2ds', 0], ['https://www.youtube.com/watch?v=w1PECqqO-Ck', 0], ['https://www.youtube.com/watch?v=YAZOCtLMNmI', 0], ['https://www.youtube.com/watch?v=C3C0aZZjS5I', 0]],
        /*Misc*/[['https://www.youtube.com/watch?v=b65MoVwANq4', 10], ['https://www.youtube.com/watch?v=HPuD7w_TbSc', 15]]
    ];

    componentDidUpdate(prevProps) {
        if (prevProps.pathIndex !== this.props.pathIndex) {
            this.setState({ currentPathIndex: this.props.pathIndex });
        }
    }

    getRandomPath(currentPath) {
        if (Array.isArray(currentPath)) {
            return currentPath[Math.floor(Math.random() * currentPath.length)];
        } else {
            return currentPath;
        }
    }

    render() {
        const { currentPathIndex } = this.state;
        let currentPath = this.paths[currentPathIndex];
        currentPath = this.getRandomPath(currentPath);
        const url = currentPath[0];
        const startTime = parseFloat(currentPath[1]);
        console.log(`currentPath[0]: ${currentPath[0]}, currentPath[1]: ${currentPath[1]}`);
        return (
            
            <ReactPlayer
                className='react-player'
                url={url}
                start={startTime}
                playing
                loop
                muted
                width='100%'
                height='100%'
                onReady={() => {
                    console.log('Player is ready');
                    // Add any additional logic to start playing video here
                }}
                config={{
                    youtube: {
                        playerVars: {
                            autoplay: 1,
                            controls: 0,
                            modestbranding: 1,
                            showinfo: 0,
                            quality: '1080p',
                            hd: 1,
                            rel: 0,
                            iv_load_policy: 3,
                            disablekb: 1,
                            start:startTime
                        },
                    },
                }}
                bufferingRetry={true}
                bufferingRetryDelay={5000}
            />
        );
    }
}

export default BackgroundPlayer;
