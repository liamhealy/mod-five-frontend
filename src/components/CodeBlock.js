import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import PropTypes from 'prop-types';
import atomdark from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark';

export default class CodeBlock extends React.PureComponent {
    static propTypes = {
      value: PropTypes.string.isRequired,
      language: PropTypes.string,
    }
  
    static defaultProps = {
      language: null,
    }
  
    render() {
      const { language, value } = this.props;
  
      return (
        <SyntaxHighlighter language={language} style={atomdark}>
          {value}
        </SyntaxHighlighter>
      );
    }
  }