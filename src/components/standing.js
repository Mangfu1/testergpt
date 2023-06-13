// standing.js
import { Box, Avatar, Card, CardBody, CardFooter, CardHeader, Icon } from "@chakra-ui/react";
import { useState } from "react";
import { CheckIcon } from '@chakra-ui/icons';

const SystemCard = ({ card, isSelected }) => {
  const [showCardDetails, setShowCardDetails] = useState(false); // 新增状态变量

  return (
    <Box
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        transition: 'all 0.5s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translate(-60%, -50%)';
        setShowCardDetails(true); // 更新状态变量
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translate(-50%, -50%)';
        setShowCardDetails(false); // 更新状态变量
      }}
    >
      <Card>
        <CardHeader>
          <Avatar>{card.systemMessage}</Avatar>
        </CardHeader>
        {showCardDetails && (
          <CardBody>
            {/* 这里可以添加卡片的详细内容 */}
          </CardBody>
        )}
        <CardFooter>
          {isSelected && <CheckIcon />}
        </CardFooter>
      </Card>
    </Box>
  );
};

export default SystemCard;
