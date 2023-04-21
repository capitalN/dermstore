import { useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Status() {
  let user = useSelector((store) => store.UserReducer);
  let cart = useSelector((store) => store.CartReducer);
  let products = useSelector((store) => store.ProductReducer);

  const toast = useToast();

  useEffect(() => {
    let { success, error } = user;
    if (success) {
      MyToast(success, "success");
    } else if (error) {
      MyToast(error, "error");
    }
  }, [user]);

  useEffect(() => {
    let { success, error } = cart;
    if (success) {
      MyToast(success, "success");
    } else if (error) {
      MyToast(error, "error");
    }
  }, [cart]);

  useEffect(() => {
    let { success, error } = products;
    if (success) {
      MyToast(success, "success");
    } else if (error) {
      MyToast(error, "error");
    }
  }, [products]);

  function MyToast(title, status) {
    toast({
      title,
      status,
      isClosable: true,
      duration: 3000,
    });
  }

  return <div></div>;
}
