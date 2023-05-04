import { Box, Button, Center, Heading, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { ButtonStyle } from "../utils/styles";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Box>
      <Center
        h={"100vh"}
        bgImage={
          "https://img.theculturetrip.com/1440x/smart/wp-content/uploads/2018/01/nuori_supremefamily.jpg"
        }
        bgSize="cover"
        bgRepeat={"no-repeat"}
        bgPosition="center"
      >
        <Stack
          borderRadius={"20px"}
          gap="10px"
          boxShadow="xl"
          bgColor={"gray.700"}
          color="white"
          p="40px"
          justify={"center"}
          boxSize="320px"
          textAlign={"center"}
        >
          <Heading fontFamily={"inherit"}>DermStore</Heading>
          <Text>www.dermstore.com</Text>
          <Button type="submit" {...ButtonStyle} as={Link} to="/products">
            SHOP NOW
          </Button>
        </Stack>
      </Center>
    </Box>
  );
}
