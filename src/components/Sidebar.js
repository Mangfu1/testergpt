import { Box, VStack, HStack, Text, IconButton, useColorMode, Spacer, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { FaChevronDown, FaChevronUp, FaHome, FaCircle } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function LinkComponent({ icon, name, children, href }) {
  const [isOpen, setIsOpen] = useState(false);
  const { colorMode } = useColorMode();

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (e) => {
    if (children) {
      e.preventDefault();
      toggleOpen();
    }
  };

  return (
    <VStack align="start" spacing={1}>
      <LinkBox
        as="button"
        w="full"
        maxWidth="200px" // 使用maxWidth属性来限制最大宽度
        p={2}
        mt={2}
        borderRadius="md"
        bg={colorMode === 'light' ? '#FFFFFF' : '#303248'}
        _hover={{ bg: colorMode === 'light' ? 'gray.200' : colorMode === 'dark' ? 'gray.700' : 'gray.500' }}
        onClick={handleClick}
        width="100%" // 控制链接的长度
        backgroundColor={colorMode === 'light' ? '#FFFFFF' : '#303248'} // 设置背景颜色
        color={colorMode === 'light' ? '#605e6b' : '#d3d5e0'} // 设置文字颜色
      >
        <HStack color={colorMode === 'light' ? '#605e6b' : '#d3d5e0'}>
          <LinkOverlay as={Link} to={href || '#'}>
            <HStack>
              {icon}
              <Text fontSize="sm">{name}</Text>
            </HStack>
          </LinkOverlay>
          <Spacer />
          {children && (
            <IconButton
              icon={isOpen ? <FaChevronUp /> : <FaChevronDown />}
              size="sm"
              variant="ghost"
              _hover={{ bg: 'none' }}
            />
          )}
          {!children && <Spacer />}
          {!children && <Spacer />}
          {!children && <Spacer />}
          {!children && <Spacer />}
          {!children && <Spacer />}
        </HStack>
      </LinkBox>
      {isOpen && children}
    </VStack>
  );
}


function FirstLevelLink({ icon, name, children, href }) {
  return <LinkComponent icon={icon} name={name} href={href}>{children}</LinkComponent>;
}

function SecondLevelLink({ name, children, href }) {
  return <LinkComponent icon={<FaCircle size="0.8em" />} name={name} href={href}>{children}</LinkComponent>;
}

function ThirdLevelLink({ name, href, children }) {
  return <LinkComponent icon={<FaCircle size="0.8em" style={{ visibility: 'hidden' }} />} name={name} href={href}>{children}</LinkComponent>;
}

function Sidebar() {
  const { colorMode } = useColorMode();
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (name) => {
    setActiveLink(name);
  };

  return (
    <Box bg={colorMode === 'light' ? '#FFFFFF' : '#303248'} p={2} maxWidth="300px">
      <FirstLevelLink icon={<FaHome size="0.8em" />} name="一级链接" href="/first-level" onClick={handleLinkClick} isActive={activeLink === '一级链接'}>
        <SecondLevelLink name="二级链接" href="/second-level" onClick={handleLinkClick} isActive={activeLink === '二级链接'}>
          <ThirdLevelLink name="三级链接" href="/third-level" onClick={handleLinkClick} isActive={activeLink === '三级链接'} />
        </SecondLevelLink>
      </FirstLevelLink>
    </Box>
  );
}



export default Sidebar;
