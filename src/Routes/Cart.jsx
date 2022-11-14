import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AllContext } from "../Context/AllContextProvider";
import { Navigate } from "react-router-dom";
import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Skeleton,
  Spacer,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import axios from "axios";
import ProductCard from "../Components/ProductCard";

let getCartData = () => {
  return axios({
    method: "get",
    baseURL: `http://localhost:3004/cart`,
  });
};

export default function Cart() {
  let { state } = useContext(AllContext);
  let [data, setData] = useState([]);

  let fetchData = async () => {
    await getCartData(state)
      .then((res) => setData(res.data))
      .catch();
  };

  useEffect(() => {
    fetchData();
  }, [state]);

  if (!state.auth) return <Navigate to="/" />;
  return (
    <Box justify="center" align="center" h="100vh" w="100vw" bg="white" mt="16">
      <Grid templateColumns="repeat(5, 1fr)" gap={4} p="10">
        {data.map((el) => (
          <CartCard
            key={el.id}
            id={el.id}
            name={el.name}
            img={el.image_link}
            price={el.price}
            qty={el.qty}
          />
        ))}
      </Grid>
    </Box>
  );
}

let deleteItem = (id) => {
  return axios({
    method: "delete",
    baseURL: `http://localhost:3004/cart/${id}`,
  });
};

// json-server --watch db.json --port 3004
export function CartCard({
  name = "new lip",
  img = "https://d3t32hsnjxo7q6.cloudfront.net/i/6b7a0f4f93839573bf046e149d4927df_ra,w158,h184_pa,w158,h184.png",
  price = 559,
  qty = 1,
  id,
}) {

  useEffect(() => {}, []);

  return (
    <>
      <Flex
        h="330"
        direction="column"
        boxShadow="xl"
        bg="white"
        p="2"
        justify="space-between"
      >
        <Image
          p="1"
          rounded="md"
          bg="gray.100"
          src={img}
          alt={name}
          w="100"
          h="200"
          objectFit={"cover"}
        />
        <Heading size="xs" align="left">
          {name}
        </Heading>
        <Flex justify="center" gap="1">
          <Button colorScheme="blue" size="sm">
            -
          </Button>
          <Button colorScheme="gray" size="sm">
            {qty}
          </Button>
          <Button colorScheme="blue" size="sm">
            +
          </Button>
        </Flex>

        <Flex justify="center" gap="1">
          <Button colorScheme="red" size="sm" onClick={() => deleteItem(id)}>
            Delete
          </Button>
          <Tooltip label="Buy" placement="right">
            <Button colorScheme="green" size="sm">
              ₹ {Math.floor(price)}
            </Button>
          </Tooltip>
        </Flex>
      </Flex>
    </>
  );
}
