import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Card, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/themes/theme-blue.css';

class Login extends Component {

    state = {
        username: "",
        password: ""
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
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Grid
                    container
                    spacing={3}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}
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
                        <TextField type="password" id="outlined-basic" label="Password" variant="outlined" name="password" value={this.state.password} onChange={this.handleChange} />
                    </Grid>   
                    <Grid item xs={6}>
                        <AwesomeButton type="primary" size="large" style={{height: '60px', fontSize: '24px'}}>Login</AwesomeButton>
                    </Grid>   
                </Grid>
            </form>
        )
    }

    // render() {
    //     console.log(this.props.user)
    //     return (
    //         <div className="login-card">
    //             <h4 style={{fontFamily: "'Roboto', sans-serif", color: 'black'}}>Twitch Dashboard</h4>
    //             <h1 style={{fontSize: '100px', fontFamily: "'Roboto', sans-serif", color: 'black'}}>Login</h1>
    //             <TextField id="filled-basic" label="Username" variant="filled" onChange={this.handleChange}/>
    //             <br/>
    //             <TextField id="filled-basic" label="Password" variant="filled" style={{marginTop: '2%'}}/>
    //         </div>
    //     )
    // }
}

function msp(state) {
    return {user: state.user}
}

export default connect(msp)(Login)