import React, { Component } from 'react';
import ForumCard from '../components/ForumCard';
import ForumPost from '../components/ForumPost';
import Container from '@material-ui/core/Container';
import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/themes/theme-blue.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Switch, Link, Route, withRouter } from 'react-router-dom';
import CreateForumPost from '../components/CreateForumPost';

class Forum extends Component{

    state = {
        posts: null,
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
        return <CreateForumPost currentUser={this.props.currentUser} handleSubmit={this.submitNewPost} />
    }
    
    renderForumCards = () => {
        return this.state.posts.map(post => <ForumCard key={post.id} {...post} routerProps={this.props.routerProps} viewPost={this.viewForumPost} />)
    }

    viewForumPost = (post) => {
        this.setState({
            post: post
        }, () => {
            this.props.history.push({
                pathname: `/forum/${this.state.post.id}`
            })
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
            posts: [...this.state.posts, json.data],
            post: json.data
        }, () => this.handleRedirect()))
    }

    handleRedirect = () => {
        this.props.history.push("/forum")
    }

    getDisplayContent = () => {
        
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
                {this.props.currentUser
                ?
                <Link to="/forum/new">
                    <AwesomeButton type="secondary" size="small" style={{ marginTop: 20, width: '280px', height: '40px', fontSize: '18px'}}>New Post</AwesomeButton>
                </Link>
                :
                null
                }
            </>
        )
    }

    render() {
        return (
            <>
                <div>
                    <Switch>
                        <Route exact path="/forum/new" >
                            {this.renderCreateForm()}
                        </Route>
                        <Route exact path="/forum" >
                            {this.getDisplayContent()}
                        </Route>
                        <Route path="/forum/:post" render={() => {
                            return <ForumPost currentUser={this.props.currentUser} post={this.state.post} />    
                        }} />
                    </Switch>
                </div>
            </>
        )
    }
}

export default withRouter(Forum)