import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/themes/theme-eric.css';
import Forum from './Forum';

class MainContainer extends Component {

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <ul style={{listStyle: 'none'}}>
                    <li style={{margin: 20}}>
                        <AwesomeButton type="primary" size="large" style={{height: '60px', fontSize: '24px'}}>Streams</AwesomeButton>
                    </li>
                    <li style={{margin: 20}}>
                        <AwesomeButton type="primary" size="large" style={{height: '60px', fontSize: '24px'}}>Games</AwesomeButton>
                    </li>
                    <li style={{margin: 20}}>
                        <AwesomeButton type="secondary" size="large" style={{height: '60px', fontSize: '24px'}}>Forum</AwesomeButton>
                    </li>
                </ul>
                <Grid
                    container
                    spacing={3}
                    direction="column"
                    alignItems="center"
                    style={{}}
                >
                    {/* <Grid item xs={12}>
                        <Paper>Content</Paper>
                    </Grid> */}
                </Grid>
                <Forum />
            </div>
        )
    }

}
// twitch url: https://api.twitch.tv/kraken/users/44322889?client_id=XXXXX
function msp(state) {
    return {user: state.user}
}

export default connect(msp)(MainContainer)