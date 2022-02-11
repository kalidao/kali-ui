import React, { useContext } from "react"
import AppContext from "../../context/AppContext"
import kaliToken from "../../eth/kaliToken"
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  HStack
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import InfoTip from "../elements/InfoTip"

export default function TokenForm() {
  const value = useContext(AppContext)
  // const { web3, account, loading, dao } = value.state

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // votingPeriod: details["governance"]["votingPeriod"],
      // votingPeriodUnit: 0,
    },
  })

  // const handleNftSubmit = async (values) => {
  //   toggleLoading()
  //   console.log("Token creation Form: ", values)
  //   console.log("DAO Address: ", dao)

  //   const { name, symbol, supply } = values

  //   try {
  //     let result = await kaliToken.methods
  //       .deployFixedERC20(name, symbol, 18, dao, web3.utils.toWei(supply))
  //       .send({ from: account })

  //     console.log("This is the result", result)
  //     // let dao = result["events"]["DAOdeployed"]["returnValues"]["kaliDAO"];

  //     // Router.push({
  //     //   pathname: "/daos/[dao]",
  //     //   query: { dao: dao },
  //     // })
  //   } catch (e) {
  //     alert(e)
  //     console.log(e)
  //   }

  //   toggleLoading()
  // }

  const submit = (values) => {
    const { name, symbol } = values

    console.log("hi")
  }

  return (
    <VStack as="form" onSubmit={handleSubmit(submit)}>
      <Heading as="h1">Mint an ERC20 token</Heading>
      {/* <FormControl>
        <FormLabel>
          Name
        </FormLabel>
        <HStack>

        <Input></Input>
        <InfoTip></InfoTip>
        </HStack>
      </FormControl> */}
      <FormControl>
        <FormLabel htmlFor="name" fontSize="m" fontWeight="500">
          Name
        </FormLabel>
        <HStack>
          <Input
            name="name"
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
      {/* <FormControl>
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
      </FormControl> */}
      <br></br>
      <Button className="transparent-btn" type="submit">
        Mint »
      </Button>
    </VStack>
  )
}
