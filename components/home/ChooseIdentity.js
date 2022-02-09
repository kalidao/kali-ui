import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import {
  Flex,
  VStack,
  HStack,
  Button,
  Text,
  Select,
  Input,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Tooltip
} from "@chakra-ui/react";
import { factoryInstance } from "../../eth/factory";
import { fetchDaoNames } from "../../utils/fetchDaoNames";
import { addresses } from "../../constants/addresses";
import { useForm } from "react-hook-form";
import InfoTip from "../elements/InfoTip";

export default function ChooseIdentity(props) {
  const value = useContext(AppContext);
  const { web3, chainId, account } = value.state;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  useEffect(() => {
    getDaoNames();
  }, []);

  useEffect(() => {
    getDaoNames();
  }, [account]);

  const getDaoNames = async () => {
    console.log("fetching DAOs")
    try {
      let factory = factoryInstance(addresses[chainId]["factory"], web3);
      let daoNames_ = await fetchDaoNames(factory, web3, chainId);
      props.setDaoNames(daoNames_);
      console.log(daoNames_);
    } catch (e) {
      value.toast(e);
    }
  };

  const isNameUnique = (name) => {
    console.log(errors.name);
    if(account == null) {
      value.toast("Please connect your account.");
      return false;
    } else {
      if(props.daoNames != null) {
        if (name != null && props.daoNames.includes(name) === true) {
          value.toast("Name not unique. Choose another.");
          return false;
        }
      }
    }
  };

  const submit = (values) => {
    const { name, symbol } = values;
    const { details, setDetails } = props;
    details["identity"]["daoName"] = name;
    details["identity"]["symbol"] = symbol;
    setDetails(details);

    props.handleNext();
  };

  return (
    <VStack as="form" onSubmit={handleSubmit(submit)}>
      <Heading as="h1">Identify your Org</Heading>
      <Text></Text>
      <FormControl>
        <FormLabel htmlFor="name" fontSize="m" fontWeight="500">
          Name
        </FormLabel>
        <HStack>
          <Input
            name="name"
            {...register("name", {
              required: true,
              validate: isNameUnique || value.toast("Name not unique."),
            })}
          />
          <InfoTip
            hasArrow
            label={
              "Give your DAO a name, which will also be the name of the DAO token"
            }
          />
        </HStack>
      </FormControl>
      <br></br>
      <FormControl>
        <FormLabel htmlFor="symbol" fontSize="m" fontWeight="500">
          Symbol
        </FormLabel>
        <HStack>
          <Input
            name="symbol"
            {...register("symbol", {
              required: "Symbol is required.",
              maxLength: {
                value: 12,
                message: "Symbol shouldn't be greater than 12 characters.",
              },
            })}
          />
          <InfoTip hasArrow label={"Symbol of DAO token"} />
        </HStack>
        {errors.symbol && value.toast(errors.symbol.message)}
      </FormControl>
      <br></br>
      <Button className="transparent-btn" type="submit">
        Next »
      </Button>
    </VStack>
  )
}
