// react imports
import React, { useState } from "react";

// chakra imports
import {
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { user_register } from "../redux/user/actions";
import { ButtonStyle } from "../utils/styles";

const initialData = {
  username: "",
  email: "",
  password: "",
};

export default function Register() {
  const dispatch = useDispatch();

  const [inputData, setInputData] = useState(initialData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(user_register(inputData));
    // setInputData(initialData);
  };

  let { username, email, password } = inputData;

  return (
    <Center h="100vh">
      <form
        action=""
        onSubmit={(e) => handleSubmit(e)}
      >
        <Stack w="300px">
          <Heading>REGISTER</Heading>
          <br />
          <p>name</p>
          <Input
            onChange={handleChange}
            name="username"
            value={username}
            type="name"
            required
          />
          <p>email</p>
          <Input
            onChange={handleChange}
            name="email"
            value={email}
            type="email"
            required
          />
          <p>password</p>
          <Input
            onChange={handleChange}
            name="password"
            value={password}
            type="password"
            required
          />
          <br />
          <Button type="submit" {...ButtonStyle}>
            SIGN UP
          </Button>
          <br />
          <Text as={Link} to={"/login"} textAlign="center">
            already a user? click here to{" "}
            <span style={{ color: "blue" }}>Login</span>
          </Text>
        </Stack>
      </form>
    </Center>
  );
}
