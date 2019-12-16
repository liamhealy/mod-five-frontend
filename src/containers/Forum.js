import React, { Component } from 'react';
import ForumCard from '../components/ForumCard';
import ForumPost from '../components/ForumPost';
import Container from '@material-ui/core/Container';
import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/themes/theme-blue.css';

class Forum extends Component{

    state = {
        posts: null,
        viewingPost: false,
        post: null
    }
    
    componentDidMount() {
        fetch ('http://localhost:3000/api/v1/posts')
        .then(resp => resp.json())
        .then(json => this.setState({
            posts: [...json.data]
        }))
    }
    
    renderForumCards = () => {
        return this.state.posts.map(post => <ForumCard key={post.id} {...post} viewPost={this.viewForumPost} />)
    }

    viewForumPost = (post) => {
        this.setState({
            viewingPost: true,
            post: post
        })
    }

    render() {
        console.log(this.state.posts)
        return (
            this.state.viewingPost
            ?
            <ForumPost post={this.state.post} />
            :
            <>
                <Container maxWidth="lg" style={{marginTop: 50}}>
                    {this.state.posts !== null
                    ?
                    this.renderForumCards()
                    :
                    <h2>Loading...</h2>
                    }
                </Container>
                <AwesomeButton type="secondary" size="small" style={{width: '280px', height: '40px', fontSize: '18px'}}>New Post</AwesomeButton>
            </>
        )
    }
}

export default Forum