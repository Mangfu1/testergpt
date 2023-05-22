import React, { useState } from 'react';
import { Box, useColorMode, useBreakpointValue, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure } from '@chakra-ui/react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../components/HomePage';
import LoginPage from '../components/LoginPage';

function MainLayout() {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box display="flex" bg={colorMode === 'light' ? 'rgb(248, 247, 250)' : '#26293b'} p="0">
      {!isMobile && (
        <Box bg={colorMode === 'light' ? '#FFFFFF' : '#303248'} color={colorMode === 'light' ? '#605e6b' : '#d3d5e0'} h="100vh" mr="4">
          <Sidebar />
        </Box>
      )}
      <Box flex="1" display="flex" flexDirection="column">
        <Box bg={colorMode === 'light' ? '#FFFFFF' : '#303248'} color={colorMode === 'light' ? '#605e6b' : '#d3d5e0'} p="2.5" borderRadius="lg" boxShadow="md" m="3">
          <Header onMenuButtonClick={onOpen} isMenuButtonVisible={isMobile} />
        </Box>
        <Box bg={colorMode === 'light' ? '#FFFFFF' : '#303248'} color={colorMode === 'light' ? '#605e6b' : '#d3d5e0'} p="2.5" borderRadius="lg" boxShadow="md" m="3" flex="1">
          <Routes>
            <Route path="home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* ...其他路由 */}
          </Routes>
        </Box>
      </Box>
      {isMobile && (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay>
            <DrawerContent bg={colorMode === 'light' ? '#FFFFFF' : '#303248'} color={colorMode === 'light' ? '#605e6b' : '#d3d5e0'} borderRadius="lg">
              <DrawerCloseButton />
              <Sidebar />
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      )}
    </Box>
  );
}

export default MainLayout;
