import React from "react";
import {
  Box,
  Button,
  Center,
  Grid,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { get_user } from "../redux/user/actions";
import UserUpdate from "../components/UserUpdate";
import { ButtonStyle } from "../utils/styles";

export default function User() {
  let { user } = useSelector((store) => store.UserReducer);
  let dispatch = useDispatch();

  let { email, username, avatar } = user;

  useEffect(() => {
    dispatch(get_user());
  }, []);

  function handleLogut() {
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <Center h="100vh">
      <Stack
        border={"1px solid"}
        p="40px"
        w="350px"
        bgColor="gray.700"
        color="white"
        borderRadius={"20px"}
      >
        <Image
          src={avatar}
          alt={username}
          style={{ aspectRatio: "1/1" }}
          border="1px solid"
          borderRadius={"full"}
          overflow="hidden"
        />
        <Heading>{username}</Heading>
        <Text>{email}</Text>
        <UserUpdate user={user} />
        <Button {...ButtonStyle} color="red" onClick={handleLogut}>
          LOG OUT
        </Button>
      </Stack>
    </Center>
  );
}
