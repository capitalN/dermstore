import { Button, Heading, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

export default function Loading() {
  return (
    <>
      <Stack>
        <Skeleton height="100vh" />
      </Stack>
    </>
  );
}
