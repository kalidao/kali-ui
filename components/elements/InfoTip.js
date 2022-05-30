import React from "react";
import { BsQuestionCircle } from "react-icons/bs";

// Add label
function InfoTip({ label, ...props }) {
  return (<span>
        <BsQuestionCircle fontSize={"80%"} color="#fbb341" />
      </span>)
}


