import React, { useState, useEffect } from "react";
import {
  Button,
  VStack,
  HStack,
  Slider,
  SliderMark,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  Spacer,
  Tooltip,
} from "@chakra-ui/react";
import InfoTip from "../elements/InfoTip";

function ChooseSupermajority({ details, setDetails }) {
  const [supermajority, setSupermajority] = useState(
    parseInt(details["governance"]["supermajority"])
  );
  const [showSupermajorityTooltip, setShowSupermajorityTooltip] =
    useState(false);
  const [showSlider, setShowSlider] = useState(false);

  console.log(showSlider)

  useEffect(() => {
    details["governance"]["supermajority"] = supermajority;
    setDetails(details);
  }, [supermajority]);

  const presentSlider = () => {
    console.log("hi")
    if (!showSlider) {
      setShowSlider(true)
    } else {
      setShowSlider(false)
    }
  }

  return (
    <VStack w={"100%"} spacing="8" align="flex-start">
      <HStack w={"100%"} pt={"4"}>
        <label>Approval Needed</label>
        <InfoTip
          label={
            "Minimum % of member approvals required for proposals to pass, e.g., a 75% supermajority needs at least 75% of DAO tokens in favor of a proposal for the proposal to pass"
          }
        />
        <Spacer />
        <Button
          h={"100%"}
          bg="clear"
          border="0px"
          fontWeight="normal"
          _hover={{ bg: "red" }}
          onClick={() => presentSlider()}
        >
          {supermajority}%
        </Button>
      </HStack>
      {showSlider && (
        <Slider
          id="slider"
          min={52}
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
      )}
    </VStack>
  )
}

export default ChooseSupermajority;
