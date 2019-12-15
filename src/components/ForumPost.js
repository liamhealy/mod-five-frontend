import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css';
import Container from '@material-ui/core/Container';
import CodeBlock from './CodeBlock';

class ForumPost extends Component {

    render() {
        return (
            <>
                <Container maxWidth="md" style={{marginTop: 50, textAlign: 'left'}}>
                    <article className="markdown-body" style={{fontSize: 26}}>
                        <ReactMarkdown source={this.props.post.attributes.body} renderers={{code: CodeBlock}}/>
                    </article>
                </Container>
            </>
        )
    }

}

export default ForumPost