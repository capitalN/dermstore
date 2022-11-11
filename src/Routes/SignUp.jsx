import React, { useContext, useEffect, useState } from "react";
import { AllContext } from "../Context/AllContextProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";

let postData = (input) => {
  return axios({
    method: "post",
    url: "https://reqres.in/api/register",
    data: input,
  });
};

export default function SignUp() {
  let { state, logIn } = useContext(AllContext);
  let [input, setInput] = useState({ name: "", email: "", password: "" });
  let [btnLoad, setBtnLoad] = useState(false);
  let navigate = useNavigate();
  const toast = useToast();

  let handleAuth = (token) => {
    toast({
      title: "Account Created",
      position: "top",
      isClosable: true,
    });
    navigate("/profile");
  };

  let registerUser = async () => {
    setBtnLoad(true);
    await postData(input)
      .then((res) => handleAuth(res.data.token))
      .catch((err) =>
        toast({
          title: err.response.data.error,
          position: "top",
          isClosable: true,
        })
      );
    setBtnLoad(false);
  };

  let onSubmit = (e) => {
    e.preventDefault();
    registerUser();
    setInput({ name: "", email: "", password: "" });
  };

  let onChange = (e) => {
    let { name, value, type } = e.target;
    setInput({ ...input, [name]: value, token: Math.random() });
  };

  return (
    <Flex m="200" flexDirection="column" justify="center" align="center">
      <Stack w="xs" padding="5" boxShadow="xl" p="6" rounded="md" bg="white">
        <Heading>Sign Up</Heading>
        <Input
          placeholder="name"
          name="name"
          value={input.name}
          type="name"
          onChange={onChange}
          isRequired
          isInvalid={input.name ? false : true}
        />
        <Input
          placeholder="eve.holt@reqres.in"
          name="email"
          value={input.email}
          type="email"
          onChange={onChange}
          isRequired
          isInvalid={input.email ? false : true}
        />
        <Input
          placeholder="password"
          name="password"
          value={input.password}
          type="password"
          onChange={onChange}
          isInvalid={input.password ? false : true}
        />
        <Button
          colorScheme="green"
          onClick={onSubmit}
          isLoading={btnLoad ? true : false}
        >
          Sign Up
        </Button>
        <Text>
          already have an account?
          <Link
            to="/login"
            style={{
              textDecoration: "underline",
              color: "blue",
              padding: "10px",
            }}
          >
            LOGIN
          </Link>
        </Text>
      </Stack>
    </Flex>
  );
}
