import { Box } from "@chakra-ui/react";
import React from "react";
import TopBrands from "../Components/TopBrands";

export default function More() {
  return (
    <Box justify="center" align="center" h="100vh" w="100vw" bg="white" mt={20}>
      <TopBrands />
    </Box>
  );
}
