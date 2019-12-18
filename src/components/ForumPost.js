import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css';
import Container from '@material-ui/core/Container';
import CodeBlock from './CodeBlock';
import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/themes/theme-eric.css';
import { Route, Link, withRouter } from 'react-router-dom';
import EditForumPost from './EditForumPost';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


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

    deletePost = (post) => {
        fetch (`http://localhost:3000/api/v1/posts/${post.id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            }
        })
        .then(resp => resp.json())
        .then(() => this.props.history.push("/forum"))
    }

    handleRedirect = () => {
        this.props.history.push(`/forum/${this.state.post.id}`)
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
                            <AwesomeButton type="secondary" size="small" style={{fontSize: '24px', margin: 30, width: '200px' }} >Back to forum</AwesomeButton>
                        </Link>
                        <Link to={`/forum/${this.state.post.id}/edit`}>
                            <AwesomeButton type="secondary" size="medium" style={{fontSize: '24px', margin: 30 }}>Edit</AwesomeButton>
                        </Link>
                        <AwesomeButton type="secondary" size="medium" style={{fontSize: '24px', margin: 30 }} onPress={() => this.deletePost(this.state.post)}>Delete</AwesomeButton>
                    </>
                )
            } else {
                return (
                    <Link to={`/forum`}>
                        <AwesomeButton type="secondary" size="small" style={{fontSize: '24px', margin: 30, width: '200px' }}>Back to forum</AwesomeButton>
                    </Link>
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
                <Typography variant="h3" component="h3" gutterBottom>
                    {this.props.post.title}
                </Typography>
                <Typography variant="h5" component="h5" gutterBottom>
                    {this.props.post.description}
                </Typography>
                <Paper style={{ border: "5px solid #d0b400"}}>
                    <article className="markdown-body" style={{margin: 20, fontSize: 26}}>
                        <ReactMarkdown source={this.props.post.body} renderers={{code: CodeBlock}}/>
                    </article>
                </Paper>
            </Container>
        )
    }

    renderEditForm = () => {
        return <EditForumPost {...this.state.post} {...this.props} currentUser={this.props.currentUser} handleSubmit={this.props.handleUpdate} />
    }

    render() {
        return (
            <>
                {this.renderForumPost()}
            </>
        )
    }
}

export default withRouter(ForumPost)