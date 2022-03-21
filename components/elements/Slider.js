import {
  Slider as ChakraSlider,
  SliderMark,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  Spacer,
} from "@chakra-ui/react";
import { useState } from "react";
function Slider({ id, min, max, defaultValue, label, onChangeEnd, marks }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <ChakraSlider
      id={id}
      min={min}
      max={max}
      defaultValue={defaultValue}
      aria-label={label}
      onChangeEnd={onChangeEnd}
      colorScheme="red"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {marks.map((mark) => (
        <SliderMark key={mark} value={mark} mt="1" fontSize="xs">
          {mark}%
        </SliderMark>
      ))}
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </ChakraSlider>
  );
}

export default Slider;
