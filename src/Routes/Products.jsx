import React, { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { AllContext } from "../Context/AllContextProvider";
import ProductCard from "../Components/ProductCard";
import { Grid } from "@chakra-ui/react";
import Loading from "../Components/Loading";

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
    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
      {data.map((el) => (
        <>
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
        </>
      ))}
    </Grid>
  );
}
