// import { Box, Flex, Grid, Heading, Image } from "@chakra-ui/react";
// import React from "react";

// export default function TopBrands() {
//   return (
//     <Grid gridTemplateColumns="repeat(6,1fr)">
//       <Image
//         src="https://static.thcdn.com/images/small/webp/widgets/208-us/20/DS_Round_Nav_-_Untitled_Page_%287%29-052520.png"
//         alt="image"
//       />
//       <Image
//         src="https://static.thcdn.com/images/small/webp/widgets/208-us/32/DS_Round_Nav_-_Untitled_Page_%289%29-052632.png"
//         alt="image"
//       />
//       <Image
//         src="https://static.thcdn.com/images/small/webp/widgets/208-us/03/DS_Round_Nav_-_Untitled_Page_%2810%29-052703.png"
//         alt="image"
//       />
//       <Image
//         src="https://static.thcdn.com/images/small/webp/widgets/208-us/03/DS_Round_Nav_-_Untitled_Page_%2810%29-052703.png"
//         alt="image"
//       />
//       <Image
//         alt="image"
//         src="https://static.thcdn.com/images/small/webp/widgets/208-us/49/DS_Round_Nav_-_Untitled_Page_%2813%29-053649.png"
//       />
//       <Image
//         alt="image"
//         src="https://static.thcdn.com/images/small/webp/widgets/208-us/36/DS_Round_Nav_-_Untitled_Page_%2825%29-063536.png"
//       />
//     </Grid>
//   );
// }

import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Stack,
} from "@chakra-ui/react";
import React from "react";

export default function TopBrands() {
  return (
    <Container as={Stack} maxW={"6xl"}>
      <Image src="https://images-static.nykaa.com/uploads/6dd86f98-19ac-4e60-8aae-61849054d13a.jpg?tr=w-1200,cm-pad_resize" />
      <Heading p="5">SHOP BY</Heading>
      <Grid gridTemplateColumns="repeat(6,1fr)">
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
      </Grid>
      <Divider />
      <Image
        alt="img"
        src="https://images-static.nykaa.com/uploads/876c7ad2-abed-4f8f-87ff-490a10ecb52d.jpg?tr=w-1200,cm-pad_resize"
      />
    </Container>
  );
}

export let Cards = () => {
  return (
    <Image
      src="https://static.thcdn.com/images/small/webp/widgets/208-us/20/DS_Round_Nav_-_Untitled_Page_%287%29-052520.png"
      alt="image"
    />
  );
};

let SHOP_BY = [
  "https://static.thcdn.com/images/small/webp/widgets/208-us/36/DS_Round_Nav_-_Untitled_Page_%2825%29-063536.png",
  "https://static.thcdn.com/images/small/webp/widgets/208-us/49/DS_Round_Nav_-_Untitled_Page_%2813%29-053649.png",
  "https://static.thcdn.com/images/small/webp/widgets/208-us/03/DS_Round_Nav_-_Untitled_Page_%2810%29-052703.png",
  "https://static.thcdn.com/images/small/webp/widgets/208-us/03/DS_Round_Nav_-_Untitled_Page_%2810%29-052703.png",
  "https://static.thcdn.com/images/small/webp/widgets/208-us/20/DS_Round_Nav_-_Untitled_Page_%287%29-052520.png",
];
