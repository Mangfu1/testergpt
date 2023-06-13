// ChatApp.js
import { Box, Button, Input, Avatar, useClipboard, useToast, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeReact from "rehype-react";
import { createElement } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import SystemCard from './standing'; // 引入 SystemCard 组件

const CodeBlock = (props) => {
  const { children } = props;
  let language = "unknown";
  let code = children;
  const { onCopy, hasCopied } = useClipboard(code);
  const toast = useToast();

  if (Array.isArray(children) && children[0] && children[0].props.className) {
    language = children[0].props.className.split("-")[1];
    code = children[0].props.children;
  }

  const handleCopy = () => {
    onCopy();
    toast({
      title: "Code copied",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box
      bg="#091f3c"
      p={2}
      borderRadius="12px"
      border="1px solid transparent"
      position="relative"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#7bb3fe";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "transparent";
      }}
    >
      <Flex justifyContent="space-between" p={0} borderRadius="12px 12px 0 0" style={{ height: "auto" }}>
        <Box style={{ fontSize: "0.8rem", lineHeight: "1", padding: "0", margin: "0" }}>{language !== "unknown" ? language : ""}</Box>
        <CopyToClipboard text={language !== "unknown" ? code : ""} onCopy={handleCopy}>
          <Button variant="solid" style={{ borderRadius: "12px", backgroundColor: "#2b4a75", padding: "8px", fontSize: "0.8rem", lineHeight: "1", margin: "0", position: "absolute", top: "5px", right: "5px", border: "2px solid #7bb3fe" }}>
            {hasCopied ? "已复制" : "复制"}
          </Button>
        </CopyToClipboard>
      </Flex>
      <pre>{code}</pre>
    </Box>
  );
};

const MessageBubble = ({ message }) => {
  const markdown = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeReact, {
      createElement,
      components: {
        pre: CodeBlock,
      },
    })
    .processSync(message.content).result;

  return (
    <Flex align="center" my={2} direction={message.role === "user" ? "row-reverse" : "row"}>
      <Avatar>{message.role === "user" ? "U" : "G"}</Avatar>
      <Box ml={2} p={2} bg="grey.200" borderRadius="borderRadius">
        {markdown}
      </Box>
    </Flex>
  );
};

const ChatApp = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [cards, setCards] = useState([
    { id: 1, systemMessage: "你是 ChatGPT，一个由 OpenAI 训练的大型语言模型。请仔细遵循用户的指示。使用 Markdown 格式进行回应。" },
    // 添加更多卡片...
  ]);
  const [selectedCardId, setSelectedCardId] = useState(1);
  const [currentAssistantMessage, setCurrentAssistantMessage] = useState("");
  const [systemMessage, setSystemMessage] = useState(""); // 新增状态变量

  const sendMessage = async () => {

    const selectedCard = cards.find(card => card.id === selectedCardId);
    if (selectedCard) {
      setSystemMessage(selectedCard.systemMessage); // 更新"system"参数
    }

    setChatMessages((prevChat) => [
      ...prevChat,
      { role: "user", content: message },
    ]);
    postStreamList((text, done) => {
      setCurrentAssistantMessage(text);
      if (done === "[DONE]") {
        setChatMessages((prevChat) => [
          ...prevChat,
          { role: "assistant", content: text },
        ]);
        setCurrentAssistantMessage("");
        setMessage("");
      }
    });
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

  return (
    <Box position="relative" height="100%">
      {cards.map(card => (
        <SystemCard
          key={card.id}
          card={card}
          isSelected={card.id === selectedCardId}
          onClick={() => setSelectedCardId(card.id)}
        />
      ))}
      <Flex
        position="absolute"
        bottom="10px"
        left="50%"
        transform="translate(-50%, 0)"
        transition="all 0.5s ease"
        width="80%"
        justifyContent="space-between"
      >
        <Input
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          flex="1"
          marginRight="10px"
        />
        <Button variant="contained" onClick={sendMessage}>Send</Button>
      </Flex>
      {chatMessages.map((chatMessage, index) => (
        <MessageBubble
          key={index}
          message={chatMessage}
        />
      ))}
      {currentAssistantMessage && (
        <MessageBubble
          message={{ role: 'assistant', content: currentAssistantMessage }}
        />
      )}
    </Box>
  );
};

export default ChatApp;