import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ButtonStyle } from "../utils/styles";

const initialData = {
  State: "",
  District: "",
  Country: "",
  Pincode: "",
  Name: "",
  myName: "",
  number: "",
  cvv: "",
  show: false,
};

export default function Dispatch() {
  const [inputData, setInputData] = useState(initialData);
  const [summery, setSummery] = useState(initialData);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTimeout(() => {
      setSummery({ ...inputData, show: true });
      alert("order confirmed");
      setInputData(initialData);
    }, 5000);
  };

  const handlePin = async () => {
    let { data } = await axios.get(
      `https://api.postalpincode.in/pincode/${inputData.Pincode}`
    );
    if (data[0].Status === "Error") {
    } else {
      let { Name, State, District, Country, Pincode } = data[0].PostOffice[0];
      setInputData({ State, District, Country, Pincode, Name });
    }
  };

  return (
    <Center minH="100vh" w="100%">
      <Flex
        flexWrap={"wrap"}
        justify={"space-evenly"}
        gap="40px"
        textAlign={"left"}
        border="2px solid"
        p="30px"
        bgColor={"gray.700"}
        color="white"
        borderRadius={"20px"}
      >
        <Stack w="330px">
          <Text fontWeight={"bold"}>1. ADDRESS</Text>
          <br />
          <p>Pin Code</p>
          <InputGroup>
            <Input
              onChange={handleChange}
              name="Pincode"
              value={inputData.Pincode}
              type="number"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handlePin} {...ButtonStyle}>
                CHECK
              </Button>
            </InputRightElement>
          </InputGroup>
          <p>Region</p>
          <Input
            onChange={handleChange}
            name="Name"
            value={inputData.District}
          />
          <p>State</p>
          <Input onChange={handleChange} name="State" value={inputData.State} />
          <p>Country</p>
          <Input
            onChange={handleChange}
            name="Country"
            value={inputData.Country}
          />
        </Stack>
        <Stack w="330px">
          <Text fontWeight={"bold"}>
            2. PAYMENT ( $ {localStorage.getItem("total")} )
          </Text>
          <br />
          <p>Card Holders Name</p>
          <Input
            onChange={handleChange}
            type="name"
            name="myName"
            value={inputData.myName}
          />
          <p>Card Number</p>
          <Input
            onChange={handleChange}
            name="number"
            type="password"
            value={inputData.number}
            maxLength="12"
            minLength="12"
          />
          <p>CVV</p>
          <Input
            onChange={handleChange}
            name="cvv"
            type="password"
            value={inputData.cvv}
            w="100px"
            maxLength="3"
            minLength="3"
          />
          <br />
          <Button {...ButtonStyle} onClick={handleSubmit}>
            SUBMIT
          </Button>
        </Stack>
        <Stack w="330px" gap="10px">
          <Text fontWeight={"bold"}> 3. ORDER SUMMERY</Text>
          {summery.show && (
            <>
              <Text>ORDER WILL BE DELEVERED</Text>

              <Text>
                <p>TO</p>Mr./ Mrs. {summery.myName}
              </Text>

              <Text>
                <p>ADDRESS</p>
                {summery.Name} , {summery.District}, {summery.State},{" "}
                {summery.Country}, - {summery.Pincode},
              </Text>

              <Text>
                <p>PAYMENT</p> $ {localStorage.getItem("total")} Paid by debit
                card
              </Text>
            </>
          )}
        </Stack>
      </Flex>
    </Center>
  );
}
