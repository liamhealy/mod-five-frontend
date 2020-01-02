import React, { Component } from 'react';
import ReactTwitchEmbedVideo from "react-twitch-embed-video"
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import { withRouter } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';

class Stream extends Component {

    // state = {
    //     userFollows: null,
    //     streamer: null,
    //     streamFollowerId: null,
    //     following: null
    // }

    // componentDidMount() {
    //     fetch(`http://localhost:3000/api/v1/streamers/${this.props.routerProps.match.params.username.toLowerCase()}`)
    //     .then(resp => resp.json())
    //     .then(json => {
    //         if (json.error) {
    //             this.storeStreamer()
    //         } else {
    //             this.setState({ streamer: json })
    //         }
    //     })
    //     .then(() => {
    //         if (this.props.currentUser && this.state.streamer) {
    //             this.checkForStreamFollower()
    //         }
    //     })
    // }

    // storeStreamer = () => {
    //     fetch('http://localhost:3000/api/v1/streamers', {
    //         method: "POST",
    //         headers: {
    //             'content-type': 'application/json',
    //             'accept': 'application/json'
    //         },
    //         body: JSON.stringify({name: this.props.routerProps.match.params.username.toLowerCase()})
    //     })
    //     .then(resp => resp.json())
    //     .then(json => this.setState({ streamer: json }))
    // }

    // checkForStreamFollower = () => {
    //     for (let i = 0; i < this.props.currentUser.included.length; i++) {
    //         let relation = this.props.currentUser.included[i];
    //         if (relation.type === "stream_follower") {
    //             if (relation.attributes.streamer_id === Number(this.state.streamer.data.id)) {
    //                 this.setState({
    //                     streamFollowerId: relation.id,
    //                     following: true
    //                 })
    //                 return;
    //             }
    //         }
    //     }
    //     this.setState({
    //         streamFollowerId: "none",
    //         following: false
    //     })
    // }

    // checkFollowing = () => {
    //     fetch(`http://localhost:3000/api/v1/stream_followers/${this.props.currentUser.data.id}`)
    //     .then(resp => resp.json())
    //     .then(json => {
    //         for (let i = 0; i < json.following; i++) {
    //             if (json.following[i].name === this.props.routerProps.match.params.username.toLowerCase()) {
    //                 this.setState({
    //                     following: true,
    //                     streamFollowerId: json.following.id
    //                 })
    //             } else {
    //                 // return false
    //             }
    //         }
    //     })
    // }

    // followStreamer = () => {
    //     fetch('http://localhost:3000/api/v1/stream_followers', {
    //         method: "POST",
    //         headers: {
    //             "content-type": "application/json",
    //             "accept": "application/json"
    //         },
    //         body: JSON.stringify({
    //             user_id: this.props.currentUser.data.id,
    //             streamer_id: this.state.streamer.data.id
    //         })
    //     })
    //     .then(resp => resp.json())
    //     .then(json => {
    //         this.setState({
    //             streamFollowerId: json.stream_follower.id,
    //             following: true
    //         })
    //     })
    //     .then(() => this.props.filterFollowers())
    // }

    // unFollowStreamer = () => {
    //     let tempId = this.state.streamFollowerId
    //     fetch(`http://localhost:3000/api/v1/stream_followers/${this.state.streamFollowerId}`, {
    //         method: "DELETE",
    //         headers: {
    //             "content-type": "application/json",
    //             "accept": "application/json"
    //         }
    //     })
    //     .then(resp => resp.json())
    //     .then(json => {
    //         this.setState({
    //             streamFollowerId: "none",
    //             following: false
    //         })
    //     })
    //     .then(() => this.props.filterFollowers())
    // }

    // // handleUnfollow = (e) => {
    // //     e.persist()
    // //     console.log(e)
    // // }

    // handleFollow = (e) => {
    //     e.persist()
    //     if (this.props.currentUser) {
    //         this.followStreamer();
    //     } else {
    //         this.props.history.push("/login");
    //     }
    // }

    // handleUnfollow = (e) => {
    //     e.persist()
    //     if (this.props.currentUser && this.state.following) {
    //         this.unFollowStreamer();
    //     } else {
    //         console.log("You are not allowed to do that.")
    //     }
    // }

