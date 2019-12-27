import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import CodeBlock from './CodeBlock';
import ReactMarkdown from 'react-markdown';
import Typography from '@material-ui/core/Typography';
import { AwesomeButton } from "react-awesome-button";
import ResponseForm from './ResponseForm';

export default class Response extends Component {
    
    state = {
        editing: false
    }

    handleEditButton = () => {
        this.setState({
            editing: !this.state.editing
        })
    }

    renderEditForm = () => {
        return <ResponseForm postId={this.props.response.post_id} userId={this.props.response.user_id} {...this.props.response} editing={true} handlePatch={this.handlePatch} />
    }

    renderEditButton = () => {
        if (this.props.currentUser) {
            if (this.props.currentUser.data.id == this.props.user.id) {
                return <AwesomeButton type="secondary" size="small" style={{fontSize: '22px', margin: 10 }} onPress={this.handleEditButton}>Edit</AwesomeButton>
            } else {
                return null
            }
        } else {
            return null
        }
    }

    handlePatch = (response) => {
        console.log(this.props)
        fetch(`http://localhost:3000/api/v1/responses/${this.props.response.id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(response)
        })
        .then(resp => resp.json())
        .then(json => {
            this.props.response.body = json.response.body
            this.handleEditButton()
        })
        // .then(json => <Response response={json.response} user={json.user} />)
    }
    
    renderResponse = () => {
        console.log(this.props)
        return (
            <Paper style={{ border: "5px solid #b6e986", marginTop: "75px", marginLeft: "15px", marginRight: "15px"}}>
                <Typography variant="h5" component="h3" style={{margin: 10}}>
                    {this.props.user.username}
                    <Typography component="p">
                        ({this.props.user.email})
                    </Typography>
                </Typography>
                <hr/>
                <article className="markdown-body" style={{margin: 20, fontSize: 20}}>
                    <ReactMarkdown source={this.props.response.body} renderers={{code: CodeBlock}}/>
                </article>
                {this.renderEditButton()}
            </Paper>
        )
    }

    render() {
        return (
            this.state.editing
            ?
            this.renderEditForm()
            :
            this.renderResponse()
        )
    }
}