import React from 'react';
import Paper from '@material-ui/core/Paper';
import CodeBlock from './CodeBlock';
import ReactMarkdown from 'react-markdown';
import Typography from '@material-ui/core/Typography';

export default function Response(props) {
    return (
        <Paper style={{ border: "5px solid #b6e986", marginTop: "75px", marginLeft: "15px", marginRight: "15px"}}>
            <Typography variant="h5" component="h3" style={{margin: 10}}>
                {props.user.username}
                <Typography component="p">
                    ({props.user.email})
                </Typography>
            </Typography>
            <hr/>
            <article className="markdown-body" style={{margin: 20, fontSize: 20}}>
                <ReactMarkdown source={props.response.body} renderers={{code: CodeBlock}}/>
            </article>
        </Paper>
    )
}