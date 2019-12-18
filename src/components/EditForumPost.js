import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import AceEditor from "react-ace";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-textmate";
import Chip from '@material-ui/core/Chip';
import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/themes/theme-eric.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withRouter, Route } from 'react-router-dom';

class EditForumPost extends Component {

    state = {
        user_id: this.props.currentUser.data.id,
        title: this.props.post.title,
        description: this.props.post.description,
        body: this.props.post.body
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleAceChange = (e) => {
        this.setState({
            body: e
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        fetch (`http://localhost:3000/api/v1/posts/${this.props.post.id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(this.state)
        })
        .then(resp => resp.json())
        .then(json => this.props.viewForumPost(json.data.attributes))
    }

    renderContent = () => {
        return (
            <Container maxWidth="lg" style={{marginTop: 50}}>
                <Grid container spacing={8}>
                    <Grid item xs={8}>
                        <Paper style={{alignContent: 'left', marginBottom: 20}}>
                            <form onSubmit={this.handleSubmit}>
                                <Typography variant="h4" component="h4">
                                    Edit Forum Post
                                </Typography>
                                <TextField id="outlined-basic" label="Title" variant="outlined" name="title" value={this.state.title} style={{margin: 20}} onChange={this.handleChange} /><br />
                                <TextField id="outlined-basic" label="Give us a short description" variant="outlined" value={this.state.description} name="description" style={{margin: 20, width: '80%'}} onChange={this.handleChange} />
                                <Typography variant="h6" component="h6">
                                    Body
                                </Typography>
                                <Chip label="Note - This is a markdown text field" color="primary" style={{ margin: 30 }} />
                                <AceEditor
                                    mode="markdown"
                                    theme="textmate"
                                    name="body"
                                    editorProps={{ $blockScrolling: true }}
                                    onChange={this.handleAceChange}
                                    value={this.state.body}
                                    style={{
                                        fontSize: 20,
                                        width: '100%',
                                        height: '700px'
                                    }}
                                />
                                    <AwesomeButton type="secondary" size="medium" style={{fontSize: '24px', margin: 30 }}>Submit</AwesomeButton>
                            </form>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper style={{alignContent: 'left', marginBottom: 20}}>
                            <Typography variant="h6" component="h6">
                                Markdown Cheat Sheet
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText primary="Use #'s to create headers (# H1, ## H2, ### H3)" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Use ** ** to enclose bold text (**This text will be bold**)" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Use > to begin blockquotes (> This text will be a block quote)" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Use `` to style lines of code, or ```<programming language> ``` to create code blocks" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Use '---' to create horizontal lines" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Use []() to create links ([link](https://somewebsite.com))" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Use ![]() to create images (![alt text](https://imageurl.com))" />
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        )
    }

    render() {
        return (
                <div>
                    <Route exact path="/forum/:post/edit" render={() => this.renderContent()} />
                </div>
        )
    }

}

export default withRouter(EditForumPost)