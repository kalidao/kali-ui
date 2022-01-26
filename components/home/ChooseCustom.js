import React, { useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import {
  VStack,
  HStack,
  Button,
  Heading,
  FormControl,
  FormLabel,
  Checkbox,
  Input,
  Grid,
  Switch,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
// import NumInputField from "../elements/NumInputField";
// import { supportedChains } from "../../constants/supportedChains";
// import { getNetworkName, convertVotingPeriod } from "../../utils/formatters";
// import { presets } from "../../constants/presets";
// import { extensionDescriptions } from "../../constants/extensionsHelper";
// import Slider from "../elements/CustomSlider";
import Select from "../elements/Select";
import { useForm, Controller } from "react-hook-form";
import { presets } from "../../constants/presets";

export default function ChooseCustom({ details, setDetails, handleNext }) {
  const value = useContext(AppContext);
  const { web3, chainId, loading, account } = value.state;
  const [redemption, setRedemption] = useState(
    details["extensions"]["redemption"]["active"]
  );
  const [crowdsale, setCrowdsale] = useState(
    details["extensions"]["crowdsale"]["active"]
  );

  // TODO: Add votingPeriod
  const { handleSubmit, register, control } = useForm({
    defaultValues: {
      votingPeriod: details["governance"]["votingPeriod"] / (60 * 60 * 24),
      votingPeriodUnit: 2,
      quorum: details["governance"]["quorum"],
      supermajority: details["governance"]["supermajority"],
      paused: details["governance"]["paused"],
      tribute: details["extensions"]["tribute"]["active"],
      redemptionStart: details["extensions"]["redemption"]["redemptionStart"],
      saleEnds: details["extensions"]["crowdsale"]["saleEnds"],
    },
  });

  const calculateVotingPeriod = (period, unit) => {
    let seconds;
    if (unit == 0) {
      seconds = period * 60;
    } else if (unit == 1) {
      seconds = period * 60 * 60;
    } else if (unit == 2) {
      seconds = period * 60 * 60 * 24;
    }

    return seconds;
  };

  const submit = (values) => {
    console.log(values);
    const {
      votingPeriod,
      votingPeriodUnit,
      quorum,
      supermajority,
      paused,
      tribute,
      redemptionStart,
      saleEnds,
    } = values;

    // setting governance
    details["governance"]["votingPeriod"] = calculateVotingPeriod(
      votingPeriod,
      votingPeriodUnit
    );
    details["governance"]["quorum"] = parseInt(quorum);
    details["governance"]["supermajority"] = parseInt(supermajority);
    details["governance"]["paused"] = Number(!paused);
    // props.setDetails(governance);

    // setting extensions
    details["extensions"]["tribute"]["active"] = tribute;

    details["extensions"]["redemption"]["active"] = redemption;
    details["extensions"]["redemption"]["redemptionStart"] = redemptionStart;
    details["extensions"]["redemption"]["tokenArray"] = [
      "0xc778417e063141139fce010982780140aa0cd5ab",
      "0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea",
      "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b",
      "0xD9BA894E0097f8cC2BBc9D24D308b98e36dc6D02",
    ];

    details["extensions"]["crowdsale"]["active"] = crowdsale;
    details["extensions"]["crowdsale"]["purchaseToken"] =
      presets[1]["extensions"]["crowdsale"]["purchaseToken"];
    details["extensions"]["crowdsale"]["purchaseMultiplier"] =
      presets[1]["extensions"]["crowdsale"]["purchaseMultiplier"];
    details["extensions"]["crowdsale"]["purchaseLimit"] =
      presets[1]["extensions"]["crowdsale"]["purchaseLimit"];
    details["extensions"]["crowdsale"]["saleEnds"] = saleEnds;
    details["extensions"]["crowdsale"]["listId"] =
      presets[1]["extensions"]["crowdsale"]["listId"];

    setDetails(details);
    console.log("details", details);
    handleNext();
  };

  // TODO: DefaultValues
  return (
    <VStack as="form" onSubmit={handleSubmit(submit)}>
      <Heading fontWeight="800">Customize your governance</Heading>
      <HStack>
        <FormControl>
          <FormLabel htmlFor="votingPeriod">Voting Period</FormLabel>
          <Controller
            control={control}
            name="votingPeriod"
            render={({ field: { ref, ...rest } }) => (
              <NumberInput min="1" {...rest}>
                <NumberInputField ref={ref} name={rest.name} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            )}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="votingPeriodUnit">Voting Perod Unit</FormLabel>
          <Controller
            control={control}
            name="votingPeriodUnit"
            render={({ field: { ref, ...rest } }) => (
              <Select ref={ref} name={rest.name} {...rest}>
                <option value="0">min</option>
                <option value="1">hours</option>
                <option value="2">days</option>
              </Select>
            )}
          />
        </FormControl>
      </HStack>
      {/* TODO: Figure out how to make Sliders work */}
      <FormControl>
        <FormLabel htmlFor="quorum">Quorum</FormLabel>
        <Controller
          control={control}
          name="quorum"
          render={({ field: { ref, ...rest } }) => (
            <NumberInput min="1" max="100" {...rest}>
              <NumberInputField ref={ref} name={rest.name} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          )}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Supermajority</FormLabel>
        <Controller
          control={control}
          name="supermajority"
          render={({ field: { ref, ...rest } }) => (
            <NumberInput min="51" max="100" {...rest}>
              <NumberInputField ref={ref} name={rest.name} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          )}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="paused">
          <b>Share Transferability</b>
        </FormLabel>
        <Controller
          control={control}
          name="paused"
          render={({ field }) => (
            <Switch id="paused" size="md" colorScheme="red" {...field} />
          )}
        />
      </FormControl>
      <FormControl>
        <FormLabel>
          <b>Extensions</b>
        </FormLabel>
        {/* TODO: Make the checkmarks appear */}
        <Grid templateColumns="repeat(3, 1fr)" gap={2}>
          <Checkbox
            name="redemption"
            value="redemption"
            defaultValue={redemption}
            onChange={() => setRedemption(!redemption)}
          >
            Redemption
          </Checkbox>
          <Checkbox
            name="crowdsale"
            value="crowdsale"
            defaultValue={crowdsale}
            onChange={() => setCrowdsale(!crowdsale)}
          >
            Crowdsale
          </Checkbox>
          <Controller
            control={control}
            name="tribute"
            render={({ field }) => (
              <Checkbox name="tribute" value="tribute" {...field}>
                Tribute
              </Checkbox>
            )}
          />
        </Grid>
      </FormControl>
      {/* TODO: Add Calendar for these  */}
      {redemption ? (
        <>
          <FormLabel htmlFor="redemptionStart">
            When should redemption start?(in seconds)
          </FormLabel>
          <Input name="redemptionStart" {...register("redemptionStart")} />
        </>
      ) : null}
      {crowdsale ? (
        <>
          <FormLabel htmlFor="saleEnds">
            When should the crowdsale end?(in seconds)
          </FormLabel>
          <Input name="saleEnds" {...register("saleEnds")} />
        </>
      ) : null}
      <Button className="transparent-btn" type="submit">
        Next »
      </Button>
    </VStack>
  );
}
