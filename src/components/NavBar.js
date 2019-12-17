import React, { Component } from 'react';
import { AppBar, Toolbar } from '@material-ui/core'
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/themes/theme-eric.css';


class NavBar extends Component {

    render() {
        return (
            <AppBar position="static" style={{backgroundColor: '#ec1a3f', color: '#ffe11d', boxShadow: '5px 5px #ffe11d'}}>
                <Toolbar variant="dense">
                    <Typography variant="h5" style={{marginLeft: 50}}>
                        Twitch Dashboard
                    </Typography>
                    {this.props.currentUser ?
                    null
                    :
                    <div style={{float: "left"}}>
                        <Typography variant="h6">
                            <Link to="/login" props="this is a prop">
                                <AwesomeButton type="secondary" size="small" style={{height: '30px'}}>Login</AwesomeButton>
                            </Link>
                        </Typography>
                    </div>
                    }
                </Toolbar>
            </AppBar>
        )
    }

}

function msp(state) {
    return {user: state.user}
}

export default connect(msp)(NavBar)