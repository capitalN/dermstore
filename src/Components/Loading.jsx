import { Button, Heading, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

export default function Loading() {
  return (
    <>
      <Stack p="20">
        <Skeleton height="20vh" />
        <Skeleton height="20vh" />
        <Skeleton height="20vh" />
        <Skeleton height="20vh" />
      </Stack>
    </>
  );
}
