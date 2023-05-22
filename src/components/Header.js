import { Box, IconButton, ButtonGroup, Button, Menu, MenuButton, MenuList, MenuItem, useColorMode } from '@chakra-ui/react';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import { MdLanguage, MdNotifications, MdAccountCircle } from 'react-icons/md';
import { FaMoon, FaSun } from 'react-icons/fa';

function Header({ onMenuButtonClick, isMenuButtonVisible }) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box display="flex" justifyContent="flex-end" fontFamily="Roboto, sans-serif">
      {isMenuButtonVisible && (
        <IconButton
          icon={<HamburgerIcon />}
          onClick={onMenuButtonClick}
          mr="3"
        />
      )}
      <ButtonGroup variant="outline" spacing="3">
        <Menu>
          <MenuButton as={Button} leftIcon={<MdLanguage />} rightIcon={<ChevronDownIcon />}>
            Language
          </MenuButton>
          <MenuList>
            <MenuItem>English</MenuItem>
            <MenuItem>中文</MenuItem>
          </MenuList>
        </Menu>
        <IconButton icon={colorMode === 'light' ? <FaSun /> : <FaMoon />} onClick={toggleColorMode} />
        <IconButton icon={<MdNotifications />} />
        <Menu>
          <MenuButton as={Button} leftIcon={<MdAccountCircle />}>
            Profile
          </MenuButton>
          <MenuList>
            <MenuItem>My Account</MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </ButtonGroup>
    </Box>
  );
}

export default Header;
