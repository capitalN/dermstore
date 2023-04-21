import React, { useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Box,
  Heading,
  HStack,
  Text,
  Stack,
  Show,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  PopoverArrow,
  DrawerCloseButton,
  Grid,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { RiAccountCircleLine, RiShoppingCartLine } from "react-icons/ri";

export default function Navbar() {
  return (
    <Box
      zIndex={1000}
      p="10px"
      bgColor={"gray.700"}
      color="white"
      position="sticky"
      top="0"
    >
      <Show below="lg">
        <Grid gridTemplateColumns={"repeat(3, 1fr)"} alignItems={"center"}>
          <NavDrawer />

          <Heading as={Link} to="/" fontFamily="inherit" justifySelf={"center"}>
            DermStore
          </Heading>
          <HStack justifySelf={"right"} gap="10px">
            <Link to="/user">
              <RiAccountCircleLine size={"30"} />
            </Link>
            <Link to="/cart">
              <RiShoppingCartLine size={"30"} />
            </Link>
          </HStack>
        </Grid>
      </Show>

      <Show above="lg">
        <Grid gridTemplateColumns={"repeat(3, 1fr)"} alignItems={"center"}>
          <Box>
            <Heading as={Link} to="/" fontFamily="inherit">
              DermStore
            </Heading>
          </Box>
          <HStack justify={"space-evenly"} gap="20px" justifySelf={"center"}>
            {LINKS.map((main) => (
              <div key={main.type}>
                <DropDown main={main} />
              </div>
            ))}
            <Link to="/products">SHOP ALL</Link>
          </HStack>

          <HStack justifySelf={"right"} gap="10px">
            <Link to="/user">
              <RiAccountCircleLine size={"30"} />
            </Link>
            <Link to="/cart">
              <RiShoppingCartLine size={"30"} />
            </Link>
          </HStack>
        </Grid>
      </Show>
    </Box>
  );
}

const DropDown = ({ main, onClose }) => {
  return (
    <>
      <Popover key={main.type}>
        <PopoverTrigger>
          <button>{main.type.toUpperCase()}</button>
        </PopoverTrigger>
        <PopoverContent w="auto">
          <PopoverArrow />
          <Stack justify={"space-between"} p="20px" color={"black"}>
            <Stack w="140px">
              {main.category &&
                main.category.map((category) => (
                  <Text
                    as={Link}
                    to={`/products?product_type=${main.type}&category=${category}`}
                    key={category}
                    _hover={{ fontWeight: "bold" }}
                    target="_self"
                    onClick={onClose}
                  >
                    {category}
                  </Text>
                ))}
            </Stack>
          </Stack>
        </PopoverContent>
      </Popover>
    </>
  );
};

export function NavDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <div>
      <>
        <Heading ref={btnRef} colorScheme="teal" onClick={onOpen} w="50px">
          =
        </Heading>
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <Heading as={Link} to="" fontFamily="inherit">
                DermStore
              </Heading>
              <br />
              <br />
              <Stack justify={"space-evenly"} gap="20px">
                {LINKS.map((main) => (
                  <div key={main.type}>
                    <DropDown main={main} onClose={onClose} />
                  </div>
                ))}
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    </div>
  );
}

const LINKS = [
  {
    type: "blush",
    category: ["powder", "cream"],
    tag: ["Natural", "Vegan", "Gluten Free", "Non-GMO", "Canadian"],
  },
  {
    type: "bronzer",
    category: ["powder"],
    tag: [
      "purpicks",
      "EWG Verified",
      "Vegan",
      "Gluten Free",
      "Natural",
      "Canadian",
    ],
  },
  {
    type: "eyeliner",
    category: ["liquid", "pencil", "gel", "cream"],
    tag: [
      "Natural",
      "Organic",
      "purpicks",
      "CertClean",
      "Vegan",
      "Gluten Free",
    ],
  },
  {
    type: "lipstick",
    category: ["lipstick"],
    tag: [
      "cruelty free",
      "Chemical Free",
      "Organic",
      "purpicks",
      "CertClean",
      "Vegan",
      "Gluten Free",
    ],
  },
];
