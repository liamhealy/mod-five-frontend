import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Card, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/themes/theme-blue.css';
import { withRouter } from 'react-router-dom';

class SignUpForm extends Component {

    state = {
        username: "",
        email: "",
        first_name: "",
        last_name: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleSignUp(this.state)
    }

    switchForm = () => {
        this.props.history.push({
            pathname: '/login'
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
                    style={{ minHeight: '100vh', flexGrow: 1 }}
                >
                    <Grid item xs={12}>
                        <Typography variant="h3" component="h2" gutterBottom>
                            Twitch Dashboard
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h1" component="h2" gutterBottom>
                            Sign Up
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="outlined-basic" label="Username" variant="outlined" name="username" value={this.state.username} onChange={this.handleChange} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField id="outlined-basic" label="First Name" variant="outlined" name="first_name" value={this.state.first_name} onChange={this.handleChange} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField id="outlined-basic" label="Last Name" variant="outlined" name="last_name" value={this.state.last_name} onChange={this.handleChange} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="outlined-basic" label="Email" variant="outlined" name="email" value={this.state.email} onChange={this.handleChange} />
                    </Grid>
                    <Grid item xs={6}>
                        <AwesomeButton type="primary" size="large" style={{height: '60px', fontSize: '24px'}}>Sign Up</AwesomeButton>
                    </Grid>
                    <Grid item xs={6}>
                        <AwesomeButton type="primary" size="small" style={{width: '280px', height: '40px', fontSize: '18px'}} onPress={this.switchForm}>Already Have an Account?</AwesomeButton>
                    </Grid>
                </Grid>
            </form>
            </>
        )
    }
}

function msp(state) {
    return {user: state.user}
}

export default connect(msp)(withRouter(SignUpForm))