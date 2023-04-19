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
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ButtonStyle } from "../utils/styles";

export default function UserUpdate({ user }) {
  let { search } = window.location;
  const { isOpen, onOpen, onClose } = useDisclosure();

  let dispatch = useDispatch();

  const [formData, setFormData] = useState();

  function handleInput(e) {
    let { name, value } = e.target;
  }

  let { username, email, avatar } = user;

  function handleSubmit() {}
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
                <Input value={username} type="name" required />
                <p>email</p>
                <Input name="email" value={email} type="email" required />
                <p>avatar</p>
                <Input name="avatar" value={avatar} type="url" required />
                <p>password</p>
                <Input name="password" type="password" required />
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
