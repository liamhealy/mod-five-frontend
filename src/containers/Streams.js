import React, { Component } from 'react';
import { clientID } from '../api';
import Grid from '@material-ui/core/Grid';
import StreamCard from '../components/StreamCard';

class Streams extends Component {

    state = {
        streams: null,
        pagination: null
    }

    componentDidMount = () => {
        this.getStreams();
    }

    getStreams = () => {
        fetch('https://api.twitch.tv/kraken/streams', {
            headers: {
                'Accept': 'application/vnd.twitchtv.v5+json',
                "Client-ID": clientID
            }
        })
        .then(resp => resp.json())
        .then(json => this.setState({streams: json.streams, pagination: json.pagination}))
    }

    renderCards = () => {
        return (
            this.state.streams.map(stream => <StreamCard key={stream._id} {...stream} />)
        )
    }

    render() {
        console.log(this.state)
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

export default Streams