// Header.js

import { Box, Heading, Flex, IconButton, Spacer, Badge, Avatar, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { HamburgerIcon, SearchIcon, BellIcon, ChatIcon } from '@chakra-ui/icons';

function Header() {
  return (
    <Flex bg="blue.500" color="white" p="2" alignItems="center" height="60px">
      <IconButton icon={<HamburgerIcon />} variant="outline" colorScheme="whiteAlpha" />
      <Breadcrumb ml="4" color="white" fontSize="sm">
        <BreadcrumbItem>
          <BreadcrumbLink href="#">仪表盘</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">分析</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Spacer />
      <IconButton icon={<SearchIcon />} variant="outline" colorScheme="whiteAlpha" />
      <IconButton icon={<BellIcon />} variant="outline" colorScheme="whiteAlpha" ml="2">
        <Badge colorScheme="red" borderRadius="full" boxSize="1.25em" ml="-0.8em" mt="-0.8em">4</Badge>
      </IconButton>
      <IconButton icon={<ChatIcon />} variant="outline" colorScheme="whiteAlpha" ml="2">
        <Badge colorScheme="red" borderRadius="full" boxSize="1.25em" ml="-0.8em" mt="-0.8em">2</Badge>
      </IconButton>
      <Avatar size="sm" name="User Name" src="https://bit.ly/broken-link" ml="4" />
    </Flex>
  );
}

export default Header;
