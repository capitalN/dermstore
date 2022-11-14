import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AllContext } from "../Context/AllContextProvider";
import { Button, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";

export default function Profile() {
  let { logOut } = useContext(AllContext);

  return (
    <Flex
      flexDirection="column"
      justify="center"
      align="center"
      h="100vh"
      w="100vw"
      bg="white"
    >
      <Stack
        w="xs"
        padding="5"
        boxShadow="xl"
        p="6"
        rounded="md"
        bg="white"
        align="center"
      >
        <Heading>Profile</Heading>
        <Image
          borderRadius="full"
          boxSize="150px"
          src="https://ca.slack-edge.com/T044M5T44JV-U0462RS10FK-010c46713479-512"
          alt="nikhil"
        />
        <Text fontSize="xl">Nikhil</Text>
        <Text>eve.holt@reqres.in</Text>
        <Button colorScheme="red" onClick={logOut}>
          LOGOUT
        </Button>
      </Stack>
    </Flex>
  );
}
