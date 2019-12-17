import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

class Login extends Component {

    state = {
        signingUp: false,
        signingIn: true
    }
    
    render() {
        console.log(this.props)
        return (
            <>
                {this.state.signingUp
                ?
                <SignUpForm handleSubmit={this.props.handleSignUp} switchForm={this.switchForm} />
                :
                <LoginForm handleSignIn={this.props.handleSignIn} switchForm={this.switchForm}/>
                }
            </>
        )
    }
}

function msp(state) {
    return {user: state.user}
}

export default connect(msp)(Login)