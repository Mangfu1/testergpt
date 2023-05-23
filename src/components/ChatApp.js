import React, { useState } from 'react';
import { Box, Input, Button, VStack, Text } from '@chakra-ui/react';
import axios from 'axios';

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    setMessages([...messages, { text: input, user: 'You' }]);
    setInput('');

    try {
      const response = await axios.post('/api/chat', { message: input });
      setMessages([...messages, { text: response.data.message, user: 'ChatGPT' }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  axios.post('http://localhost:3001/api/chat', { message: 'Hello, world!' })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error sending message:', error);
  });

  return (
    <Box>
      <VStack spacing={4}>
        {messages.map((message, index) => (
          <Text key={index} textAlign={message.user === 'You' ? 'right' : 'left'}>
            <strong>{message.user}:</strong> {message.text}
          </Text>
        ))}
      </VStack>

      <Input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type your message here..."
      />

      <Button onClick={sendMessage}>Send</Button>
    </Box>
  );
}

export default ChatApp;
