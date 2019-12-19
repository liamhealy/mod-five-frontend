import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import AceEditor from "react-ace";
import Typography from '@material-ui/core/Typography';
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-textmate";
import { AwesomeButton } from "react-awesome-button";
import { withRouter } from 'react-router-dom';

class ResponseForm extends Component {

    state = {
        post_id: this.props.postId,
        user_id: this.props.userId,
        body: ''
    }

    handleAceChange = (e) => {
        this.setState({
            body: e
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/api/v1/responses', {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(this.state)
        })
        .then(resp => resp.json())
        .then(json => this.props.onResponseSubmit(json))
    }

    render() {
        return (
            <Paper style={{ border: "5px solid #b6e986", marginTop: "75px", marginLeft: "15px", marginRight: "15px"}}>
                <Typography variant="h5" component="h5" style={{margin: 10}}>
                    Contribute to the conversation:
                </Typography>
                <form onSubmit={this.handleSubmit}>
                    <AceEditor
                        mode="markdown"
                        theme="textmate"
                        name="body"
                        editorProps={{ $blockScrolling: true }}
                        onChange={this.handleAceChange}
                        value={this.state.body}
                        style={{
                            fontSize: 18,
                            width: '100%',
                            height: '200px'
                        }}
                    />
                    <AwesomeButton type="secondary" size="small" style={{fontSize: '22px', margin: 10 }}>Submit</AwesomeButton>
                </form>
            </Paper>
        )
    }
}

export default withRouter(ResponseForm)