    // renderActionButtons = () => {
    //     return (
    //         this.state.following
    //         ?
    //         <Fab variant="extended" style={{backgroundColor: 'red', margin: 20}} onClick={this.handleUnfollow}>
    //             <PersonAddDisabledIcon />
    //             Unfollow
    //         </Fab>
    //         :
    //         <Fab variant="extended" style={{backgroundColor: 'lightblue', margin: 20}} onClick={this.handleFollow}>
    //             <PersonAddIcon />
    //             Follow
    //         </Fab>
    //     )
    // }

    state = {
        streamFollowerId: null,
        following: false,
        streamer: null
    }

    componentDidMount = () => {
        this.getStreamerAndFollowers();
    }

    getStreamerAndFollowers = () => {
        fetch(`http://localhost:3000/api/v1/streamers/${this.props.routerProps.match.params.username.toLowerCase()}`)
        .then(resp =>resp.json())
        .then(json => {
            console.log(json)
            this.setState({
                streamer: json
            })
        })
        .then(() => this.checkIfFollowing())
        // .then(() => {
        //     if (this.props.currentUser) {
        //         this.checkIfFollowing()
        //     }
        // })
    }

    checkIfFollowing = () => {
        // debugger
        if (this.props.currentUser) {
            let follower = this.state.streamer.included.filter(follower => follower.attributes.user_id === Number(this.props.currentUser.data.id))
            console.log(follower[0])
            if (follower[0]) {
                // for (let i = 0; i < this.state.streamer.included; i++) {
                //     if (this.state.streamer.included[i].attributes.user_id === Number(this.props.currentUser.data.id)) {
                        this.setState({
                            streamFollowerId: follower[0],
                            following: true
                        })
                //     }
                // } 
            }
        //  else {
        //     this.setState({
        //         streamFollowerId: null,
        //         following: false
        //     })
        }
        // debugger
    }

    handleFollow = () => {
        if (this.props.currentUser) {
            fetch('http://localhost:3000/api/v1/stream_followers', {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify({
                    user_id: this.props.currentUser.data.id,
                    streamer_name: this.props.routerProps.match.params.username.toLowerCase()
                })
            })
            .then(resp => resp.json())
            .then(() => this.getStreamerAndFollowers())
        } else {
            this.props.history.push('/login');
        }
    }

    handleUnfollow = () => {
        let tempId = this.state.streamFollowerId
        fetch(`http://localhost:3000/api/v1/stream_followers/${this.state.streamFollowerId.id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            }
        })
        .then(resp => resp.json())
        .then(json => {
            this.setState({
                streamFollowerId: "none",
                following: false
            })
        })
        .then(() => this.getStreamerAndFollowers())
    }

    renderActionButtons = () => {
        // debugger
        return (
            this.state.following === true
            ?
            <Fab variant="extended" style={{backgroundColor: 'red', margin: 20}} onClick={this.handleUnfollow}>
                <PersonAddDisabledIcon />
                Unfollow
            </Fab>
            :
            <Fab variant="extended" style={{backgroundColor: 'lightblue', margin: 20}} onClick={this.handleFollow}>
                <PersonAddIcon />
                Follow
            </Fab>
        )
    }

    render() {
        console.log(this.state)
        // // if (this.props.currentUser) {
        // //     this.checkFollowing()
        // // }
        // debugger
        // if (this.state.streamer === null) {
        //     this.getStreamerAndFollowers()
        // }
        return (
                <Paper style={{ border: "5px solid #b6e986", marginTop: "75px", marginLeft: "15px", marginRight: "15px"}}>
                    <ReactTwitchEmbedVideo channel={this.props.routerProps.match.params.username} width='100%' height={700}/>
                    {/* {this.state.streamer && this.props.currentUser ? this.renderActionButtons() : null} */}
                    {/* {this.props.currentUser ? this.renderActionButtons() : null} */}
                    {/* {this.getStreamerAndFollowers()} */}
                    {this.state.streamer ? this.renderActionButtons() : null}
                </Paper>
        )
    }
}

export default withRouter(Stream)