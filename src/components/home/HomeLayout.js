import React, { ReactNode } from "react";
import { logout, removeNotification } from "redux/actions/auth";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  FiCompass,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiMessageCircle,
  FiBook,
} from "react-icons/fi";
import { Outlet, Link as ReachLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LinkItems = [
  { name: "Explore", icon: FiCompass, route: "explore" },
  { name: "Homeworks", icon: FiBook, route: "homework"  },
  // { name: "Chat", icon: FiMessageCircle, route: "chat"  },
];

export default function HomeLayout(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav
        onOpen={onOpen}
        email={props.user.email}
        username={props.user.username}
        notifications={props.user.notifications}
      />
      <Box ml={{ base: 0, md: "16%" }} pt={{ base: "16", md: "18" }}>
        <Outlet />
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "100%", md: "16%" }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" align="center" justifyContent="center">
        <Text fontSize="lg" fontFamily="monospace" fontWeight="bold">
          Peer Professor
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} route={link.route}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, route, children, ...rest }) => {
  return (
    <Link
      as={ReachLink} 
      to={route}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "primary.900",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        <Text fontSize={"sm"}>
        {children}
        </Text>
      </Flex>
    </Link>
  );
};

const MobileNav = ({ email, username, onOpen, notifications, ...rest }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let c1 = useColorModeValue("white", "gray.900");
  let c2 = useColorModeValue("gray.200", "gray.700");

  return (
    <Flex
      ml={{ base: 0, md: "16%" }}
      px={{ base: 4, md: 4 }}
      height={{ base: "16", md: "18" }}
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      position="fixed"
      w={{ base: "100%", md: "84%" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <HStack spacing={{ base: "0", md: "6" }}>
        {notifications.length > 0 && (
          <Flex alignItems={"center"} pr="1">
            <Menu>
              <MenuButton
                as={IconButton}
                py={2}
                _focus={{ boxShadow: "none" }}
                size="lg"
                variant="ghost"
                aria-label="open menu"
                color={notifications.length === 0 ? "black" : "red"}
                bg="red.100"
                icon={<FiBell/>}
              />
              <MenuList
                bg={c1}
                borderColor={c2}
                fontFamily="monospace"
                size="md"
              >
                {notifications.map((notification, index) => {
                  return (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        navigate(notification.url);
                        dispatch(removeNotification(notification));
                      }}
                    >
                      {notification.text}
                    </MenuItem>
                  );
                })}
                <MenuDivider />
                <MenuItem
                  onClick={() => {
                    for (const notification of notifications) {
                      dispatch(removeNotification(notification));
                    }
                  }}
                >
                  Clear All
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        )}
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton py={2} _focus={{ boxShadow: "none" }}>
              <HStack>
                <Text fontSize="sm">{email}</Text>
                <Box display={{ base: "flex", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
              fontFamily="monospace"
              size="md"
            >
              <MenuItem onClick={() => navigate("/home/user/" + username)}>
                Profile
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => dispatch(logout())}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
