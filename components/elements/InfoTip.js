import React from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { Tooltip } from "@chakra-ui/react";

function InfoTip({ label, ...props }) {
  return (
    <Tooltip label={label} {...props}>
      <span>
        <BsQuestionCircle />
      </span>
    </Tooltip>
  );
}

export default InfoTip;
