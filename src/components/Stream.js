import React, { Component } from 'react';
import ReactTwitchEmbedVideo from "react-twitch-embed-video"

class Stream extends Component {
    render() {
        return (
            // <div style={{justifyItems: 'center'}}>
                <ReactTwitchEmbedVideo channel={this.props.routerProps.match.params.username}/>
            // </div>
        )
    }
}

export default Stream