import React, { useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import {
  Box,
  Divider,
  VStack,
  HStack,
  Button,
  Heading,
  FormLabel,
  Switch,
  Spacer,
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tooltip,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import Select from "../elements/Select";
import { useForm, Controller } from "react-hook-form";
import InfoTip from "../elements/InfoTip";
import ChooseCrowdsale from "./ChooseCrowdsale";
import ChooseRedemption from "./ChooseRedemption";
import ChooseTribute from "./ChooseTribute";

export default function ChooseCustom({ details, setDetails, handleNext }) {
  const value = useContext(AppContext);
  const { web3, chainId, loading, account } = value.state;

  const [quorum, setQuorum] = useState(
    parseInt(details["governance"]["quorum"])
  );
  const [supermajority, setSupermajority] = useState(
    parseInt(details["governance"]["supermajority"])
  );
  const [showQuorumTooltip, setShowQuorumTooltip] = useState(false);
  const [showSupermajorityTooltip, setShowSupermajorityTooltip] =
    useState(false);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      votingPeriod: details["governance"]["votingPeriod"],
      votingPeriodUnit: 0,
      quorum: details["governance"]["quorum"],
      supermajority: details["governance"]["supermajority"],
      paused: details["governance"]["paused"],
    },
  });

  const calculateVotingPeriod = (period, unit) => {
    let seconds;
    if (unit == 0) {
      seconds = period * 60 * 60 * 24;
    } else {
      seconds = period * 60 * 60;
    }
    console.log(seconds);
    return seconds;
  };

  const submit = (values) => {
    const { votingPeriod, votingPeriodUnit, paused } = values;

    // setting governance
    details["governance"]["votingPeriod"] = calculateVotingPeriod(
      votingPeriod,
      votingPeriodUnit
    );
    details["governance"]["quorum"] = parseInt(quorum);
    details["governance"]["supermajority"] = parseInt(supermajority);
    details["governance"]["paused"] = Number(paused);

    setDetails(details);
    console.log("details", details);
    handleNext();
  };

  return (
    <VStack as="form" onSubmit={handleSubmit(submit)}>
      <Heading fontWeight="800">Customize your governance</Heading>
      <br></br>
      <VStack align="flex-start" spacing="4" bg="">
        <Box p="1" />
        <HStack w={"100%"}>
          <VStack w={"100%"} align="flex-start">
            <label htmlFor="votingPeriod">Voting Period</label>
            <br></br>
            <HStack w={"100%"}>
              <Controller
                control={control}
                name="votingPeriod"
                render={({ field: { ref, ...rest } }) => (
                  <NumberInput min="1" max="365" {...rest}>
                    <NumberInputField
                      fontSize="sm"
                      ref={ref}
                      name={rest.name}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                )}
              />
              <Spacer />
              <Controller
                control={control}
                name="votingPeriodUnit"
                render={({ field: { ref, ...rest } }) => (
                  <Select
                    w={100}
                    ref={ref}
                    name={rest.name}
                    {...rest}
                    fontSize="sm"
                  >
                    <option value="0">days</option>
                    <option value="1">hours</option>
                  </Select>
                )}
              />
            </HStack>
          </VStack>
        </HStack>
        <br></br>
        <VStack w={"100%"} spacing="8" align="flex-start">
          <HStack>
            <label htmlFor="quorum">Quorum</label>
            <InfoTip
              label={
                "Minimum % of tokens that must vote for proposals to pass, e.g., a 20% quorum needs at least 20% of DAO tokens voting on a proposal for the proposal result to be valid"
              }
            />
          </HStack>
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
            <Tooltip
              hasArrow
              bg="teal.500"
              color="white"
              placement="top"
              isOpen={showQuorumTooltip}
              label={`${quorum}%`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
        </VStack>
        <br></br>
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
        <br></br>
        <HStack pt={"4"} w={"100%"}>
          <FormLabel htmlFor="paused">Share Transferability</FormLabel>
          <Spacer></Spacer>
          <Controller
            control={control}
            name="paused"
            render={({ field }) => (
              <Switch id="paused" size="md" colorScheme="red" {...field} />
            )}
          />
        </HStack>
        <br></br>
        <VStack align="flex-start" spacing={5}>
          <label>
            <b>Extensions</b>
          </label>
          <Divider w="50%" />
          <ChooseRedemption details={details} setDetails={setDetails} />
          <ChooseCrowdsale details={details} setDetails={setDetails} />
          <ChooseTribute details={details} setDetails={setDetails} />
        </VStack>
        <Box w="100%" align="center">
          <br></br>
          <Button
            disabled={account && chainId ? false : true}
            className="transparent-btn"
            type="submit"
          >
            Next »
          </Button>
        </Box>
      </VStack>
    </VStack>
  );
}
