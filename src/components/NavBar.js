import React, { Component } from 'react';
import { AppBar, Toolbar } from '@material-ui/core'
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { AwesomeButton } from "react-awesome-button";
import { withRouter } from 'react-router-dom';
import 'react-awesome-button/dist/themes/theme-rickiest.css';


class NavBar extends Component {

    handleRedirect = (path) => {
        this.props.history.push(`/${path}`)
    }

    renderLinks = () => {
        return (
            <ul style={{listStyle: 'none'}}>
                <li>
                    <AwesomeButton type="primary" size="large" style={{height: '60px', fontSize: '24px'}} onPress={() => this.handleRedirect("streams")}>Streams</AwesomeButton>
                </li>
                <li style={{marginLeft: 20}}>
                    <AwesomeButton type="primary" size="large" style={{height: '60px', fontSize: '24px'}} onPress={() => this.handleRedirect("games")}>Games</AwesomeButton>
                </li>
                <li style={{marginLeft: 20}}>
                    <AwesomeButton type="primary" size="large" style={{height: '60px', fontSize: '24px'}} onPress={() => this.handleRedirect("forum")}>Forum</AwesomeButton>
                </li>
                {this.props.currentUser 
                ?
                <li style={{marginRight: 20, marginLeft: 20}}>
                    <AwesomeButton type="primary" size="large" style={{height: '60px', fontSize: '24px'}} onPress={() => this.handleRedirect(`user/${this.props.currentUser.data.attributes.username}`)}>My Profile</AwesomeButton>
                </li>
                :
                null
                }
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
                        <div style={{marginLeft: 1300}}>
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

export default connect(msp)(withRouter(NavBar))