import React, { Component } from 'react';
import ForumCard from '../components/ForumCard';
import ForumPost from '../components/ForumPost';
import Container from '@material-ui/core/Container';

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
        // console.log(this.state.posts)
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
            <ForumPost />
            :
            <Container maxWidth="lg" style={{marginTop: 50}}>
                {this.state.posts !== null
                ? 
                this.renderForumCards()
                :
                <h2>Nothing loaded!</h2>
                }
            </Container>
        )
    }

}

export default Forum