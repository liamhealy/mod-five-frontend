import React, { Component } from 'react';
import { clientID } from '../api';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import GameCard from '../components/GameCard';
import Typography from '@material-ui/core/Typography';

class Streams extends Component {

    state = {
        games: null
    }

    componentDidMount = () => {
        this.getGames();
    }

    getGames = () => {
        fetch(`https://api.twitch.tv/helix/games/top`, {
            headers: {
                'Accept': 'application/vnd.twitchtv.v5+json',
                "Client-ID": clientID
            }
        })
        .then(resp => resp.json())
        .then(json => this.setState({games: json.data}))
    }

    viewGame = (game) => {
        this.props.history.push(`/games/game_id=${game}`)
    }

    renderCards = () => {
        return (
            this.state.games.map(game => <GameCard key={game.id} {...game} handleClick={this.viewGame} />)
        )
    }

    render() {
        return (
            <>
                <Typography variant="h3">
                    Top Games and Categories
                </Typography>
                <Grid container spacing={3} style={{margin: '5%', maxWidth: '90%'}}>
                    {this.state.games
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

export default withRouter(Streams)