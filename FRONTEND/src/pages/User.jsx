import React from "react";
import {
  Box,
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

export default function User() {
  let { user } = useSelector((store) => store.UserReducer);
  let dispatch = useDispatch();

  let { email, username } = user;

  useEffect(() => {
    dispatch(get_user());
  }, []);

  return (
    <Center h="100vh">
      <Stack>
        <Image
          src=""
          alt={username}
          style={{ aspectRatio: "1/1" }}
          border="1px solid"
          borderRadius={"full"}
        />
        <Heading>{username}</Heading>
        <Text>{email}</Text>
        <UserUpdate user={user} />
      </Stack>
    </Center>
  );
}
