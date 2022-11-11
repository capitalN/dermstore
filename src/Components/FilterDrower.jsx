import React from "react";
import { NavLink } from "react-router-dom";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
  Divider,
  Text,
  Heading,
  Box,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

export default function FilterDrower() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Button
        ref={btnRef}
        colorScheme="yellow"
        onClick={onOpen}
        borderRadius="full"
        border="10px solid teal"
        w="16"
        h="16"
      >
        <Search2Icon w="5" h="5" />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading size="md">Search</Heading>
          </DrawerHeader>

          <DrawerBody>
            <Input placeholder="Search Products" />
            <Divider mt="2" mb="2" />
            <FilterList />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export function FilterList() {
  return (
    <>
      {NAV_ITEMS.map((categ) => (
        <Box key={categ.label}>
          <Heading size="sm">{categ.label}</Heading>
          <SubCategeory childrens={categ.children} />
        </Box>
      ))}
    </>
  );
}

export let SubCategeory = ({ childrens }) => {
  return (
    <>
      {childrens.map((subCat) => (
        <Box key={subCat.subLabel}>
          <NavLink>{subCat.subLabel}</NavLink>
        </Box>
      ))}
    </>
  );
};

const NAV_ITEMS = [
  {
    label: "BRAND",
    children: [
      { label: "brand", subLabel: "maybelline", href: "#" },
      { label: "brand", subLabel: "annabelle", href: "#" },
      { label: "brand", subLabel: "colourpop", href: "#" },
      { label: "brand", subLabel: "revlon", href: "#" },
      { label: "brand", subLabel: "suncoat", href: "#" },
    ],
  },
  {
    label: "PRODUT TYPE",
    children: [
      { label: "product_type", subLabel: "blush", href: "#" },
      { label: "product_type", subLabel: "bronzer", href: "#" },
      { label: "product_type", subLabel: "eyebrow", href: "#" },
      { label: "product_type", subLabel: "eyeliner", href: "#" },
      { label: "product_type", subLabel: "eyeshadow", href: "#" },
    ],
  },
];
