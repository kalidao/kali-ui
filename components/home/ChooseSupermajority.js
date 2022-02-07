import React, { useState, useEffect } from "react";
import {
  VStack,
  HStack,
  Slider,
  SliderMark,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  Tooltip,
} from "@chakra-ui/react";
import InfoTip from "../elements/InfoTip";

function ChooseSupermajority({ details, setDetails }) {
  const [supermajority, setSupermajority] = useState(
    parseInt(details["governance"]["supermajority"])
  );
  const [showSupermajorityTooltip, setShowSupermajorityTooltip] =
    useState(false);

  useEffect(() => {
    details["governance"]["supermajority"] = supermajority;
    setDetails(details);
  }, [supermajority]);

  return (
    <VStack w={"100%"} spacing="8" align="flex-start">
      <HStack pt={"4"}>
        <label>Supermajority</label>
        <InfoTip
          label={
            "Minimum % of member approvals required for proposals to pass, e.g., a 75% supermajority needs at least 75% of DAO tokens in favor of a proposal for the proposal to pass"
          }
        />
      </HStack>
      <Slider
        id="slider"
        min={51}
        max={100}
        aria-label="supermajority slider"
        defaultValue={details["governance"]["supermajority"]}
        colorScheme="red"
        onChangeEnd={(v) => setSupermajority(v)}
        onMouseEnter={() => setShowSupermajorityTooltip(true)}
        onMouseLeave={() => setShowSupermajorityTooltip(false)}
      >
        <SliderMark value={50} mt="1" ml="2" fontSize="xs">
          50%
        </SliderMark>
        <SliderMark value={75} mt="1" ml="-2.5" fontSize="xs">
          75%
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <Tooltip
          hasArrow
          bg="teal.500"
          color="white"
          placement="top"
          isOpen={showSupermajorityTooltip}
          label={`${supermajority}%`}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
    </VStack>
  );
}

export default ChooseSupermajority;
