import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Card, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/themes/theme-blue.css';
import { withRouter } from 'react-router-dom';

class LoginForm extends Component {

    state = {
        username: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        e.persist()
        this.props.dispatch({type: "SIGN_IN", payload: this.state})
        this.props.handleSignIn(this.state)
    }

    switchForm = () => {
        this.props.history.push({
            pathname: '/signup'
        })
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <Grid
                        container
                        spacing={3}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        style={{ minHeight: '50vh' }}
                    >
                        <Grid item xs={6}>
                            <Typography variant="h3" component="h2" gutterBottom>
                                Twitch Dashboard
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h1" component="h2" gutterBottom>
                                Login
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="outlined-basic" label="Username" variant="outlined" name="username" value={this.state.username} onChange={this.handleChange} />
                        </Grid>      
                        <Grid item xs={6}>
                            <AwesomeButton type="primary" size="large" style={{height: '60px', fontSize: '24px'}}>Login</AwesomeButton>
                        </Grid>   
                        <AwesomeButton type="primary" size="small" style={{width: '280px', height: '40px', fontSize: '18px'}} onPress={this.switchForm}>Create an Account</AwesomeButton>
                    </Grid>
                </form>
            </>
        )
    }
}

function msp(state) {
    return {user: state.user}
}

export default connect(msp)(withRouter(LoginForm))