import {
  Grid,
  Stack,
  Text,
  Skeleton,
  Image,
  HStack,
  Box,
  Badge,
  Container,
  Center,
  Heading,
} from "@chakra-ui/react";
import { Link, useSearchParams } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { get_products } from "../redux/products/actions";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import Search from "../components/Search";

export default function Products() {
  let { search } = window.location;
  let [searchParams, setSearchParams] = useSearchParams(search);

  const dispatch = useDispatch();
  useEffect(() => {
    let params = Object.fromEntries([...searchParams]);
    dispatch(get_products(params));
  }, [dispatch, searchParams]);

  const { products, loading } = useSelector((store) => store.ProductReducer);

  return (
    <Box minH={"100vh"}>
      <Grid gridTemplateColumns={"repeat(3, 1fr)"} p="10px" gap="10px">
        <Box justifySelf={"left"}>
          <Search />
        </Box>

        <Box justifySelf={"center"}>
          <Pagination lastEl={products[11]} />
        </Box>

        <Box justifySelf={"right"}>
          <Filters />
        </Box>
      </Grid>
      {products.length ? (
        <Grid
          gridTemplateColumns={{
            base: "repeat(2, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
          alignItems="center"
          alignContent={"center"}
        >
          {products.map(
            ({
              _id,
              api_featured_image,
              brand = "undefined",
              name = "undefined",
              price = 0.0,
              rating = 2.5,
            }) => (
              <Stack
                key={_id}
                overflow="hidden"
                as={Link}
                to={`${_id}`}
                p={{ base: "10px", md: "20px" }}
                border="1px solid rgb(196, 196, 196)"
                target={"_blank"}
              >
                <Skeleton isLoaded={!loading}>
                  <Image
                    src={api_featured_image}
                    boxSize={{ base: "150px", md: "300px" }}
                    alignSelf="center"
                    objectFit="scale-down"
                    ml={"auto"}
                    mr={"auto"}
                  />
                </Skeleton>
                <Stack>
                  <Text
                    fontWeight={"bold"}
                    overflow="hidden"
                    whiteSpace="nowrap"
                  >
                    {name}
                  </Text>
                  <HStack justify={"space-between"}>
                    <Text fontWeight={"bold"}>{brand || "undefined"}</Text>
                    <Text fontWeight={"bold"}>$ {price || "0.0"}</Text>
                  </HStack>
                </Stack>
              </Stack>
            )
          )}
        </Grid>
      ) : (
        <Center>
          <Skeleton
            isLoaded={!loading}
            bgImage="https://trolleymate.co.uk/assets/img/error_404.jpeg"
            h="80vh"
            w="100%"
            bgRepeat={"no-repeat"}
            bgSize="contain"
            bgPosition={"center"}
          ></Skeleton>
        </Center>
      )}
    </Box>
  );
}
