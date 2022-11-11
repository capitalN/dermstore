import React, { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { AllContext } from "../Context/AllContextProvider";
import ProductCard from "../Components/ProductCard";
import { Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import Loading from "../Components/Loading";
import FilterDrower from "../Components/FilterDrower";

let getData = ({ categeory, subcategeory, min=400, max=500 }) => {
  return axios({
    method: "get",
    baseURL: `https://makeup-api.herokuapp.com/api/v1/products.json?${categeory}=${subcategeory}`,
    params: {
      price_greater_than: min/80,
      price_less_than: max/80,
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
  }, [state]);

  if (loading) return <Loading />;

  return (
    <>
      <Heading size="3xl">Products</Heading>
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
    </>
  );
}
