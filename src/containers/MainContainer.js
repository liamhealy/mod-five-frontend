import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/themes/theme-blue.css';
import Forum from './Forum';
import NavBar from '../components/NavBar';
import { Route, Redirect } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

class MainContainer extends Component {

    state = {
        currentUser: null,
        post: null
    }

    signIn = (user) => {
        fetch(`http://localhost:3000/api/v1/users/${user.username}`)
        .then(resp => resp.json())
        .then(json => {
            if (json.data) {
                this.setState({
                    currentUser: json
                })
            } else {
            // Display errors at some point
            }
        })
    }
    
    signUp = (newUser) => {
        fetch('http://localhost:3000/api/v1/users', {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(newUser)
        })
        .then(resp => resp.json())
        .then(json => {
            if (json.data) {
                this.setState({
                    currentUser: json
                })
            } else {
            // Display errors at some point
            }
        })
    }

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
                    <AwesomeButton type="secondary" size="large" style={{height: '60px', fontSize: '24px'}}>Forum</AwesomeButton>
                </li>
            </ul>
        )
    }

    renderLogin = () => {
        if (this.state.currentUser) {
            return <Redirect to="/forum" />
        }

        return <LoginForm handleSignIn={this.signIn} />
    }

    renderSignUp = () => {
        if (this.state.currentUser) {
            return <Redirect to="/forum" />
        }

        return <SignUpForm handleSignUp={this.signUp} />
    }

    renderForum = (routerProps) => {
        return (
            <>
                <Forum currentUser={this.state.currentUser} selectPost={this.selectPost} routerProps={routerProps}/>
            </>
        )
    }

    render() {
        return (
            <>
                    <NavBar currentUser={this.state.currentUser} />
                    <div>
                        <Route exact path="/login" render={this.renderLogin} />
                        <Route exact path="/signup" render={this.renderSignUp} />
                        <Route path="/forum" render={(routerProps) => this.renderForum(routerProps)} />
                    </div>
            </>
        )
    }

}
// twitch url: https://api.twitch.tv/kraken/users/44322889?client_id=XXXXX
function msp(state) {
    return {user: state.user}
}

export default connect(msp)(MainContainer)