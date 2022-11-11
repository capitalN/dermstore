import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Skeleton,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function ProductCard({
  name,
  brand,
  img = "https://i.ibb.co/VNnNFYS/1.png",
  price,
  categeory,
  type,
  rating,
}) {
  let [loading, setLoading] = useState(false);

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
          <Tooltip label="Add to Cart" placement="right">
            <Button
              colorScheme="pink"
              size="xs"
            >
              $ {price}
            </Button>
          </Tooltip>
        </Flex>
      </Skeleton>
    </>
  );
}
