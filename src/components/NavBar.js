import React, { Component } from 'react';
import { AppBar, Toolbar } from '@material-ui/core'
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';


class NavBar extends Component {

    render() {
        return (
            <AppBar position="static" style={{backgroundColor: '#ec1a3f', color: '#ffe11d', boxShadow: '5px 5px #ffe11d'}}>
                <Toolbar variant="dense">
                    <Typography variant="h5" style={{marginLeft: 50}}>
                        Twitch Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }

}

function msp(state) {
    return {user: state.user}
}

export default connect(msp)(NavBar)