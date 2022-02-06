import React, { useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import {
  Box,
  Divider,
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
  Spacer,
  Text,
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
// import NumInputField from "../elements/NumInputField";
// import { supportedChains } from "../../constants/supportedChains";
// import { getNetworkName, convertVotingPeriod } from "../../utils/formatters";
// import { presets } from "../../constants/presets";
// import { extensionDescriptions } from "../../constants/extensionsHelper";
// import Slider from "../elements/CustomSlider";
import Select from "../elements/Select";
import { useForm, Controller } from "react-hook-form";
import { presets } from "../../constants/presets";
import DateSelect from "../elements/DateSelect";
import InfoTip from "../elements/InfoTip";
import DatePicker from "react-datepicker";

export default function ChooseCustom({ details, setDetails, handleNext }) {
  const value = useContext(AppContext);
  const { web3, chainId, loading, account } = value.state;
  const [redemption, setRedemption] = useState(
    details["extensions"]["redemption"]["active"]
  );
  const [crowdsale, setCrowdsale] = useState(
    details["extensions"]["crowdsale"]["active"]
  );

  const [tribute, setTribute] = useState(
    details["extensions"]["tribute"]["active"]
  );
  const [saleEnds, setSaleEnds] = useState(new Date());
  const [redemptionStart, setRedemptionStart] = useState(new Date());
  const [quorum, setQuorum] = useState(30);
  const [supermajority, setSupermajority] = useState(55)
  const [showQuorumTooltip, setShowQuorumTooltip] = useState(false)
  const [showSupermajorityTooltip, setShowSupermajorityTooltip] = useState(false)

  const { handleSubmit, register, control } = useForm({
    defaultValues: {
      votingPeriod: details["governance"]["votingPeriod"],
      votingPeriodUnit: 0,
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
      seconds = period * 60 * 60 * 24
    } else {
      seconds = period * 60 * 60;
    }
    console.log(seconds)
    return seconds;
  };

  const submit = (values) => {
    const { votingPeriod, votingPeriodUnit, paused } =
      values;

    // setting governance
    details["governance"]["votingPeriod"] = calculateVotingPeriod(
      votingPeriod,
      votingPeriodUnit
    );
    details["governance"]["quorum"] = parseInt(quorum);
    details["governance"]["supermajority"] = parseInt(supermajority);
    details["governance"]["paused"] = Number(paused);

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

  return (
    <VStack as="form" onSubmit={handleSubmit(submit)}>
      <Heading fontWeight="800">Customize your governance</Heading>
      <VStack align="flex-start" spacing="4" bg="">
        <Box p="1" />
        <HStack w={"100%"}>
          <VStack w={"100%"} align="flex-start">
            <label htmlFor="votingPeriod">Voting Period</label>
            <HStack w={"100%"}>
              <Controller
                control={control}
                name="votingPeriod"
                render={({ field: { ref, ...rest } }) => (
                  <NumberInput min="1" {...rest}>
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
            defaultValue={30}
            min={0}
            max={100}
            colorScheme="telegram"
            onChange={(v) => setQuorum(v)}
            onMouseEnter={() => setShowQuorumTooltip(true)}
            onMouseLeave={() => setShowQuorumTooltip(false)}
          >
            <SliderMark value={25} mt="1" ml="-2.5" fontSize="xs">
              25%
            </SliderMark>
            <SliderMark value={50} mt="1" ml="-2.5" fontSize="xs">
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
              isOpen={showQuorumTooltip}
              label={`${quorum}%`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
        </VStack>
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
            defaultValue={55}
            min={51}
            max={100}
            colorScheme="telegram"
            onChange={(v) => setSupermajority(v)}
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
        <VStack align="flex-start">
          <label>
            <b>Extensions</b>
          </label>
          <Divider w="50%" />
          <HStack>
            <Checkbox
              name="redemption"
              value="redemption"
              size="sm"
              defaultValue={redemption}
              isChecked={redemption}
              onChange={() => setRedemption(!redemption)}
            >
              <Text fontSize="sm">Redemption</Text>
            </Checkbox>
            <InfoTip
              label={
                "Members can burn their DAO tokens to claim proportional share of DAO 🔥"
              }
            />
          </HStack>
          {redemption ? (
            <VStack>
              <Text fontSize="sm" htmlFor="redemptionStart">
                When should redemption start?
              </Text>
              <DatePicker
                id="date-picker"
                selected={redemptionStart}
                onChange={(date) => setRedemptionStart(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </VStack>
          ) : null}
          <HStack>
            <Checkbox
              name="crowdsale"
              value="crowdsale"
              size="sm"
              isChecked={crowdsale}
              defaultValue={crowdsale}
              onChange={() => setCrowdsale(!crowdsale)}
            >
              <Text fontSize="sm">Crowdsale</Text>
            </Checkbox>
            <InfoTip label={"Sell DAO token for ETH or any ERC20 tokens 🚀"} />
          </HStack>
          {crowdsale ? (
            <VStack>
              <Text fontSize="sm" htmlFor="saleEnds">
                When should the crowdsale end?
              </Text>
              <DatePicker
                id="date-picker"
                selected={saleEnds}
                onChange={(date) => setSaleEnds(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </VStack>
          ) : null}
          <HStack>
            <Checkbox
              name="tribute"
              value="tribute"
              size="sm"
              isChecked={tribute}
              defaultValue={tribute}
              onChange={() => setTribute(!tribute)}
            >
              <Text fontSize="sm">Tribute</Text>
            </Checkbox>
            <InfoTip
              label={
                "Anyone can propose to send ETH, ERC20 tokens, or NFTs to the DAO 💌"
              }
            />
          </HStack>
        </VStack>
        <Box w="100%" align="center">

          <Button className="transparent-btn" type="submit">
            Next »
          </Button>
        </Box>
      </VStack>
    </VStack>
  )
}
