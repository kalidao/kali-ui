import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import {
  Flex,
  VStack,
  Button,
  Text,
  Select,
  Input,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { factoryInstance } from "../../eth/factory";
import { fetchDaoNames } from "../../utils/fetchDaoNames";
import { addresses } from "../../constants/addresses";
import { useForm } from "react-hook-form";
export default function ChooseIdentity(props) {
  const value = useContext(AppContext);
  const { web3, chainId, account } = value.state;
  const [daoNames, setDaoNames] = useState(null);

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

  const getDaoNames = async () => {
    try {
      let factory = factoryInstance(addresses[chainId]["factory"], web3);
      let daoNames_ = await fetchDaoNames(factory);
      setDaoNames(daoNames_);
      console.log(daoNames_);
    } catch (e) {
      value.toast(e);
    }
  };

  const isNameUnique = (name) => {
    console.log(errors.name);
    if(account==null) {
      value.toast("Please connect your account.");
      return false;
    } else {
      if (name != null && daoNames.includes(name) === true) {
        value.toast("Name not unique. Choose another.");
        return false;
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
      <Heading as="h1">Select a name and symbol:</Heading>
      <FormControl>
        <FormLabel htmlFor="name" fontSize="xl" fontWeight="800">
          Name
        </FormLabel>
        <Input
          name="name"
          {...register("name", {
            required: true,
            validate: isNameUnique || value.toast("Name not unique."),
          })}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="symbol" fontSize="xl" fontWeight="800">
          Symbol
        </FormLabel>
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
        {errors.symbol && value.toast(errors.symbol.message)}
      </FormControl>
      <Button className="transparent-btn" type="submit">
        Next »
      </Button>
    </VStack>
  );
}
