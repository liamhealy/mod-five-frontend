import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import ForumCard from '../components/ForumCard';
// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class Profile extends Component {

    state = {
        posts: null
    }

    componentDidMount() {
        if (this.props.currentUser) {
            this.getDataFromCurrentUser()
        }
    }

    // refreshUser = () => {
    //     fetch(`http://localhost:3000/api/v1/users/${user.username}`)
    //     .then(resp => resp.json())
    //     .then(json => {
    //         if (json.data) {
    //             this.setState({
    //                 currentUser: json
    //             })
    //         } else {
    //         // Display errors at some point
    //         }
    //     })
    // }

    renderUserInfo = () => {
        return (
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {this.props.currentUser.data.attributes.username}
                    </Typography>
                    <Typography color="textSecondary">
                        Username
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {this.props.currentUser.data.attributes.first_name}
                    </Typography>
                    <Typography color="textSecondary">
                        First Name
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {this.props.currentUser.data.attributes.last_name}
                    </Typography>
                    <Typography color="textSecondary">
                        Last Name
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {this.props.currentUser.data.attributes.email}
                    </Typography>
                    <Typography color="textSecondary">
                        Email
                    </Typography>
                </CardContent>
            </Card>
        )
    }

    renderUserStats = () => {
        return (
            <Card variant="outlined" style={{marginTop: 20, marginBottom: 20}}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Your statistics:
                    </Typography>

                    {this.props.currentUser.data.relationships.posts.data
                    ?
                    <Typography variant="h6" component="h2">
                        You've created <span style={{color: 'lightgreen'}}>{this.props.currentUser.data.relationships.posts.data.length}</span> posts
                    </Typography>
                    :
                    null
                    }
                    {this.props.currentUser.data.relationships.responses.data
                    ?
                    <Typography variant="h6" component="h2">
                        You've left <span style={{color: 'lightgreen'}}>{this.props.currentUser.data.relationships.responses.data.length}</span> responses
                    </Typography>
                    :
                    null
                    }
                    {this.props.currentUser.data.relationships.stream_followers.data
                    ?
                    <Typography variant="h6" component="h2">
                        You're currently following <span style={{color: 'lightgreen'}}>{this.props.currentUser.data.relationships.stream_followers.data.length}</span> streamers
                    </Typography>
                    :
                    null
                    }
                </CardContent>
            </Card>
        )
    }

    getDataFromCurrentUser = () => {
        let tempArr = [];
        for (let i = 0; i < this.props.currentUser.included; i++) {
            if (this.props.currentUser.included[i].type === "post") {
                // return <ForumCard key={this.props.currentUser.included[i].attributes.id} post={this.props.currentUser.included[i].attributes.id} viewForumPost={this.props.viewForumPost} />
                tempArr.push(this.props.currentUser.included[i])
            }
        }
        this.setState({posts: [...tempArr]})
    }

    renderForumCards = () => {
        return this.props.currentUser.included.map(item => {
            if (item.type === "post") {
                return <ForumCard key={item.attributes.id} post={item} viewForumPost={this.props.viewForumPost} />
            }
        })
    }

    renderUserStreamers = () => {
        return (
            <>
                <AppBar position="static" style={{backgroundColor: '#95d44a', color: '#3f8228', boxShadow: '#52a934', marginBottom: 20}}>
                    <Typography variant="h6" component="h2">
                        Who you're following
                    </Typography>
                </AppBar>
                <Grid container spacing={4} style={{margin: '5%', maxWidth: '90%'}}>
                    {this.props.currentUser.included.map(item => {
                        if (item.type === "streamer" && item.attributes.name) {
                            return (
                                <Grid item xs={3}>
                                    <Card style={{boxShadow: '5px 5px lightblue'}}>
                                        <CardContent>
                                            <Typography variant="h6" component="h6" gutterBottom>
                                                {item.attributes.name}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        }
                    })}
                </Grid>
            </>
        )
    }

    renderUserPosts = () => {
        return (
            <>
                <AppBar position="static" style={{backgroundColor: '#95d44a', color: '#3f8228', boxShadow: '#52a934', marginBottom: 20}}>
                    <Typography variant="h6" component="h2">
                        Your Posts
                    </Typography>
                </AppBar>
                <div style={{marginBottom: 20}}>
                    {this.props.currentUser
                    ?
                    this.renderForumCards()
                    :
                    null
                    }
                </div>
            </>
        )
    }

    render() {
        console.log(this.props.currentUser)
        return (
            <div style={{textAlign: "center"}}>
                <Container maxWidth="lg" style={{marginTop: 50}}>
                    {this.props.currentUser
                    ?
                    <>
                        {this.renderUserInfo()}
                        {this.renderUserStats()}
                        {this.renderUserPosts()}
                        {this.renderUserStreamers()}
                    </>
                    :
                    <h1>This user is not signed in!</h1>
                    }
                </Container>
            </div>
        )
    }
}

export default Profile