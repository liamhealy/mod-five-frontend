import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

class Login extends Component {

    state = {
        signingUp: false,
        signingIn: true
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        e.persist()
        const user = this.state
        console.log(user)
        this.props.dispatch({type: "SIGN_IN", payload: this.state})
    }

    switchForm = () => {
        this.setState({
            signingUp: !this.state.signingUp,
            signingIn: !this.state.signingIn
        })
    }
    
    render() {
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