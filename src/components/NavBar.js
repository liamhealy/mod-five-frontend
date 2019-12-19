import React, { Component } from 'react';
import { AppBar, Toolbar } from '@material-ui/core'
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/themes/theme-rickiest.css';


class NavBar extends Component {

    renderLinks = () => {
        return (
            <ul style={{listStyle: 'none'}}>
                <li style={{margin: 20}}>
                    <AwesomeButton type="primary" size="large" style={{height: '60px', fontSize: '24px'}}>Streams</AwesomeButton>
                </li>
                <li style={{margin: 20}}>
                    <AwesomeButton type="primary" size="large" style={{height: '60px', fontSize: '24px'}}>Games</AwesomeButton>
                </li>
                <li style={{margin: 20}}>
                    <AwesomeButton type="link" size="large" style={{height: '60px', fontSize: '24px'}}>Forum</AwesomeButton>
                </li>
            </ul>
        )
    }

    render() {
        return (
            <>
                <AppBar position="static" style={{backgroundColor: '#95d44a', color: '#3f8228', boxShadow: '#52a934'}}>
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
                {this.renderLinks()}
            </>
        )
    }

}

function msp(state) {
    return {user: state.user}
}

export default connect(msp)(NavBar)