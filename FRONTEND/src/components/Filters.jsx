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
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Heading,
  Text,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import { useSearchParams } from "react-router-dom";

let { search } = window.location;
export default function Filters({ lastEl }) {
  const [searchParams, setSearchParams] = useSearchParams(search);
  const curr = Object.fromEntries([...searchParams]);
  let { page = 1 } = curr;

  const handlePage = (event) => {
    let value = event.target.value;
    setSearchParams({ ...curr, page: +page + +value });
  };

  return (
    <HStack justify={"space-between"} p="10px" gap="10px">
      {/* pagination */}
      <Box>
        <ButtonGroup colorScheme={"purple"} fontWeight="bolder">
          <Button onClick={handlePage} value={-1} isDisabled={page == 1}>
            {+page - 1}
          </Button>
          <Button>{page}</Button>
          <Button onClick={handlePage} value={+1} isDisabled={!lastEl}>
            {+page + 1}
          </Button>
        </ButtonGroup>
      </Box>

      {/* filter */}
      <Box justifySelf={"right"}>
        <Filter />
      </Box>
    </HStack>
  );
}

export function Search() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <button onClick={onOpen}>
        <Input placeholder="search by name, brand, category" />
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Input placeholder="search by name, brand, category" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export function Filter() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const [searchParams, setSearchParams] = useSearchParams(search);
  const curr = Object.fromEntries([...searchParams]);
  let { page = 1, sort, order, brand, tag_list } = curr;

  let handleFilter = (e) => {
    let { name, value } = e.target;

    if (name === "sort") {
      let [sort, order] = value.split(",");
      setSearchParams({ ...curr, sort, order, page: 1 });
    } else {
      setSearchParams({ ...curr, [name]: value, page: 1 });
    }
  };

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
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
              <RadioGroup name="brand" value={brand}>
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
              </RadioGroup>
            </form>
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
