import React, { Component } from 'react';
import ForumCard from '../components/ForumCard';
import Container from '@material-ui/core/Container';
import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/themes/theme-blue.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link, withRouter } from 'react-router-dom';

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

    renderForumCards = () => {
        return this.state.posts.map(post => <ForumCard key={post.id} post={post} routerProps={this.props.routerProps} viewForumPost={this.props.viewForumPost} />)
    }

    handleRedirect = () => {
        this.setState({
            post: null
        }, () => this.props.history.push("/forum"))
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
                    <AwesomeButton type="primary" size="small" style={{ marginTop: 20, width: '280px', height: '40px', fontSize: '18px'}}>New Post</AwesomeButton>
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
                    {this.getDisplayContent()}
                </div>
            </>
        )
    }
}

export default withRouter(Forum)