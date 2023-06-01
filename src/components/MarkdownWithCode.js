import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button, Box } from '@chakra-ui/react';

// 定义一个 CodeBlock 组件
const CodeBlock = ({ language, value }) => (
  <Box>
    <SyntaxHighlighter style={solarizedlight} language={language}>
      {value}
    </SyntaxHighlighter>
    <CopyToClipboard text={value}>
      <Button>Copy</Button>
    </CopyToClipboard>
  </Box>
);

// 定义一个 MarkdownWithCode 组件
const MarkdownWithCode = ({ content }) => (
  <ReactMarkdown
    components={{
      code({node, inline, className, children, ...props}) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? 
          <CodeBlock language={match[1]} value={String(children).replace(/\n$/, '')} {...props} /> :
          <code className={className} {...props}>{children}</code>
      }
    }}
  >
    {content}
  </ReactMarkdown>
);

export default MarkdownWithCode;