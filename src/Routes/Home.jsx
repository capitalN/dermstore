import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import Carousel from "../Components/Carausel";
import FilterDrower from "../Components/FilterDrower";

export default function Home() {
  return (
    <Box mt={16}>
      <Carousel/>
    </Box>
  );
}
