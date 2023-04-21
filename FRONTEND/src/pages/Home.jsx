import { Box, Button, Center } from "@chakra-ui/react";
import axios from "axios";
import React from "react";

export default function Home() {
  return (
    <Box>
      <Center
        h={"100vh"}
        bgImage={
          "https://worldbranddesign.com/wp-content/uploads/2020/05/1Dermstore-world-brand-design.jpg"
        }
        bgSize="cover"
        bgRepeat={"no-repeat"}
        bgPosition="center"
      ></Center>
    </Box>
  );
}
