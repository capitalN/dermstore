import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  // Link,
  Button,
  Center,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Divider,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { AllContext } from "../Context/AllContextProvider";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Loading from "../Components/Loading";

let fetchLogin = (input) => {
  return axios({
    method: "post",
    url: "https://reqres.in/api/login",
    data: input,
  });
};

export default function SignIn() {
  let { state, logIn } = useContext(AllContext);
  let [input, setInput] = useState({ email: "", password: "" });
  let [btnLoad, setBtnLoad] = useState(false);
  let navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (state.auth) {
      navigate("/profile");
    }
  }, []);

  let handleAuth = (token) => {
    logIn(token);
    toast({
      title: "Login Successfull",
      position: "top",
      isClosable: true,
    });
    navigate("/profile");
  };

  let setLogin = async () => {
    setBtnLoad(true);
    await fetchLogin(input)
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
    setLogin();
    setInput({ email: "", password: "" });
  };

  let onChange = (e) => {
    let { name, value, type } = e.target;
    setInput({ ...input, [name]: value });
  };

  return (
    <Flex
      flexDirection="column"
      justify="center"
      align="center"
      h="100vh"
      w="100vw"
      bg="white"
    >
      <Stack w="xs" padding="5" boxShadow="xl" p="6" rounded="md" bg="white">
        <Heading>Login</Heading>
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
          isRequired
          isInvalid={input.password ? false : true}
        />
        <Button
          colorScheme="blue"
          onClick={onSubmit}
          isLoading={btnLoad ? true : false}
        >
          LOGIN
        </Button>
        <Divider />

        <Text>
          dont have an account?
          <Link
            to="/signup"
            style={{
              textDecoration: "underline",
              color: "blue",
              padding: "10px",
            }}
          >
            SIGN-UP
          </Link>
        </Text>
      </Stack>
    </Flex>
  );
}
