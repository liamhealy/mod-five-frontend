import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { AwesomeButton } from "react-awesome-button";
import Grid from '@material-ui/core/Grid';

class Landing extends Component {

    handleRedirect = (path) => {
        this.props.history.push(`/${path}`)
    }

    render() {
        return (
            <>
                {/* <Grid container spacing={8}> */}
                    {/* <Grid item xs={3}> */}
                        <h1>Landing page</h1>
                        <AwesomeButton type="link" size="large" style={{height: '60px', fontSize: '24px'}} onPress={() => this.handleRedirect("forum")}>Forum</AwesomeButton>
                    {/* </Grid> */}
                {/* </Grid> */}
            </>
        )
    }
}

export default withRouter(Landing)