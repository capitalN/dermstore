import React, { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { AllContext } from "../Context/AllContextProvider";
import ProductCard from "../Components/ProductCard";
import {
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Stack,
} from "@chakra-ui/react";
import Loading from "../Components/Loading";
import FilterDrower from "../Components/FilterDrower";

let getData = ({ categeory, subcategeory, min = 400, max = 500 }) => {
  return axios({
    method: "get",
    baseURL: `https://makeup-api.herokuapp.com/api/v1/products.json?${categeory}=${subcategeory}`,
    params: {
      price_greater_than: min / 80,
      price_less_than: max / 80,
    },
  });
};

export default function Products() {
  let { state } = useContext(AllContext);
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(true);

  let fetchData = async () => {
    await getData(state)
      .then((res) => setData(res.data))
      .catch();
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // console.log(data);
  }, [state]);

  if (loading) return <Loading />;

  return (
    <Container as={Stack} maxW={"6xl"} mt="20">
      <Image src="https://images-static.nykaa.com/uploads/6dd86f98-19ac-4e60-8aae-61849054d13a.jpg?tr=w-1200,cm-pad_resize" />
      <Flex position="fixed" zIndex="15" right="10" bottom="10">
        <FilterDrower />
      </Flex>
      <Grid templateColumns="repeat(5, 1fr)" gap={4} p="10">
        {data.map((el) => (
          <ProductCard
            key={el.id}
            id={el.id}
            name={el.name}
            brand={el.brand}
            img={el.image_link}
            price={el.price * 80}
            categeory={el.categeory}
            type={el.product_type}
            rating={el.rating}
          />
        ))}
      </Grid>
    </Container>
  );
}
