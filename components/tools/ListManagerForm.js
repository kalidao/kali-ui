import React, { useState, useEffect, useContext } from "react"
import kaliAccessManager from "../../eth/kaliAccessManager"
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
    const { members, merkle } = values

    const factory = kaliAccessManager(addresses[chainId]["access"], web3)

    let array = []

    for (let i = 0; i < members.length; i++) {
      if (members[i].address.slice(-4) === ".eth") {
        members[i].address = await web3.eth.ens
          .getAddress(members[i].address)
          .catch(() => {
            value.toast(members[i].address + " is not a valid ENS.")
          })
      } else if (web3.utils.isAddress(members[i].address) == false) {
        value.toast(members[i].address + " is not a valid Ethereum address.")
        return
      }

      if (members[i].address === undefined) {
        return
      }

      array.push(members[i].address)
    }

    array = [...new Set(array)]

    try {
      let result = await factory.methods
        .createList(array, web3.utils.asciiToHex(merkle))
        .send({ from: account })

      console.log("This is the result", result)
      setListCreated(true)
    } catch (e) {
      alert(e)
      console.log(e)
    }
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
            <AiOutlineUserAdd color="white"/>
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
