import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { AwesomeButton } from "react-awesome-button";

class Landing extends Component {

    handleRedirect = (path) => {
        this.props.history.push(`/${path}`)
    }

    render() {
        return (
            <>
                <h1>Landing page</h1>
                <AwesomeButton type="link" size="large" style={{height: '60px', fontSize: '24px'}} onPress={() => this.handleRedirect("forum")}>Forum</AwesomeButton>
            </>
        )
    }
}

export default withRouter(Landing)