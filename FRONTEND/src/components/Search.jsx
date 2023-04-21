import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { get_searched_products } from "../redux/products/actions";
import { ButtonStyle } from "../utils/styles";

export default function Search() {
  let { search } = window.location;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [searchParams, setSearchParams] = useSearchParams(search);
  const curr = Object.fromEntries([...searchParams]);
  let { q } = curr;

  let { searched } = useSelector((store) => store.ProductReducer);
  let dispatch = useDispatch();

  function handleInput(e) {
    let { value } = e.target;
    myEfficientFn(value);
  }

  const myEfficientFn = debounce(function (value) {
    dispatch(get_searched_products({ q: value }));
  }, 1000);

  function debounce(func, wait) {
    let timeout;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, arguments), wait);
    };
  }

  function handleSubmit() {}

  return (
    <>
      <Button onClick={onOpen} {...ButtonStyle}>
        Search
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Input
              placeholder="search by name, brand, category"
              onInput={(e) => handleInput(e)}
            />
            <br />
            <Stack>
              {searched.map(({ _id, name, brand, category }) => (
                <Link to={`/products/${_id}`} key={_id} target="_blank">
                  {name} - {brand} - {category}
                  <Divider />
                </Link>
              ))}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
