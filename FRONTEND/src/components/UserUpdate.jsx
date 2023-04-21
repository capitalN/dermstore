import {
  Button,
  Heading,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { update_user } from "../redux/user/actions";
import { ButtonStyle } from "../utils/styles";

export default function UserUpdate({ user }) {
  let { search } = window.location;
  const { isOpen, onOpen, onClose } = useDisclosure();

  let dispatch = useDispatch();
  useEffect(() => {
    // dispatch()
  }, []);

  let { username, email, avatar } = user;
  const [formData, setFormData] = useState(user);

  function handleInput(e) {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(update_user(formData));
  }

  return (
    <>
      <Button onClick={onOpen} {...ButtonStyle}>
        Update Info
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <form
              onInput={(e) => handleInput(e)}
              onSubmit={(e) => handleSubmit(e)}
            >
              <Stack>
                <Heading>Update</Heading>
                <br />
                <p>name</p>
                <Input
                  value={formData.username}
                  placeholder={username}
                  name="username"
                  type="text"
                />
                <p>avatar</p>
                <Input
                  name="avatar"
                  placeholder={avatar}
                  value={formData.avatar}
                  type="url"
                />
                <br />
                <Button type="submit" {...ButtonStyle}>
                  Update
                </Button>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
