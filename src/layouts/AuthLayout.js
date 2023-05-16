import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <Box>
      {/* ...你的布局代码... */}
      <Outlet />
    </Box>
  );
}

export default AuthLayout;
