import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

function Loading() {
  return (
    <div>
      <Stack>
        <Skeleton height="40px" borderRadius="10px" m="3px 5px" />
        <Skeleton height="40px" borderRadius="10px" m="3px 5px" />
        <Skeleton height="40px" borderRadius="10px" m="3px 5px" />
        <Skeleton height="40px" borderRadius="10px" m="3px 5px" />
        <Skeleton height="40px" borderRadius="10px" m="3px 5px" />
        <Skeleton height="40px" borderRadius="10px" m="3px 5px" />
      </Stack>
    </div>
  );
}

export default Loading;
