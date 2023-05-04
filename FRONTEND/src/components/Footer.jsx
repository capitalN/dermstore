import React from "react";
import {
  Box,
  Button,
  Center,
  Grid,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ButtonStyle } from "../utils/styles";

export default function Footer() {
  return (
    <Stack>
      <Image m="30px 10px" borderRadius={"10px"} src="https://static.thcdn.com/images/medium/webp/widgets/208-us/01/Dermstore_Referral_BAU_Jan__-_Landing_Page_-_New_Page_%281%29-024701.png"/>
      <Center as={"footer"} bgColor="gray.700" color={"white"}>
        <Grid
          gridTemplateColumns={{
            base: "repeat(1,1fr)",
            sm: "repeat(2,1fr)",
            md: "repeat(2,1fr)",
            lg: "repeat(4,1fr)",
            xl: "repeat(4,1fr)",
          }}
          gap="30px"
          p={"40px"}
        >
          <Stack>
            <Heading fontFamily="inherit" size="xl">
              DermStore
            </Heading>
            <Text>www.dermstore.com</Text>
          </Stack>
          {LINKS.map((el) => (
            <Stack key={el} w="200px">
              <LinkComp el={el} />
            </Stack>
          ))}
          <Stack gap="20px">
            <Text fontWeight={"bold"}>JOIN OUR NEWSLETTER</Text>
            <Input type={"email"} />
            <Button {...ButtonStyle} color="white">
              SUBSCRIBE
            </Button>
            <br />
            <Text fontWeight={"bold"}>FOLLOW US ON</Text>
            <HStack justify={"space-between"}>
              <Link to="#">INSTAGRAM</Link>
              <Link to="#">FACEBOOK</Link>
              <Link to="#">TWITTER</Link>
            </HStack>
          </Stack>
        </Grid>
      </Center>
    </Stack>
  );
}

export const LinkComp = ({ el }) => {
  return (
    <>
      {el.map((link) => (
        <Link to="#" key={link}>
          {link}
        </Link>
      ))}
    </>
  );
};

export const LINKS = [
  [
    "About us",
    "Shop the Look",
    "Blogs",
    "Contact us",
    "Terms of Service",
    "Refund policy",
  ],
  [
    "Terms of Service",
    "Privacy Policy",
    "Shipping & Returns",
    "Cancellation policy",
    "Refund policy",
  ],
];
