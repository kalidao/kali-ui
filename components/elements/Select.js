import React from "react";
import { Select as ChakraSelect } from "@chakra-ui/react";

function Select(props) {
  return (
    <ChakraSelect bg="kali.900" color="kali.800" {...props}>
      {props.children}
    </ChakraSelect>
  );
}

export default Select;
