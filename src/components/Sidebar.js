// Sidebar.js

import { Box, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

function Sidebar() {
  return (
    <Box bg="gray.100" p="2" width="200px">
      <Link as={RouterLink} to="home">主页</Link>
      <Link as={RouterLink} to="/login">登录</Link>
      <Link as={RouterLink} to="/chat">chat</Link>
      {/* ...其他链接 */}
    </Box>
  );
}

export default Sidebar;