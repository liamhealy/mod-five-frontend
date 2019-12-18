import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css';
import Container from '@material-ui/core/Container';
import CodeBlock from './CodeBlock';
import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/themes/theme-eric.css';
import { Route, Link, withRouter } from 'react-router-dom';
import EditForumPost from './EditForumPost';

class ForumPost extends Component {

    state = {
        status: "show",
        post: this.props.post
    }

    componentDidMount() {
        fetch(`http://localhost:3000/api/v1/posts/${this.props.match.params.post}`)
        .then(resp => resp.json())
        .then(json => this.setState({ post: json.post }))
    }

    updatePost = (post) => {
        fetch (`http://localhost:3000/api/v1/posts/${this.state.post.id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(post)
        })
        .then(resp => resp.json())
        .then(json => this.setState({
            post: json.data.attributes
        }, () => this.handleRedirect())
        )
    }

    handleRedirect = () => {
        this.props.history.push(`/forum/${this.state.post.id}`)
    }

    deletePost = () => {
        fetch (`http://localhost:3000/api/v1/posts/${this.state.post.id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            }        
        })
        .then(resp => resp.json())
    }

    handleEditBtnClick = () => {
        this.setState({
            status: "edit"
        }, () => this.props.history.push(`/forum/${this.state.post.id}/edit`))
    }

    renderActionButtons = () => {
        if (this.props.currentUser){
            if (this.props.currentUser.data.id == this.state.post.user_id) {
                return (
                    <>
                        <Link to={`/forum`}>
                            <AwesomeButton type="secondary" size="small" style={{fontSize: '24px', margin: 30, width: '200px' }}>Back to forum</AwesomeButton>
                        </Link>
                        <Link to={`/forum/${this.state.post.id}/edit`}>
                            <AwesomeButton type="secondary" size="medium" style={{fontSize: '24px', margin: 30 }}>Edit</AwesomeButton>
                        </Link>
                        <AwesomeButton type="secondary" size="medium" style={{fontSize: '24px', margin: 30 }} onPress={this.handleDelete}>Delete</AwesomeButton>
                    </>
                )
            }
        } else {
            return (
                <Link to={`/forum`}>
                    <AwesomeButton type="secondary" size="small" style={{fontSize: '24px', margin: 30, width: '200px' }}>Back to forum</AwesomeButton>
                </Link>
            )
        }
    }

    renderForumPost = () => {
        return (
            <Container maxWidth="md" style={{marginTop: 50, textAlign: 'left'}}>
                {this.renderActionButtons()}
                <article className="markdown-body" style={{fontSize: 26}}>
                    <ReactMarkdown source={this.state.post.body} renderers={{code: CodeBlock}}/>
                </article>
            </Container>
        )
    }

    renderEditForm = () => {
        return <EditForumPost {...this.state.post} {...this.props} currentUser={this.props.currentUser} handleSubmit={this.updatePost} />
    }

    render() {
        return (
            <>
                <Route exact path="/forum/:post/edit" render={() => {
                    return this.renderEditForm()
                }} 
                />
                <Route exact path="/forum/:post" render={() => {
                    return this.renderForumPost()
                }}
                />
            </>
        )
    }
}

export default withRouter(ForumPost)