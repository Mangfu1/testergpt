import { Box, Input, Button, Avatar, Flex, Text, Textarea } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

function ChatApp() {
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [systemMessage, setSystemMessage] = useState('你是 ChatGPT，一个由 OpenAI 训练的大型语言模型。请仔细遵循用户的指示。使用 Markdown 格式进行回应。');

  const sendMessage = async () => {
    setChatMessages(prevChat => [...prevChat, { role: 'user', content: message }]);
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
    let assistantText = ""; // Add a variable to store the assistant's response
  
    const read = () => {
      return reader.read().then(({ done, value }) => {
        if (done) {
          console.log("End of stream");
          setChatMessages(prevChat => [...prevChat, { role: 'assistant', content: assistantText }]); // Add the assistant's response to chatMessages
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
                  assistantText += json.choices[0].delta.content; // Append the text to the assistantText variable
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
    setMessage(''); // Clear the input box
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
            <Text>{chatMessage.content}</Text>
          </Box>
        </Flex>
      ))}
    </Box>
  );
}

export default ChatApp;