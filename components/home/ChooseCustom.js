import React, { useContext } from "react";
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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import Select from "../elements/Select";
import { useForm, Controller } from "react-hook-form";
import ChooseCrowdsale from "./ChooseCrowdsale";
import ChooseRedemption from "./ChooseRedemption";
import ChooseTribute from "./ChooseTribute";
import ChooseQuorum from "./ChooseQuorum";
import ChooseSupermajority from "./ChooseSupermajority";

export default function ChooseCustom({ details, setDetails, handleNext }) {
  const value = useContext(AppContext);
  const { web3, chainId, loading, account } = value.state;

  const { handleSubmit, control } = useForm({
    defaultValues: {
      votingPeriod: details["governance"]["votingPeriod"],
      votingPeriodUnit: 0,
      paused: details["governance"]["paused"],
    },
  });

  const calculateVotingPeriod = (period, unit) => {
    let seconds;
    if (unit == 0) {
      seconds = period * 60 * 60 * 24;
    } else if (unit == 1) {
      seconds = period * 60 * 60;
    } else {
      seconds = period * 60;
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
                    <option value="2">min</option>
                  </Select>
                )}
              />
            </HStack>
          </VStack>
        </HStack>
        <br></br>
        <ChooseQuorum details={details} setDetails={setDetails} />
        <br></br>
        <ChooseSupermajority details={details} setDetails={setDetails} />
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
  )
}
