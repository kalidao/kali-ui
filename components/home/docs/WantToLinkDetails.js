import React, { useState, useContext, useEffect } from 'react'
import AppContext from '../../../context/AppContext'
import { VStack, HStack, Button, Text, Link, Input, Heading, Icon, FormControl, FormLabel } from '@chakra-ui/react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import Select from '../../elements/Select'
import DateSelect from '../../elements/DateSelect'
import InfoTip from '../../elements/InfoTip'

export default function WantToLinkDetails({ setActive, details, setDetails, handleNext }) {
  const value = useContext(AppContext)
  const { web3, chainId, loading, account } = value.state

  const handleNo = () => {
    details['legal']['docs'] = 'none'
    details['legal']['docType'] = 'none'
    handleNext()
  }

  return (
    <>
      <VStack>
        <Heading as="h2">Want to link details to your DAO dashboard?</Heading>
        <HStack>
          <Button onClick={() => setActive(3)}>Yes!</Button>
          <Button onClick={() => handleNo()}>Not yet!</Button>
        </HStack>
        <Text>(Don't worry, you can do this some other time)</Text>
      </VStack>
    </>
  )
}
