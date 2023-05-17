import { Box } from '@chakra-ui/react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChatApp from '../components/ChatApp';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../components/HomePage';
import LoginPage from '../components/LoginPage';


function MainLayout() {
  return (
    <Box display="flex">
      <Sidebar />
      <Box flex="1" display="flex" flexDirection="column">
        <Header />
        <Routes>
          <Route path="home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/chat" element={<ChatApp />} />
          {/* ...其他路由 */}
        </Routes>
      </Box>
    </Box>
  );
}

export default MainLayout;
