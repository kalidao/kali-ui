import React, { useState, useEffect, useContext } from "react"
import kaliTokenFactory from "../../eth/kaliToken"
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  HStack,
  List,
  ListItem,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Spacer,
  Switch,
} from "@chakra-ui/react"
import { AiOutlineDelete, AiOutlineUserAdd } from "react-icons/ai"
import { useForm, Controller, useFieldArray } from "react-hook-form"
import InfoTip from "../elements/InfoTip"
import AppContext from "../../context/AppContext"
import { addresses } from "../../constants/addresses"


export default function TokenForm() {
  const value = useContext(AppContext)
  const { web3, account, chainId } = value.state
  const [isMinted, setIsMinted] = useState(false)

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      owner: "",
      name: "",
      symbol: "",
      details: "",
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "recipients",
  })

  const submit = async (values) => {
    const { owner, name, symbol, details, paused, recipients } = values

    const factory = kaliTokenFactory(addresses[chainId]["erc20factory"], web3)

    let accounts = [];
    let amounts = [];
    for (let i = 0; i < recipients.length; i++) {
      accounts.push(recipients[i].address)
      amounts.push(web3.utils.toWei(recipients[i].amount))
    }

    try {
      let result = await factory.methods
        .deployKaliERC20(name, symbol, details, accounts, amounts, paused, owner)
        .send({ from: account })

      console.log("This is the result", result)
      setIsMinted(true)
    } catch (e) {
      alert(e)
      console.log(e)
    }
  }

  return (
    <VStack w="70%" as="form" onSubmit={handleSubmit(submit)}>
      <br />
      <Heading as="h1">Mint an ERC20 token</Heading>
      <FormControl>
        <FormLabel htmlFor="owner" fontSize="m" fontWeight="500">
          Owner
        </FormLabel>
        <HStack>
          <Input
            name="owner"
            placeholder="0xKALI or ENS"
            {...register("owner", {
              required: "Owner is required.",
            })}
          />
          <InfoTip hasArrow label={"Token will be minted to this address"} />
        </HStack>
        {errors.owner && value.toast(errors.owner.message)}
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="name" fontSize="m" fontWeight="500">
          Name
        </FormLabel>
        <HStack>
          <Input
            name="name"
            placeholder="KALI Token"
            {...register("name", {
              required: true,
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
      <FormControl>
        <FormLabel htmlFor="symbol" fontSize="m" fontWeight="500">
          Symbol
        </FormLabel>
        <HStack>
          <Input
            name="symbol"
            placeholder="KALI"
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
      <FormControl>
        <FormLabel htmlFor="supply" fontSize="m" fontWeight="500">
          Details
        </FormLabel>
        <HStack>
          <Input name="details" placeholder="IPFS link" {...register("details")} />
          <InfoTip hasArrow label={"Details for your ERC20 token"} />
        </HStack>
        {errors.details && value.toast(errors.details.message)}
      </FormControl>
      <HStack pt={"4"} w={"100%"}>
        <FormLabel htmlFor="paused">Share Transferability</FormLabel>
        <Spacer></Spacer>
        <Controller
          control={control}
          name="paused"
          render={({ field }) => (
            <Switch
              defaultChecked="false"
              id="paused"
              size="md"
              colorScheme="red"
              {...field}
            />
          )}
        />
      </HStack>
      <VStack w="100%" align="flex-start">
        <HStack w="100%">
          <label>Recipients</label>
          <Spacer />
          <Button
            border="0px"
            variant="ghost"
            _hover={{
              background: "green.500",
            }}
            onClick={() => append({ address: "" })}
          >
            <AiOutlineUserAdd />
          </Button>
        </HStack>
        <List width="100%">
          {fields.map((Recipient, index) => (
            <ListItem
              display="flex"
              flexDirection="row"
              alignContent="center"
              justifyContent="center"
              key={Recipient.id}
            >
              <Controller
                name={`recipients.${index}.address`}
                control={control}
                defaultValue={Recipient.address}
                render={({ field }) => (
                  <FormControl isRequired>
                    {/* <FormLabel htmlFor={`recipients.${index}.address`}>
                      Recipient
                    </FormLabel> */}
                    <Input
                      className="member-address"
                      placeholder="0xKALI or ENS"
                      {...field}
                      {...register(`recipients.${index}.address`, {
                        required: "You must assign amount!",
                      })}
                    />
                  </FormControl>
                )}
              />
              <Controller
                name={`recipients.${index}.amount`}
                control={control}
                defaultValue={Recipient.amount}
                render={({ field }) => (
                  <FormControl isRequired>
                    {/* <FormLabel htmlFor={`recipients.${index}.amount`}>
                      Amounts
                    </FormLabel> */}
                    <Controller
                      control={control}
                      name={`recipients.${index}.amount`}
                      render={({ field: { ref, ...rest } }) => (
                        <NumberInput
                          min="1"
                          max="1000000000"
                          {...rest}
                        >
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
                aria-label="delete recipient"
                ml={2}
                icon={<AiOutlineDelete />}
                onClick={() => remove(index)}
              />
            </ListItem>
          ))}
        </List>
        {isMinted && (
          <label>Minted!</label>
        )}
      </VStack>
      <Button className="transparent-btn" type="submit">
        Mint »
      </Button>
    </VStack>
  )
}
