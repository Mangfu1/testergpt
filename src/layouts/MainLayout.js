import { Box } from '@chakra-ui/react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChatApp from '../components/ChatApp';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../components/HomePage';

function MainLayout() {
  return (
    <Box display="flex">
      <Sidebar />
      <Box flex="1" display="flex" flexDirection="column">
        <Header />
        <ChatApp />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* ...其他路由 */}
        </Routes>
      </Box>
    </Box>
  );
}

export default MainLayout;
