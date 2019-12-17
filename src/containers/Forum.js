import React, { Component } from 'react';
import ForumCard from '../components/ForumCard';
import ForumPost from '../components/ForumPost';
import Container from '@material-ui/core/Container';
import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/themes/theme-blue.css';
import CreateForumPost from '../components/CreateForumPost';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';

class Forum extends Component{

    state = {
        posts: null,
        // status: "index",
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
        this.props.history.push({
            pathname: '/forum/new'
        })
    }
    
    renderForumCards = () => {
        return this.state.posts.map(post => <ForumCard key={post.id} {...post} viewPost={this.viewForumPost} />)
    }

    viewForumPost = (post) => {
        this.setState({
            // status: "show",
            post: post
        }, () => this.props.history.push({
            pathname: `/forum/${this.state.post.attributes.title}`
        }))
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
            // status: "show",
            posts: [...this.state.posts, json.data],
            post: json.data
        }))
        .then(() => {
            this.props.history.push({
                pathname: `/forum`
            })
            this.getDisplayContent()
        })
    }

    getDisplayContent = () => {
        console.log("made it")
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
                <AwesomeButton type="secondary" size="small" style={{ marginTop: 20, width: '280px', height: '40px', fontSize: '18px'}} onPress={this.renderCreateForm}>New Post</AwesomeButton>
                :
                null
                }
            </>
        )
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <Switch>
                    <Route exact path="/forum" render={() => this.getDisplayContent()} />
                    <Route exact path="/forum/new" render={() => <CreateForumPost currentUser={this.props.currentUser} handleSubmit={this.submitNewPost} />} />
                    <Route exact path="/forum/:post" render={() => <ForumPost post={this.state.post} />} />
                </Switch>
            </div>
        )
    }
}

export default withRouter(Forum)