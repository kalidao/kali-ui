import React from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { Tooltip } from "@chakra-ui/react";

function InfoTip({ label, ...props }) {
  return (
    <Tooltip
      bg={"yellow.200"}
      color={"black"}
      fontSize={"xs"}
      hasArrow
      label={label}
      {...props}
    >
      <span>
        <BsQuestionCircle fontSize={"80%"} color="#fbb341" />
      </span>
    </Tooltip>
  )
}

export default InfoTip;
