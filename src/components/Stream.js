import React, { Component } from 'react';
import ReactTwitchEmbedVideo from "react-twitch-embed-video"
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class Stream extends Component {
    render() {
        return (
            <Paper style={{ border: "5px solid #b6e986", marginTop: "75px", marginLeft: "15px", marginRight: "15px"}}>
                <ReactTwitchEmbedVideo channel={this.props.routerProps.match.params.username} width='100%'/>
            </Paper>
        )
    }
}

export default Stream