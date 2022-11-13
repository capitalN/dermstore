import React from "react";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AllContext } from "../Context/AllContextProvider";

export default function RangeSliderComp() {
  let { setPriceRange } = useContext(AllContext);
  
  return (
    <RangeSlider
      defaultValue={[0, 500]}
      min={0}
      max={1000}
      step={100}
      onChangeEnd={(value) => setPriceRange({ min: value[0], max: value[1] })}
    >
      <RangeSliderTrack bg="red.100">
        <RangeSliderFilledTrack bg="tomato" />
      </RangeSliderTrack>
      <RangeSliderThumb boxSize={6} index={0} />
      <RangeSliderThumb boxSize={6} index={1} />
    </RangeSlider>
  );
}
