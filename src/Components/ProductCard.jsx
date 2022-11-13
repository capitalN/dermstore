import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Skeleton,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AllContext } from "../Context/AllContextProvider";
/*
http://localhost:3004/cart
json-server --watch db.json --port 3004
*/

let PushToCart = (addCart) => {
  axios({
    method: "post",
    url: "http://localhost:3004/cart",
    data: addCart,
  });
};

export default function ProductCard({
  name,
  id,
  img,
  price,
  type,
  rating,
  qty = 1,
}) {
  let [loading, setLoading] = useState(false);
  let [addCart, setAddCart] = useState({});
  let { state } = useContext(AllContext);

  let handleAddCart = () => {
    setAddCart((prev) => ({
      ...prev,
      userId: id,
      name,
      image_link:img,
      price,
      type,
      qty,
    }));
    PushToCart(addCart)
  };

  useEffect(() => {
    if ({ name }) {
      setLoading(true);
    }
  }, []);

  return (
    <>
      <Skeleton isLoaded={loading}>
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
          <Flex justify="space-between">
            <Text>{type}</Text>

            <Badge p="1" colorScheme="green">
              ★ {rating || 3.5}
            </Badge>
          </Flex>
          <Tooltip label="Add to Cart" placement="top">
            <Button colorScheme="pink" size="sm" onClick={handleAddCart}>
              ₹ {Math.floor(price)}
            </Button>
          </Tooltip>
        </Flex>
      </Skeleton>
    </>
  );
}
