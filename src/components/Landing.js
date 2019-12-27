import React, { Component } from 'react';
import { AwesomeButton } from "react-awesome-button";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class Landing extends Component {

    render() {
        return (
            <>
                {/* <AwesomeButton type="link" size="large" style={{height: '60px', fontSize: '24px'}} onPress={() => this.handleRedirect("forum")}>Forum</AwesomeButton>
                <AwesomeButton type="link" size="large" style={{height: '60px', fontSize: '24px'}} onPress={() => this.handleRedirect("streams")}>Streams</AwesomeButton> */}
                <Paper style={{boxShadow: '5px 5px lightgrey', borderColor: "grey", margin: 50}}>
                    <Typography variant="h1" component="h1" gutterBottom>
                        Welcome!
                    </Typography>
                    <Typography variant="h6" component="h6" gutterBottom>
                        Use the buttons above to navigate!
                    </Typography>
                </Paper>
            </>
        )
    }
}

export default Landing