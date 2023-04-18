import {
  Flex,
  Grid,
  HStack,
  Image,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { delete_from_cart, get_cart, update_cart } from "../redux/cart/actions";

export default function Cart() {
  const { cart } = useSelector((store) => store.CartReducer);
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

  return (
    <div>
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
          <Stack key={_id} overflow="hidden" m="10px">
            <Stack as={Link} to={`/products/${productId._id}`}>
              <Image
                src={productId.api_featured_image}
                boxSize={"300px"}
                alignSelf="center"
              />
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
                <HStack gap={"10px"}>
                  <button disabled={quantity === 1} value={-1}>
                    -
                  </button>
                  <button disabled>{quantity}</button>
                  <button disabled={quantity === 10} value={1}>
                    +
                  </button>
                </HStack>
              </form>
              <button onClick={() => handleDelete(_id)}>remove</button>
            </HStack>
          </Stack>
        ))}
      </Grid>
    </div>
  );
}
