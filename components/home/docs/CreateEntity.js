import React, { useState, useContext, useEffect } from 'react'
import AppContext from '../../../context/AppContext'
import {
  VStack,
  HStack,
  Button,
  Text,
  Link,
  Input,
  Heading,
  Icon,
  FormControl,
  FormLabel,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import Select from '../../elements/Select'
import DateSelect from '../../elements/DateSelect'
import InfoTip from '../../elements/InfoTip'
import DelawareInvestmentClubTemplate from '../../legal/DelawareInvestmentClubTemplate'
import DelawareOAtemplate from '../../legal/DelawareOAtemplate'
import DelawareUNAtemplate from '../../legal/DelawareUNAtemplate'
import RicardianTemplate from '../../legal/RicardianTemplate'
import SwissVerein from '../../legal/SwissVerein'
import WyomingOAtemplate from '../../legal/WyomingOAtemplate'
import { useDisclosure } from '@chakra-ui/react'

export default function CreateEntity({ details, setDetails, handleNext }) {
  const value = useContext(AppContext)
  const { web3, chainId, loading, account } = value.state
  const [selected, setSelected] = useState(999)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleChange = (e) => {
    console.log(e.target.value)
    setSelected(e.target.value)
    details['legal']['docs'] = options[e.target.value]['docs']
    details['legal']['docType'] = options[e.target.value]['docType']
    setDetails(details)
    console.log(options[e.target.value]['template'])
  }

  const setEmail = (e) => {
    details['email'] = e.target.value
    setDetails(details)
    console.log(e.target.value)
  }

  const setMission = (e) => {
    details['misc']['mission'] = e.target.value
    setDetails(details)
    console.log(e.target.value)
  }

  const options = [
    {
      text: 'Series LLC (formed instantly!)',
      template: <RicardianTemplate />,
      docs: '',
      docType: 'Delaware Series LLC (instant)',
      email: true,
      mission: false,
      message:
        'Your series will be formed instantly, but we need to follow up to request information we must keep on file for your series.',
    },
    {
      text: 'Delaware LLC (est. 1-2 weeks)',
      template: 'none',
      docs: 'none',
      docType: 'Delaware LLC (pending)',
      email: true,
      mission: false,
      message: 'We will contact you to provide options for registering a Delaware LLC and the associated costs.',
    },
    {
      text: 'Wyoming LLC (est. 1-2 weeks)',
      template: 'none',
      docs: 'none',
      docType: 'Wyoming LLC (pending)',
      email: true,
      mission: false,
      message: 'We will contact you to provide options for registering a Wyoming LLC and the associated costs.',
    },
    {
      text: 'Delaware Unincorporated Nonprofit Association (formed instantly!)',
      template: <DelawareUNAtemplate />,
      docs: 'UNA',
      docType: 'Delaware UNA (instant)',
      email: false,
      mission: true,
      message: null,
    },
    {
      text: 'Swiss Verein (est. 1-2 months)',
      template: 'none',
      docs: 'none',
      docType: 'Swiss Verein (pending)',
      email: true,
      mission: false,
      message: 'We will contact you to provide options for registering a Swiss Verein and the associated costs.',
    },
    {
      text: 'Custom Entity Type (est. TBD)',
      template: 'none',
      docs: 'none',
      docType: 'Custom Entity Type (pending)',
      email: true,
      mission: false,
      message: 'We will contact you to provide options for your desired entity type and the associated costs.',
    },
  ]

  return (
    <>
      <Heading as="h2">What entity type do you want?</Heading>
      <Select onChange={handleChange} maxW={500}>
        <option value="999">Select an option</option>
        {options.map((item, index) => (
          <option key={index} value={index}>
            {item.text}
          </option>
        ))}
      </Select>
      {options[selected] != undefined && options[selected].template != 'none' ? (
        <>
          <HStack>
            <Button onClick={onOpen}>View Template</Button>
            <InfoTip
              label={
                "This is the document that will be deployed as your DAO's governance document.  Please review carefully before deploying."
              }
            />{' '}
          </HStack>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Template</ModalHeader>
              <ModalCloseButton />
              <ModalBody>{options[selected].template}</ModalBody>
            </ModalContent>
          </Modal>
        </>
      ) : null}

      {options[selected] != undefined && options[selected].mission != false ? (
        <>
          <Divider />
          <HStack>
            <Text>
              <b>Add a link to a document or website which states your DAO's mission.</b>
            </Text>
            <InfoTip
              label={
                "Members of an UNA must have a common, nonprofit purpose. Memorializing your DAO's mission in your governance document will help keep all members aligned on the same nonprofit purpose."
              }
            />{' '}
          </HStack>
          <Text>(We will incorporate this into your UNA document.)</Text>
          <Input onChange={setMission} maxW={400} />
        </>
      ) : null}

      {options[selected] != undefined && options[selected].email != false ? (
        <>
          <Divider />
          <HStack>
            <Text>
              <b>Your Email Address</b>
            </Text>
            <InfoTip label={options[selected].message} />{' '}
          </HStack>
          <Text>Please provide your email address so we can follow up with you on next steps.</Text>
          <Input onChange={setEmail} maxW={400} />
        </>
      ) : null}

      {selected == 999 ? null : <Button onClick={() => handleNext()}>Next</Button>}
    </>
  )
}
