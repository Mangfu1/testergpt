import { Box, VStack, HStack, Text ,Spacer, IconButton, useColorMode, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { FaChevronDown, FaChevronUp, FaHome, FaCircle } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function LinkComponent({ icon, name, children, href, isPureLink ,isAligning, setHighlightedLink, highlightedLink}) {
  const [isOpen, setIsOpen] = useState(false);
  const { colorMode } = useColorMode();

  const colorTheme = {
    light: {
      bg: '#FFFFFF',
      hoverBg: 'gray.200',
      color: '#605e6b',
      highlightBg: 'gray.300'
    },
    dark: {
      bg: '#303248',
      hoverBg: 'rgba(211, 211, 211, 0.1)',
      color: '#d3d5e0',
      highlightBg: 'rgba(211, 211, 211, 0.2)'
    }
  };

  const handleClick = (e) => {
    if (children && !isPureLink) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
    if (isAligning || isPureLink) {
      setHighlightedLink(name); // 更新高亮链接
    }
  };

  return (
    <VStack align="start" spacing={1}>
      <LinkBox
        as="button"
        w="full"
        maxWidth="140px"
        p={2}
        mt={2}
        borderRadius="md"
        bg={highlightedLink === name ? colorTheme[colorMode].highlightBg : colorTheme[colorMode].bg} // 根据高亮链接改变背景颜色
        _hover={{ bg: colorTheme[colorMode].hoverBg }}
        onClick={handleClick}
      >
        <HStack color={colorTheme[colorMode].color}>
          <LinkOverlay as={Link} to={href || '#'}>
            <HStack>
              {icon}
              <Text fontSize="sm">{name}</Text>
            </HStack>
          </LinkOverlay>
          {children && !isPureLink && (
            <IconButton
              icon={isOpen ? <FaChevronUp /> : <FaChevronDown />}
              size="sm"
              variant="ghost"
              _hover={{ bg: 'none' }}
            />
          )}
        {isAligning && <Spacer />}
        {isAligning && <Spacer />}
        {isAligning && <Spacer />}
        {isAligning && <Spacer />}
        {isAligning && <Spacer />}
        </HStack>

      </LinkBox>
      {isOpen && children}
    </VStack>
  );
}

function FirstLevelLink({ icon, name, children, href, isPureLink, setHighlightedLink, highlightedLink }) {
  return <LinkComponent icon={icon} name={name} href={href} isPureLink={isPureLink} setHighlightedLink={setHighlightedLink} highlightedLink={highlightedLink}>{children}</LinkComponent>;
}

function SecondLevelLink({ name, children, href, isPureLink ,isAligning, setHighlightedLink, highlightedLink }) {
  return <LinkComponent icon={<FaCircle size="0.8em" />} name={name} href={href} isPureLink={isPureLink} isAligning={isAligning} setHighlightedLink={setHighlightedLink} highlightedLink={highlightedLink}>{children}</LinkComponent>;
}

function ThirdLevelLink({ name, href, children, isPureLink , isAligning, setHighlightedLink, highlightedLink}) {
  return <LinkComponent icon={<FaCircle size="0.8em" style={{ visibility: 'hidden' }} />} name={name} href={href} isPureLink={isPureLink} isAligning={isAligning} setHighlightedLink={setHighlightedLink} highlightedLink={highlightedLink}>{children}</LinkComponent>;
}



function Sidebar() {
  const { colorMode } = useColorMode();
  const [highlightedLink, setHighlightedLink] = useState(null); // 新增状态

  return (
    <Box bg={colorMode === 'light' ? '#FFFFFF' : '#303248'} p={2} maxWidth="300px">
      <FirstLevelLink icon={<FaHome size="0.8em" />} name="登录" href="/login" isPureLink setHighlightedLink={setHighlightedLink} highlightedLink={highlightedLink} />
      <FirstLevelLink icon={<FaHome size="0.8em" />} name="首页" href="/home" isPureLink setHighlightedLink={setHighlightedLink} highlightedLink={highlightedLink}  />
      <FirstLevelLink icon={<FaHome size="0.8em" />} name="chat" href="/chat" isPureLink setHighlightedLink={setHighlightedLink} highlightedLink={highlightedLink}  />
      <FirstLevelLink icon={<FaHome size="0.8em" />} name="一级链接" >
      <SecondLevelLink name="纯二级链"   isAligning setHighlightedLink={setHighlightedLink} highlightedLink={highlightedLink}  />
        <SecondLevelLink name="二级链接" >
          <ThirdLevelLink name="三级链接"  isAligning setHighlightedLink={setHighlightedLink} highlightedLink={highlightedLink}  />
        </SecondLevelLink>
      </FirstLevelLink>
      <FirstLevelLink icon={<FaHome size="0.8em" />} name="纯一级链接"  isPureLink setHighlightedLink={setHighlightedLink} highlightedLink={highlightedLink}  />
      <SecondLevelLink name="纯二级链接"  isPureLink setHighlightedLink={setHighlightedLink} highlightedLink={highlightedLink}  />
    </Box>
  );
}

export default Sidebar;
