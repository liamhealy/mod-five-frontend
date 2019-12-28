import React, { Component } from 'react';
import { clientID } from '../api';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import StreamCard from '../components/StreamCard';

class GameStreamData extends Component {

    state = {
        streams: null,
        pagination: null
    }

    componentDidMount = () => {
        return this.getStreams();
    }

    getStreams = () => {
        fetch(`https://api.twitch.tv/helix/streams?${this.props.type}`, {
            headers: {
                'Accept': 'application/vnd.twitchtv.v5+json',
                "Client-ID": clientID
            }
        })
        .then(resp => resp.json())
        .then(json => this.setState({streams: json.data, pagination: json.pagination}))
    }

    viewStreamer = (streamer) => {
        this.props.history.push(`/streams/${streamer}`)
    }

    renderCards = () => {
        return (
            this.state.streams.map(stream => <StreamCard key={stream.id} {...stream} handleClick={this.viewStreamer} />)
        )
    }

    render() {
        return (
            <>
                <Grid container spacing={3} style={{margin: '5%', maxWidth: '90%'}}>
                    {this.state.streams
                    ?
                    this.renderCards()
                    :
                    null
                    }
                </Grid>
            </>
        )
    }
}

export default withRouter(GameStreamData)