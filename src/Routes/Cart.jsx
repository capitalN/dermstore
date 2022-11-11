import React from "react";
import { useContext } from "react";
import { AllContext } from "../Context/AllContextProvider";
import {Navigate} from 'react-router-dom'
import { Box, Heading } from "@chakra-ui/react";

export default function Cart() {
  let { state } = useContext(AllContext);

  if (!state.auth) return <Navigate to="/" />;
  return (
    <Box>
      <Heading>Cart</Heading>
    </Box>
  );
}
