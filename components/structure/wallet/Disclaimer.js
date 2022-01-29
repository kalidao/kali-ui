import { Box } from "@chakra-ui/react";
import React from "react";

function Disclaimer(props) {
  return (
    <Box
      bg="blackAlpha.50"
      p={3}
      mr={3}
      ml={3}
      borderWidth="1px"
      borderRadius="2xl"
      {...props}
    >
      By continuing you agree to our Terms of Service and acknowledge that you
      have read and understand our Disclaimer.
    </Box>
  );
}

export default Disclaimer;
