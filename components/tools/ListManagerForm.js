import React, { useState, useEffect, useContext } from "react"
import kaliTokenFactory from "../../eth/kaliToken"
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  HStack,
  List,
  ListItem,
  IconButton,
  Spacer,
} from "@chakra-ui/react"
import { AiOutlineDelete, AiOutlineUserAdd } from "react-icons/ai"
import { useForm, Controller, useFieldArray } from "react-hook-form"
import InfoTip from "../elements/InfoTip"
import AppContext from "../../context/AppContext"
import { addresses } from "../../constants/addresses"

export default function TokenForm() {
  const value = useContext(AppContext)
  const { web3, account, chainId } = value.state
  const [listCreated, setListCreated] = useState(false)
  const [merkle, setMerkle] = useState("")

  // merkle 0x0000000000000000000000000000000000000000
  // merkle 0x6162636400000000000000000000000000000000000000000000000000000000

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm()

  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  })

  const submit = async (values) => {
    const { owner, name, symbol, details, paused, members } = values

    // const factory = kaliTokenFactory(addresses[chainId]["erc20factory"], web3)
    console.log(values)
    // let accounts = []
    // let amounts = []
    // for (let i = 0; i < members.length; i++) {
    //   accounts.push(members[i].address)
    //   amounts.push(web3.utils.toWei(members[i].amount))
    // }

    // try {
    //   let result = await factory.methods
    //     .deployKaliERC20(
    //       name,
    //       symbol,
    //       details,
    //       accounts,
    //       amounts,
    //       paused,
    //       owner
    //     )
    //     .send({ from: account })

    //   console.log("This is the result", result)
    //   setListCreated(true)
    // } catch (e) {
    //   alert(e)
    //   console.log(e)
    // }
  }

  return (
    <VStack w="50%" as="form" onSubmit={handleSubmit(submit)}>
      <br />
      <Heading as="h1">Create an access list</Heading>
      <VStack w="100%" align="flex-start">
        <HStack w="100%">
          <label>Member</label>
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
          {fields.map((Member, index) => (
            <ListItem
              display="flex"
              flexDirection="row"
              alignContent="center"
              justifyContent="center"
              key={Member.id}
            >
              <Controller
                name={`members.${index}.address`}
                control={control}
                defaultValue={Member.address}
                render={({ field }) => (
                  <FormControl isRequired>
                    <Input
                      className="member-address"
                      placeholder="0xKALI or ENS"
                      {...field}
                      {...register(`members.${index}.address`, {
                        required: "You must assign amount!",
                      })}
                    />
                  </FormControl>
                )}
              />
              <IconButton
                className="delete-icon"
                bg="tomato"
                aria-label="delete member"
                icon={<AiOutlineDelete />}
                onClick={() => remove(index)}
              />
            </ListItem>
          ))}
        </List>
        <FormControl>
          <VStack align="flex-start" spacing="15px">
            <HStack>
              <Checkbox
                name="merkle"
                value="merkle"
                size="md"
                defaultValue={merkle}
                isChecked={merkle}
                onChange={() => setMerkle(!merkle)}
              >
                <label htmlFor="merkle">Merkle Root</label>
              </Checkbox>
              <InfoTip hasArrow label={"Merkle root is of type byte32"} />
            </HStack>

            {merkle && (
              <Input
                w="90%"
                name="merkle"
                placeholder="bytes32"
                {...register("merkle")}
              />
            )}
            {errors.owner && value.toast(errors.owner.message)}
          </VStack>
        </FormControl>
        {listCreated && <label>Access List Created!</label>}
      </VStack>
      <Button className="transparent-btn" type="submit">
        Mint »
      </Button>
    </VStack>
  )
}
