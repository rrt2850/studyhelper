import React, { Component } from 'react'
import ReactPlayer from 'react-player/youtube'

export class BackgroundPlayer extends Component {
    paths = [
        'https://www.youtube.com/watch?v=AmUQhXJGk-s',
        'https://www.youtube.com/watch?v=etp46Aca_UM',
        'https://www.youtube.com/watch?v=DGxDVLx3Szs'
    ]

    render() {
        return (
            <ReactPlayer
                className='react-player'
                url={this.paths[0]}
                
                playing loop muted width='100%' height='100%'

                config={{
                    youtube: {
                        playerVars: {
                            autoplay: 1,
                            controls: 0,
                            modestbranding: 1,
                            showinfo: 0,
                            quality: '1080p',
                            hd: 1,
                            rel:0,
                            iv_load_policy: 3,
                            disablekb:1,
                        },
                    },
                }}

            />
        )
    }
}

export default BackgroundPlayer;