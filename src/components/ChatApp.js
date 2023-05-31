import { Box, Input, Button, Avatar, Flex, Textarea } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function ChatApp() {
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [systemMessage, setSystemMessage] = useState('你是 ChatGPT，一个由 OpenAI 训练的大型语言模型。请仔细遵循用户的指示。使用 Markdown 格式进行回应。');
  const [currentAssistantMessage, setCurrentAssistantMessage] = useState('');

  const renderers = {
    code: ({language, value}) => {
      return (
        <Box>
          <SyntaxHighlighter style={solarizedlight} language={language} children={value} />
          <CopyToClipboard text={value}>
            <Button>Copy</Button>
          </CopyToClipboard>
        </Box>
      );
    }
  };
  const postStreamList = async (callback) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [{ role: 'system', content: systemMessage }].concat(chatMessages.concat({ role: 'user', content: message }))
      })
    };
    const streamResponse = await fetch('http://45.145.73.161:3001/chat', requestOptions);
    const reader = streamResponse.body.getReader();
    let errText = "";
    let assistantText = "";

    const read = () => {
      return reader.read().then(({ done, value }) => {
        if (done) {
          console.log("End of stream");
          callback(assistantText, "[DONE]");
          return;
        }

        const textDecoder = new TextDecoder();
        const strArr = (errText + textDecoder.decode(value)).split("data: ");
        if (strArr) {
          for (let i = 0; i < strArr.length; i++) {
            let json = {};
            if (strArr[i] && strArr[i] !== "[DONE]") {
              try {
                json = JSON.parse(strArr[i]);
                if (json.choices.length && json.choices[0].delta.content) {
                  assistantText += json.choices[0].delta.content;
                  callback(assistantText); // Call the callback with the current assistant text
                }
                errText = "";
              } catch (e) {
                console.log("Error", strArr[i])
                errText = strArr[i];
              }
            }
          }
        }
        return read();
      });
    }

    read();
  }

  const sendMessage = async () => {
    setChatMessages(prevChat => [...prevChat, { role: 'user', content: message }]);
    postStreamList((text, done) => {
      setCurrentAssistantMessage(text); // Update the current assistant message
      if (done === "[DONE]") {
        setChatMessages(prevChat => [...prevChat, { role: 'assistant', content: text }]);
        setCurrentAssistantMessage(''); // Clear the current assistant message
        setMessage('');
      }
    });
  }

  return (
    <Box>
      <Textarea placeholder="Enter system message" value={systemMessage} onChange={(e) => setSystemMessage(e.target.value)} />
      <Input placeholder="Enter your message" value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button onClick={sendMessage}>Send</Button>
      {chatMessages.map((chatMessage, index) => (
        <Flex key={index} align="center" my={2} direction={chatMessage.role === 'user' ? 'row-reverse' : 'row'}>
          <Avatar name={chatMessage.role === 'user' ? 'User' : 'GPT'} src={chatMessage.role === 'user' ? 'https://bit.ly/broken-link' : 'https://bit.ly/broken-link'} />
          <Box ml={2} p={2} bg="gray.100" borderRadius="md">
            <ReactMarkdown renderers={renderers}>{chatMessage.content}</ReactMarkdown>
          </Box>
        </Flex>
      ))}
      {currentAssistantMessage && (
        <Flex align="center" my={2} direction='row'>
          <Avatar name='GPT' src='https://bit.ly/broken-link' />
          <Box ml={2} p={2} bg="gray.100" borderRadius="md">
            <ReactMarkdown renderers={renderers}>{currentAssistantMessage}</ReactMarkdown>
          </Box>
        </Flex>
      )}
    </Box>
  );
}

export default ChatApp;








