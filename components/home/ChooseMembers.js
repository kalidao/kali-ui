import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import {
  FormLabel,
  FormControl,
  Input,
  VStack,
  Button,
  Heading,
  List,
  ListItem,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { toDecimals, fromDecimals } from "../../utils/formatters";

export default function ChooseMembers(props) {
  const value = useContext(AppContext);
  const { web3 } = value.state;
  const [defaults, setDefaults] = useState([]);

  const { handleSubmit, register, control } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "founders",
  });

  useEffect(() => {
    if (props.details["founders"]["members"] == null) {
      append({ address: "" });
      setDefaults([1]);
    } else {
      for (let i = 0; i < props.details["founders"]["members"].length; i++) {
        append({
          address: props.details["founders"]["members"][i],
          share: fromDecimals(props.details["founders"]["shares"][i], 18),
        });
        let array = defaults;
        array[i] = fromDecimals(props.details["founders"]["shares"][i], 18);
        setDefaults(array);
      }
    }
  }, [props.details]);

  const handleMembersSubmit = async (values) => {
    console.log("Form: ", values);

    const { founders } = values;

    // convert shares to wei
    let sharesArray = [];

    for (let i = 0; i < founders.length; i++) {
      sharesArray.push(toDecimals(founders[i].share, 18));
    }

    console.log("Shares Array", sharesArray);

    let votersArray = [];

    for (let i = 0; i < founders.length; i++) {
      if (founders[i].address.slice(-4) === ".eth") {
        founders[i].address = await web3.eth.ens.getAddress(founders[i].address).catch(() => {
          value.toast(founders[i].address + " is not a valid ENS.");
        })
      } else if (web3.utils.isAddress(founders[i].address) == false) {
        value.toast(founders[i].address + " is not a valid Ethereum address.");
        return;
      } 

      if (founders[i].address === undefined) {
        return;
      }
      votersArray.push(founders[i].address);
    }
    console.log("Voters Array", votersArray);

    const { details, setDetails } = props;

    details["founders"]["members"] = votersArray;
    details["founders"]["shares"] = sharesArray;
    setDetails(details);
    console.log(details);

    props.handleNext();
  };

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit(handleMembersSubmit)}
      width="100%"
      alignItems="center"
    >
      <Heading as="h1">
        <b>Build your cap table</b>
      </Heading>
      <br></br>
      <List spacing={2} width="80%" className="alternating-list">
        {fields.map((founder, index) => (
          <ListItem
            display="flex"
            flexDirection="row"
            alignContent="center"
            justifyContent="center"
            key={founder.id}
          >
            <Controller
              name={`founders.${index}.address`}
              control={control}
              defaultValue={founder.address}
              render={({ field }) => (
                <FormControl isRequired>
                  <FormLabel htmlFor={`founders.${index}.address`}>
                    Founder
                  </FormLabel>
                  <Input
                    className="member-address"
                    placeholder="0x address or ENS"
                    {...field}
                    {...register(`founders.${index}.address`, {
                      required: "You must assign share!",
                    })}
                  />
                </FormControl>
              )}
            />
            <Controller
              name={`founders.${index}.share`}
              control={control}
              defaultValue={founder.share}
              render={({ field }) => (
                <FormControl isRequired>
                  <FormLabel htmlFor={`founders.${index}.share`}>
                    Shares
                  </FormLabel>
                  <Controller
                    control={control}
                    name={`founders.${index}.share`}
                    min="1"
                    render={({ field: { ref, ...rest } }) => (
                      <NumberInput min="1" max="1000000000" {...rest}>
                        <NumberInputField ref={ref} name={rest.name} />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    )}
                  />
                  {/* NOTE: <NumInputField/> is not compatible with react-hook-form. Using documentElementById was bypassing this and allowed for NaN and zero values.*/}
                </FormControl>
              )}
            />
            <IconButton
              className="delete-icon"
              aria-label="delete founder"
              mt={8}
              ml={2}
              icon={<AiOutlineDelete />}
              onClick={() => remove(index)}
            />
          </ListItem>
        ))}
      </List>
      <Button
        className="transparent-btn"
        onClick={() => append({ address: "" })}
      >
        + Add Founder
      </Button>
      <br></br>
      <Button className="transparent-btn" type="submit">
        Next »
      </Button>
    </VStack>
  );
}
