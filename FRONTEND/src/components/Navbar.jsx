import React from "react";
import {
  Box,
  Grid,
  Heading,
  Hide,
  HStack,
  Input,
  Show,
  Stack,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <Box>
      <Grid
        gridTemplateColumns={"repeat(3,1fr)"}
        alignItems="center"
        p={"10px"}
      >
        <NavDrawer />
        <Heading as={Link} to="/" justifySelf="center">
          LOGO
        </Heading>
        <HStack justifySelf={"right"}>
          <Text as={Link} to="/user" boxSize={"25px"}>
            U
          </Text>
          <Text as={Link} to="/cart" boxSize={"25px"}>
            C
          </Text>
        </HStack>
      </Grid>
    </Box>
  );
}

function NavLinks() {
  return (
    <Stack justify={"space-around"} p="10px">
      {LINKS.map((link) => (
        <Text as={Link} key={link} to={`/products?product_type=${link}`}>
          {link}
        </Text>
      ))}
    </Stack>
  );
}

function NavDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen} w="20px">
        =
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <NavLinks />
        </DrawerContent>
      </Drawer>
    </>
  );
}

export let LINKS = [
  "blush",
  "bronzer",
  "eyeliner",
  "lipstick",
  "nail_polish",
  "eyebrow",
  "foundation",
  "mascara",
];
