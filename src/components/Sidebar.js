// Sidebar.js
import { Box, Link, VStack, useColorMode, Icon, IconButton, Collapse } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { MdHome, MdLockOpen, MdChat, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useState } from 'react';

function Sidebar() {
  const { colorMode } = useColorMode();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const CollapseButton = () => (
    <IconButton
      icon={isCollapsed ? <MdChevronRight /> : <MdChevronLeft />}
      onClick={() => setIsCollapsed(!isCollapsed)}
      _hover={{ textDecoration: 'none', color: 'blue.500' }}
    />
  );

  return (
    <VStack align="start" spacing={4} p="4" w={isCollapsed ? "60px" : "200px"} transition="width 0.2s">
      <Box w="100%" h="50px" as={RouterLink} to="home" _hover={{ textDecoration: 'none', color: 'blue.500' }}>
        <img src="logo.png" alt="Logo" />
      </Box>
      <Link as={RouterLink} to="home" _hover={{ textDecoration: 'none', color: 'blue.500' }}>
        <Icon as={MdHome} />
        <Collapse in={!isCollapsed}>
          <Box ml={2}>主页</Box>
        </Collapse>
      </Link>
      <Link as={RouterLink} to="/login" _hover={{ textDecoration: 'none', color: 'blue.500' }}>
        <Icon as={MdLockOpen} />
        <Collapse in={!isCollapsed}>
          <Box ml={2}>登录</Box>
        </Collapse>
      </Link>
      <Link as={RouterLink} to="/chat" _hover={{ textDecoration: 'none', color: 'blue.500' }}>
        <Icon as={MdChat} />
        <Collapse in={!isCollapsed}>
          <Box ml={2}>chat</Box>
        </Collapse>
      </Link>
      {/* ...其他链接 */}
      <CollapseButton />
    </VStack>
  );
}

export default Sidebar;
