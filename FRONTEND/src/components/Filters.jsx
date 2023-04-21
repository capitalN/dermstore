import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Heading,
  Text,
  Divider,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { ButtonStyle } from "../utils/styles";

export default function Filters() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  let { search } = window.location;
  const [searchParams, setSearchParams] = useSearchParams(search);
  const curr = Object.fromEntries([...searchParams]);
  let { page = 1, sort, order, brand, tag_list, min = 0, max = 80 } = curr;

  let handleFilter = (e) => {
    let { name, value } = e.target;
    if (name === "sort") {
      let [sort, order] = value.split(",");
      setSearchParams({ ...curr, sort, order, page: 1 });
    } else {
      setSearchParams({ ...curr, [name]: value, page: 1 });
    }
  };

  function handleRange(e) {
    let [min, max] = e;
    setSearchParams({ ...curr, min, max });
  }

  return (
    <>
      <Button ref={btnRef} onClick={onOpen} {...ButtonStyle}>
        Filters
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <Heading>Filters</Heading>
            <br />
            <form onChange={(e) => handleFilter(e)}>
              <RadioGroup name="sort" value={`${sort},${order}`}>
                <Stack>
                  <HStack justify={"space-between"}>
                    <Text fontWeight={"bold"}>SORT</Text>
                    <Radio value=",">Reset</Radio>
                  </HStack>

                  {SORT.map(({ value, placeholder }) => (
                    <Radio value={value} key={value}>
                      {placeholder}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
              <Divider />
              <br />
              <RadioGroup name="tag_list" value={tag_list}>
                <Stack>
                  <HStack justify={"space-between"}>
                    <Text fontWeight={"bold"}>TAG</Text>
                    <Radio value="">Reset</Radio>
                  </HStack>
                  {TAG.map((tag) => (
                    <Radio value={tag} key={tag}>
                      {tag}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
              <Divider />
              <br />

              {/* <RadioGroup name="brand" value={brand}>
                <Stack>
                  <HStack justify={"space-between"}>
                    <Text fontWeight={"bold"}>BRAND</Text>
                    <Radio value="">Reset</Radio>
                  </HStack>

                  {BRDAND.map((brand) => (
                    <Radio value={brand} key={brand}>
                      {brand}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup> */}
            </form>
            <Box>
              <Text fontWeight={"bold"}>PRICE</Text>
              <RangeSlider
                defaultValue={[min, max]}
                min={0}
                max={80}
                step={10}
                onChangeStart={(e) => handleRange(e)}
                onChangeEnd={(e) => handleRange(e)}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
              <HStack justify={"space-between"}>
                <Text>$ {min}</Text>
                <Text>$ {max}</Text>
              </HStack>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export const SORT = [
  { value: "name,asc", placeholder: "A to Z [Name]" },
  { value: "name,desc", placeholder: "Z to A [Name]" },
  { value: "price,asc", placeholder: "Low to High [Price]" },
  { value: "price,desc", placeholder: "High to Low [Price]" },
];

export const BRDAND = [
  "almay",
  "anna sui",
  "annabelle",
  "benefit",
  "cargo cosmetics",
  "clinique",
  "covergirl",
  "dior",
  "marcelle",
  "marienatie",
  "maybelline",
];

export const TAG = [
  "Natural",
  "Vegan",
  "Gluten Free",
  "Fair Trade",
  "Sugar Free",
  "Non-GMO",
  "Dairy Free",
  "Canadian",
];
