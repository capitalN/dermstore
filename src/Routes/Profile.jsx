import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AllContext } from "../Context/AllContextProvider";
import { Button, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";

export default function Profile() {
  let { logOut } = useContext(AllContext);

  return (
    <Flex m="200" flexDirection="column" justify="center" align="center">
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
          src="https://bit.ly/dan-abramov"
          alt="Dan Abramov"
        />
        <Text fontSize="xl">Dan Abramov</Text>
        <Text>danabramov@gmail.com</Text>
        <Button colorScheme="red" onClick={logOut}>
          LOGOUT
        </Button>
      </Stack>
    </Flex>
  );
}
