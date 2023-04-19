import { useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Status() {
  let user = useSelector((store) => store.UserReducer);
  let cart = useSelector((store) => store.CartReducer);

  const toast = useToast();

  useEffect(() => {
    let { success, error, loading } = user;
    if (success) {
      MyToast(success, "success");
    } else if (error) {
      MyToast(error, "error");
    }
  }, [user]);

  useEffect(() => {
    let { success, error, loading } = cart;
    if (success) {
      MyToast(success, "success");
    } else if (error) {
      MyToast(error, "error");
    }
  }, [cart]);

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
