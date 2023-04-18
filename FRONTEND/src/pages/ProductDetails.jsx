import {
  Badge,
  Box,
  Button,
  Divider,
  Grid,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { add_to_cart } from "../redux/cart/actions";
import { get_single_product } from "../redux/products/actions";

export default function ProductDetails() {
  const { products } = useSelector((store) => store.ProductReducer);

  if (products.length) {
    var {
      _id,
      api_featured_image,
      description,
      name,
      rating,
      brand,
      price,
      category,
      product_type,
      tag_list,
    } = products[0];
  }

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(get_single_product({ id }));
    }
  }, [dispatch, id]);

  const handleAdd = async (_id) => {
    dispatch(
      add_to_cart({
        quantity: 1,
        productId: _id,
      })
    );
  };

  return (
    <Box>
      <Grid
        gridTemplateColumns={{
          base: "repeat(1,1fr)",
          sm: "repeat(1,1fr)",
          md: "repeat(1,1fr)",
          lg: "repeat(2,1fr)",
        }}
      >
        <Image
          src={api_featured_image}
          w="100%"
          p="20px"
          style={{ aspectRatio: "1/1" }}
        />
        <Stack gap="10px" p="20px">
          <HStack justify={"space-between"}>
            <Heading textAlign={"left"} fontFamily="inherit">
              {name}
            </Heading>
            <Badge fontSize={"20px"} colorScheme="yellow">
              ★ {rating || 3.5}
            </Badge>
          </HStack>
          <Text>by {brand?.toUpperCase()}</Text>
          <Divider />
          <Text fontWeight={"bold"}>
            ✦ Earn 550 reward points when purchasing this product as a rewards
            member*
          </Text>
          <Heading size={"lg"}>$ {price}</Heading>
          <Text>category : {category}</Text>
          <Text>type : {product_type}</Text>
          <Text>tags : {tag_list}</Text>
          <Button onClick={() => handleAdd(_id)}>Add to Cart</Button>
          <Divider />
          <Text>DESCRIPTION</Text>
          <Text>
            {description ||
              "all natural ingredients that applies like a soft cream but finishes like a silky powder. Antioxidant-rich botanicals help moisturize the skin, while natural pigments provide long-lasting buildable color for a healthy, radiant glow. Made with natural and organic ingredients"}
          </Text>
        </Stack>
      </Grid>
    </Box>
  );
}
