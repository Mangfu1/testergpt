import { Box, useColorMode } from '@chakra-ui/react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChatApp from '../components/ChatApp';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../components/HomePage';
import LoginPage from '../components/LoginPage';

function MainLayout() {
  const { colorMode } = useColorMode();

  return (
    <Box display="flex" bg={colorMode === 'light' ? 'rgb(248, 247, 250)' : '#26293b'} p="0">
      <Box bg={colorMode === 'light' ? '#FFFFFF' : '#303248'} color={colorMode === 'light' ? '#605e6b' : '#d3d5e0'} h="100vh" >
        <Sidebar />
      </Box>
      <Box flex="1" display="flex" flexDirection="column">
        <Box bg={colorMode === 'light' ? '#FFFFFF' : '#303248'} color={colorMode === 'light' ? '#605e6b' : '#d3d5e0'} p="2.5" borderRadius="lg" boxShadow="md" m="3">
          <Header />
        </Box>
        <Box bg={colorMode === 'light' ? '#FFFFFF' : '#303248'} color={colorMode === 'light' ? '#605e6b' : '#d3d5e0'} p="2.5" borderRadius="lg" boxShadow="md" m="3" flex="1">
          <Routes>
            <Route path="home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/chat" element={<ChatApp />} />
            {/* ...其他路由 */}
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default MainLayout;
