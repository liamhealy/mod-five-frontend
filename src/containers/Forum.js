import React, { Component } from 'react';
import ForumCard from '../components/ForumCard';
import ForumPost from '../components/ForumPost';
import Container from '@material-ui/core/Container';
import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/themes/theme-blue.css';
import CreateForumPost from '../components/CreateForumPost';
import CircularProgress from '@material-ui/core/CircularProgress';

class Forum extends Component{

    state = {
        posts: null,
        status: "index",
        post: null
    }
    
    componentDidMount() {
        fetch ('http://localhost:3000/api/v1/posts')
        .then(resp => resp.json())
        .then(json => this.setState({
            posts: [...json.data]
        }))
    }

    renderCreateForm = () => {
        this.setState({
            status: "create"
        })
    }
    
    renderForumCards = () => {
        return this.state.posts.map(post => <ForumCard key={post.id} {...post} viewPost={this.viewForumPost} />)
    }

    viewForumPost = (post) => {
        this.setState({
            status: "show",
            post: post
        })
    }

    submitNewPost = (post) => {
        fetch ('http://localhost:3000/api/v1/posts', {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(post)
        })
        .then(resp => resp.json())
        .then(json => this.setState({
            status: "show",
            post: json.data
        }))
    }

    getDisplayContent = () => {
        switch(this.state.status) {
            case "show":
                return <ForumPost post={this.state.post} />
            case "create":
                return <CreateForumPost currentUser={this.props.currentUser} handleSubmit={this.submitNewPost} />
            default:
                return (
                    <>
                        <Container maxWidth="lg" style={{marginTop: 50}}>
                            {this.state.posts !== null
                            ?
                            this.renderForumCards()
                            :
                            <CircularProgress />
                            }
                        </Container>
                        <AwesomeButton type="secondary" size="small" style={{ marginTop: 20, width: '280px', height: '40px', fontSize: '18px'}} onPress={this.renderCreateForm}>New Post</AwesomeButton>
                    </>
                )
        }
    }

    render() {
        console.log(this.state.post)
        return (
            this.getDisplayContent()
        )
    }
}

export default Forum