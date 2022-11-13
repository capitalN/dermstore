import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
} from "@chakra-ui/react";
import React from "react";
import Carousel from "../Components/Carausel";
import FilterDrower from "../Components/FilterDrower";
import TopBrands from "../Components/TopBrands";

export default function Home() {
  return (
    <Box mt={16}>
      <Carousel />
      <Box p="10">
        <TopBrands/>
      </Box>
    </Box>
  );
}
