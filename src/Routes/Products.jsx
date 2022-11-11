import React, { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { AllContext } from "../Context/AllContextProvider";
import ProductCard from "../Components/ProductCard";
import { Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import Loading from "../Components/Loading";
import FilterDrower from "../Components/FilterDrower";

// { label="brand", subLabel="maybelline" }
// { label, subLabel}

let getData = ({ label = "brand", subLabel = "maybelline" }) => {
  return axios({
    method: "get",
    baseURL: `https://makeup-api.herokuapp.com/api/v1/products.json?${label}=${subLabel}`,
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
            name={el.name}
            brand={el.brand}
            img={el.image_link}
            price={el.price}
            categeory={el.categeory}
            type={el.product_type}
            rating={el.rating}
          />
        ))}
      </Grid>
    </>
  );
}
