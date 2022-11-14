import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Avatar,
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  useDisclosure,
  Button,
  Text,
  Popover,
  PopoverTrigger,
  color,
  Divider,
  border,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { AllContext } from "../Context/AllContextProvider";

let inputLinks = [
  {
    to: "/",
    title: "home",
    childrens: [
      { to: "/products", title: "products" },
      { to: "/cart", title: "cart" },
      { to: "/", title: "more" },
    ],
  },
  { to: "/products", title: "products" },
  { to: "/cart", title: "cart" },
  { to: "/more", title: "more" },
];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box>
        <Flex
          as="header"
          position="fixed"
          w="100%"
          bg="white"
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          zIndex="10"
          pl="5"
          pr="5"
          top="0"
          background="gray.100"
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <NavLink to="/">
                <Heading size="md">DermStore</Heading>
              </NavLink>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {inputLinks.map((link) => (
                <NavLink
                  key={link.title}
                  to={link.to}
                  style={({ isActive }) =>
                    isActive ? { textDecoration: "underline" } : undefined
                  }
                  end
                >
                  <Heading size="sm">{link.title}</Heading>
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <AvatarComponent />
        </Flex>

        {isOpen ? (
          <Box
            display={{ md: "none" }}
            bg="white"
            position="fixed"
            top="16"
            width="100%"
            zIndex="15"
            pb="5"
            boxShadow="xl"
          >
            <Stack as={"nav"} spacing={4}>
              {inputLinks.map((link) => (
                <NavLink key={link.title} to={link.to} onClick={onClose}>
                  <Text>{link.title}</Text>
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

export function AvatarComponent() {
  let { state, logOut } = useContext(AllContext);

  let img;
  if (state.auth) {
    img = "https://ca.slack-edge.com/T044M5T44JV-U0462RS10FK-010c46713479-512";
  }

  return (
    <Flex alignItems={"center"}>
      <Menu>
        <MenuButton
          as={Button}
          rounded={"full"}
          variant={"link"}
          cursor={"pointer"}
          minW={0}
        >
          <Avatar size={"sm"} src={img} />
        </MenuButton>
        <MenuList>
          <Link to="/profile">
            <MenuItem>Profile</MenuItem>
          </Link>
          <Link to="#">
            <MenuItem>Edit</MenuItem>
          </Link>
          <MenuDivider />
          <Link onClick={() => logOut()} to="/login">
            <MenuItem>{state.auth ? "Log Out" : "Log In"}</MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </Flex>
  );
}
