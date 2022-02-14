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

function ChooseQuorum({ details, setDetails }) {
  const [quorum, setQuorum] = useState(
    parseInt(details["governance"]["quorum"])
  );
  const [showQuorumTooltip, setShowQuorumTooltip] = useState(false);
  const [showSlider, setShowSlider] = useState(false);


  useEffect(() => {
    details["governance"]["quorum"] = quorum;
    setDetails(details);
  }, [quorum]);

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
      <HStack w={"100%"}>
        <label htmlFor="quorum">Quorum</label>
        <InfoTip
          label={
            "Minimum % of tokens that must vote for proposals to pass, e.g., a 20% quorum needs at least 20% of DAO tokens voting on a proposal for the proposal result to be valid"
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
          {quorum}%
        </Button>
      </HStack>
      {showSlider && (

      <Slider
        id="slider"
        min={0}
        max={100}
        colorScheme="red"
        defaultValue={details["governance"]["quorum"]}
        aria-label="quorum slider"
        onChangeEnd={(v) => setQuorum(v)}
        onMouseEnter={() => setShowQuorumTooltip(true)}
        onMouseLeave={() => setShowQuorumTooltip(false)}
      >
        <SliderMark value={25} mt="1" fontSize="xs">
          25%
        </SliderMark>
        <SliderMark value={50} mt="1" fontSize="xs">
          50%
        </SliderMark>
        <SliderMark value={75} mt="1" fontSize="xs">
          75%
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        
          <SliderThumb />
      </Slider>
      )}
    </VStack>
  )
}

export default ChooseQuorum;
