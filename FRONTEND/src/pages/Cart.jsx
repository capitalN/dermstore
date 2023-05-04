import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Grid,
  Heading,
  HStack,
  Image,
  Skeleton,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { delete_from_cart, get_cart, update_cart } from "../redux/cart/actions";
import { ButtonStyle } from "../utils/styles";

export default function Cart() {
  const { cart, loading } = useSelector((store) => store.CartReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_cart());
  }, [dispatch]);

  function handleUpdate(e, _id, quantity) {
    e.preventDefault();
    let { value } = e.target;
    dispatch(update_cart(_id, { quantity: quantity + +value }));
  }

  function handleDelete(_id) {
    dispatch(delete_from_cart(_id));
  }

  let total = cart.reduce(
    (acc, { productId, quantity }) => acc + +productId.price * quantity,
    0
  );

  if (!cart.length) {
    return (
      <Center h="100vh">
        <VStack>
          <Image
            boxSize={"300px"}
            src="https://media.istockphoto.com/id/861576608/vector/empty-shopping-bag-icon-online-business-vector-icon-template.jpg?s=612x612&w=0&k=20&c=I7MbHHcjhRH4Dy0NVpf4ZN4gn8FVDnwn99YdRW2x5k0="
          />
          <Heading fontFamily={"inherit"}>Cart is Empty!!!</Heading>
          <br />
          <Link to="/products">Click here to Continue Shopping</Link>
        </VStack>
      </Center>
    );
  }

  return (
    <Box minH={"100vh"}>
      <HStack p="10px" justify={"space-between"} w="full">
        <Heading size={"md"}>Cart Total: $ {total}</Heading>
        <Button as={Link} to="/dispatch" {...ButtonStyle}>
          Dispatch
        </Button>
      </HStack>
      <Grid
        gridTemplateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        alignItems="center"
        alignContent={"center"}
      >
        {cart.map(({ _id, productId, quantity }) => (
          <Stack
            key={_id}
            overflow="hidden"
            p={{ base: "10px", md: "20px" }}
            border="1px solid rgb(196, 196, 196)"
            borderRadius="20px"
            m="5px"
            _hover={{ bgColor: "gray.700", color: "white" }}
          >
            <Stack
              as={Link}
              to={`/products/${productId._id}`}
              target={"_blank"}
            >
              <Skeleton isLoaded={!loading}>
                <Image
                  src={productId.api_featured_image}
                  boxSize={{ base: "150px", md: "300px" }}
                  alignSelf="center"
                  objectFit="scale-down"
                  display="block"
                  ml={"auto"}
                  mr={"auto"}
                />
              </Skeleton>
              <Text fontWeight={"bold"} overflow="hidden" whiteSpace="nowrap">
                {productId.name}
              </Text>
              <HStack justify={"space-between"}>
                <Text fontWeight={"bold"}>
                  {productId.brand || "undefined"}
                </Text>
                <Text fontWeight={"bold"}>$ {productId.price || "0.0"}</Text>
              </HStack>
            </Stack>
            <HStack justify={"space-between"}>
              <form onClick={(e) => handleUpdate(e, _id, quantity)}>
                <ButtonGroup {...ButtonStyle}>
                  <Button isDisabled={quantity === 1} value={-1}>
                    -
                  </Button>
                  <Button value={0}>{quantity}</Button>
                  <Button isDisabled={quantity === 10} value={1}>
                    +
                  </Button>
                </ButtonGroup>
              </form>
              <button
                onClick={() => handleDelete(_id)}
                style={{ color: "red" }}
              >
                REMOVE
              </button>
            </HStack>
          </Stack>
        ))}
      </Grid>
    </Box>
  );
}
