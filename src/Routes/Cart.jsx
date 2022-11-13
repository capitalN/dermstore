import React from "react";
import { useContext } from "react";
import { AllContext } from "../Context/AllContextProvider";
import { Navigate } from "react-router-dom";
import { Box, Heading } from "@chakra-ui/react";

export default function Cart() {
  let { state } = useContext(AllContext);

  if (!state.auth) return <Navigate to="/" />;
  return (
    <Box justify="center" align="center" h="100vh" w="100vw" bg="white">
      
    </Box>
  );
}

// json-server --watch db.json --port 3004
