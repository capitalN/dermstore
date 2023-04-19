// react imports
import React, { useState } from "react";

// chakra imports
import { Button, Center, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { user_login } from "../redux/user/actions";
import { Link } from "react-router-dom";
import { ButtonStyle } from "../utils/styles";

const initialData = {
  email: "",
  password: "",
};

export default function Login() {
  const dispatch = useDispatch();
  const { token, loading, error } = useSelector((store) => store.UserReducer);
  const [inputData, setInputData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(user_login(inputData));
    // window.location.reload();
  };

  let { email, password } = inputData;

  return (
    <Center h="100vh">
      <form onSubmit={(e) => handleSubmit(e)}>
        <Stack w="300px">
          <Heading>LOGIN</Heading>
          <br />
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
          <Button type="submit" {...ButtonStyle}>LOGIN</Button>
          <br />
          <Text as={Link} to={"/register"} textAlign="center">
            new user? click here to{" "}
            <span style={{ color: "blue" }}>Register</span>
          </Text>
        </Stack>
      </form>
    </Center>
  );
}
