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
  Flex,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useContext } from "react";
import { AllContext } from "../Context/AllContextProvider";
import RangeSlider from "./RangeSlider";

export default function FilterDrower() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  let { state } = useContext(AllContext);

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
            <Heading size="lg">SEARCH</Heading>
          </DrawerHeader>

          <DrawerBody>
            <Input placeholder="Search Products" disabled />
            <Divider mt="2" mb="2" />
            <Heading size="md" mb="1" mt="3">
              CATEGEORY
            </Heading>
            <CategeoryList />
            <Divider mt="2" mb="2" />
            <Heading size="md">PRICE RANGE</Heading>
            <RangeSlider />
            <Flex justify="space-between">
              <Text>min : ₹ {state.min}</Text>
              <Text>to</Text>
              <Text>max : ₹ {state.max}</Text>
            </Flex>
            <Divider mt="2" mb="2" />
          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export function CategeoryList() {
  return (
    <Flex justify="space-between">
      {NAV_ITEMS.map((categ) => (
        <Box key={categ.label}>
          <Heading size="sm">{categ.label.toUpperCase()}</Heading>
          <SubCategeory childrens={categ.children} parent={categ.label} />
        </Box>
      ))}
    </Flex>
  );
}

export let SubCategeory = ({ parent, childrens }) => {
  let { state, setParams } = useContext(AllContext);

  return (
    <>
      {childrens.map((subCat) => (
        <Box key={subCat.label}>
          <NavLink
            onClick={() =>
              setParams({
                categeory: parent,
                subcategeory: subCat.label,
                min: 0,
                max: 2000,
              })
            }
            to="/products"
          >
            {subCat.label}
          </NavLink>
        </Box>
      ))}
    </>
  );
};

const NAV_ITEMS = [
  {
    label: "brand",
    children: [
      { label: "maybelline", href: "#" },
      { label: "annabelle", href: "#" },
      { label: "colourpop", href: "#" },
      { label: "revlon", href: "#" },
      { label: "suncoat", href: "#" },
    ],
  },
  {
    label: "product_type",
    children: [
      { label: "blush", href: "#" },
      { label: "bronzer", href: "#" },
      { label: "eyebrow", href: "#" },
      { label: "eyeliner", href: "#" },
      { label: "eyeshadow", href: "#" },
    ],
  },
];

/*
{
  price_greater_than, 
  price_less_than, 
  rating_greater_than, 
  rating_less_than;
  https://makeup-api.herokuapp.com/api/v1/products.json?product_type=blush&price_less_than=10&price_greater_than=8
}
*/
