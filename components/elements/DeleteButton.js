import { IconButton } from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import React from "react";

function DeleteButton(props) {
  return (
    <IconButton
      aria-label={props.label}
      isRound
      variant="ghost"
      _hover={{ bg: "kali.600" }}
      mt={8}
      ml={2}
      icon={<AiOutlineDelete />}
      onClick={props.clickHandler}
    />
  );
}

export default DeleteButton;
