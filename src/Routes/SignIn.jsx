// import React from "react";
// import { useState } from "react";
// import axios from "axios";
// import { useContext } from "react";
// import { AllContext } from "../Context/AllContextProvider";
// import { Link, Navigate } from "react-router-dom";

// let fetchLogin = (input) => {
//   return axios({
//     method: "post",
//     url: "https://reqres.in/api/login",
//     data: input,
//   });
// };

// export default function SignIn() {
//   let { state, logIn, logOut } = useContext(AllContext);
//   let [input, setInput] = useState({ email: "", password: "" });

//   let setLogin = () => {
//     fetchLogin(input)
//       .then((res) => logIn(res.data.token))
//       .catch();
//   };

//   let onSubmit = (e) => {
//     e.preventDefault();
//     setLogin();
//   };

//   let onChange = (e) => {
//     let { name, value, type } = e.target;
//     setInput({ ...input, [name]: value });
//   };

//   if (state.auth) return <Navigate to="/profile" />;
//   return (
//     <form
//       onSubmit={onSubmit}
//       style={{
//         border: "2px solid",
//         width: "25%",
//         margin: "auto",
//         marginTop: "50px",
//         paddingBottom:"20px",
//         borderRadius:"10px"
//       }}
//     >
//       <h1>Log In</h1>
//       <input
//         type="email"
//         name="email"
//         placeholder="eve.holt@reqres.in"
//         onChange={onChange}
//         value={input.email}
//       />
//       <br />
//       <input
//         type="password"
//         name="password"
//         placeholder="cityslicka"
//         onChange={onChange}
//         value={input.password}
//       />
//       <br />
//       <button>Log In</button>
//       <br />
//       or
//       <br />
//       dont have account ?
//       <Link style={{ padding: "5px" }} to="/signup">
//         Sign Up
//       </Link>
//     </form>
//   );
// }

// chakra ui **************************

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
    <Flex mt="50" flexDirection="column" justify="center" align="center">
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
