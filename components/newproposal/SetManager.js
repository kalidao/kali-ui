import React, { useState, useContext, useEffect } from 'react'
import AppContext from '../../context/AppContext'
import {
  Input,
  Button,
  Text,
  Textarea,
  Stack,
  HStack,
  VStack,
  Select,
  Center,
  List,
  ListItem,
  FormControl,
  IconButton,
  Spacer,
  Box,
} from '@chakra-ui/react'
import { addresses } from '../../constants/addresses'
import { AiOutlineDelete, AiOutlineUserAdd } from 'react-icons/ai'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import ProposalDescription from '../elements/ProposalDescription'
import { uploadIpfs } from '../../utils/helpers'
import { validateEns } from '../tools/ensHelpers'

export default function SetManager() {
  const value = useContext(AppContext)
  const { web3, loading, account, abi, address, chainId, dao, daoChain } = value.state
  const [selectedOptions, setSelectedOptions] = useState([])

  // For Notes section
  const [doc, setDoc] = useState([])
  const [note, setNote] = useState(null)
  const [file, setFile] = useState(null)

  const handleSelect = (select) => {
    var array = selectedOptions
    let value = select.target.value
    let id = select.target.id

    if (value === 'approve') {
      array[id] = true
    } else {
      array[id] = false
    }
    setSelectedOptions(array)
  }

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'managers',
  })

  useEffect(() => {
    append({ address: '' })
  }, [append])

  const submitProposal = async (values) => {
    // event.preventDefault();
    value.setLoading(true)

    // Configure proposal type
    const proposalType = 9

    // Configure description param and upload to IPFS if necessary
    let description
    note && file ? (description = await uploadIpfs(dao.address, 'Mint Proposal', file.name)) : (description = 'none')
    note ? (description = note) : (description = 'none')
    file ? (description = await uploadIpfs(dao.address, 'Mint Proposal', file.name)) : null

    // Configure account param
    const managerContract = addresses[daoChain]['extensions']['manager']

    let object = event.target
    var array = []
    for (let i = 0; i < object.length; i++) {
      array[object[i].name] = object[i].value
    }

    var { managers } = values // this must contain any inputs from custom forms

    // Configure payload param
    let managerList = []
    for (let i = 0; i < managers.length; i++) {
      const managerAddress = await validateEns(managers[i].address, web3, value)
      console.log(managerAddress)
      if (managerAddress === undefined) {
        value.setLoading(false)
        return
      }
      managerList.push(managerAddress)
    }

    console.log(managerList, selectedOptions)
    const payload = web3.eth.abi.encodeParameters(['address[]', 'bool[]'], [managerList, selectedOptions])

    try {
      console.log(proposalType, description, [managerContract], [0], [payload])
      const instance = new web3.eth.Contract(abi, address)
      let result = await instance.methods
        .propose(proposalType, description, [managerContract], [1], [payload])
        .send({ from: account })
      value.setVisibleView(2)
    } catch (e) {
      value.toast(e)
      value.setLoading(false)
      console.log(e)
    }

    value.setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(submitProposal)}>
      <VStack w={'100%'}>
        <HStack w="100%">
          <Text>Add managers to mint/burn DAO tokens directly without proposal</Text>
          <Spacer />
          <Button
            border="0px"
            variant="ghost"
            _hover={{
              background: 'green.400',
            }}
            onClick={() => append({ address: '' })}
          >
            <AiOutlineUserAdd color="white" />
          </Button>
        </HStack>
        <Box h={'2%'} />
        <List w={'100%'} spacing={3}>
          {fields.map((recipient, index) => (
            <ListItem display="flex" flexDirection="row" alignContent="center" key={recipient.id}>
              <HStack w="100%" spacing={4}>
                <Controller
                  name={`managers.${index}.address`}
                  control={control}
                  defaultValue={recipient.address}
                  render={({ field }) => (
                    <FormControl>
                      <Input
                        placeholder="0xKALI or ENS"
                        {...field}
                        {...register(`managers.${index}.address`, {
                          required: 'You must input an address!',
                        })}
                      />
                    </FormControl>
                  )}
                />
                <Controller
                  name={`managers.${index}.approval`}
                  control={control}
                  defaultValue={recipient.approval}
                  render={({ field }) => (
                    <FormControl w={'25%'}>
                      <Select id={index} onChange={handleSelect}>
                        <option>Select</option>
                        <option value="approve">Approve</option>
                        <option value="remove">Remove</option>
                      </Select>
                    </FormControl>
                  )}
                />
                <IconButton
                  className="delete-icon"
                  aria-label="delete recipient"
                  icon={<AiOutlineDelete />}
                  onClick={() => remove(index)}
                />
              </HStack>
            </ListItem>
          ))}
        </List>

        <ProposalDescription doc={doc} setDoc={setDoc} note={note} setNote={setNote} setFile={setFile} />

        <br />
        <Center>
          <Button className="solid-btn" type="submit">
            Submit Proposal
          </Button>
        </Center>
      </VStack>
    </form>
  )
}
