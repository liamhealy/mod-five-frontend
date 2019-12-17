import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css';
import Container from '@material-ui/core/Container';
import CodeBlock from './CodeBlock';
import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/themes/theme-eric.css';
import { Switch, Route, Link, withRouter } from 'react-router-dom';

class ForumPost extends Component {

    state = {
        post: null
    }

    componentDidMount() {
        fetch(`http://localhost:3000/api/v1/posts/${this.props.match.params.post}`)
        .then(resp => resp.json())
        .then(json => this.setState({ post: json.post }))
    }

    updatePost = (post) => {
        fetch (`http://localhost:3000/api/v1/posts/${this.state.post.attributes.id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(post)
        })
        .then(resp => resp.json())
    }

    deletePost = () => {
        fetch (`http://localhost:3000/api/v1/posts/${this.state.post.attributes.id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            }        
        })
        .then(resp => resp.json())
    }

    renderActionButtons = () => {
        if (this.props.currentUser){
            if (this.props.currentUser.data.id == this.state.post.user_id) {
                return (
                    <>
                        <Link to={`/forum/${this.state.post.id}/edit`}>
                            <AwesomeButton type="secondary" size="medium" style={{fontSize: '24px', margin: 30 }}>Edit</AwesomeButton>
                        </Link>
                        <AwesomeButton type="secondary" size="medium" style={{fontSize: '24px', margin: 30 }} onPress={this.handleDelete}>Delete</AwesomeButton>
                    </>
                )
            }
        }
    }

    renderForumPost = () => {
        return (
            this.state.post
            ?
            <Container maxWidth="md" style={{marginTop: 50, textAlign: 'left'}}>
                {this.renderActionButtons()}
                <article className="markdown-body" style={{fontSize: 26}}>
                    <ReactMarkdown source={this.state.post.body} renderers={{code: CodeBlock}}/>
                </article>
            </Container>
            :
            null
        )
    }

    render() {
        return (
            <Switch>
                <Route exact path="/forum/:post" render={() => this.renderForumPost()} />
                <Route exact path="/forum/:post/edit" render={() => this.renderEditForm()}/>
            </Switch>
        )
    }
}

export default withRouter(ForumPost)