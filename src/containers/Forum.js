import React, { Component } from 'react';
import ForumPost from '../components/ForumPost';
import Container from '@material-ui/core/Container';

class Forum extends Component{

    state = {
        posts: null
    }
    
    componentDidMount() {
        fetch ('http://localhost:3000/api/v1/posts')
        .then(resp => resp.json())
        .then(json => this.setState({
            posts: [...json.data]
        }))
    }
    
    renderForumPosts() {
        return this.state.posts.map(post => <ForumPost key={post.id} {...post} />)
        // console.log(this.state.posts)
    }

    render() {
        console.log(this.state.posts)
        return (
            <Container maxWidth="lg" style={{marginTop: 50}}>
                {this.state.posts !== null
                ? 
                this.renderForumPosts()
                :
                <h2>Nothing loaded!</h2>
                }
            </Container>
        )
    }

}

export default Forum