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
import helpIcon from "../../public/img/HelpIcon.svg"

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

  useEffect(() => {
    getDaoNames();
  }, [account]);

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
    if(account == null || daoNames == null) {
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
      <Text></Text>
      <FormControl>
        <FormLabel htmlFor="name" fontSize="xl" fontWeight="800">
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
          <Tooltip hasArrow label="Give your DAO a name, which will also be the name of the DAO token" aria-label="A tooltip">
            <img src={helpIcon.src} height={20} width={20} alt="Help" />
          </Tooltip>
        </HStack>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="symbol" fontSize="xl" fontWeight="800">
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
          <Tooltip hasArrow label="Symbol of DAO token" aria-label="A tooltip">
            <img src={helpIcon.src} height={20} width={20} alt="Help" />
          </Tooltip>
        </HStack>
        {errors.symbol && value.toast(errors.symbol.message)}
      </FormControl>
      <Button className="transparent-btn" type="submit">
        Next »
      </Button>
    </VStack>
  )
}
