import React, { useState, useEffect, useRef } from 'react'
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  FormControl,
  FormLabel,
  Input,
  DrawerFooter,
  Stack,
  useDisclosure,
  Textarea,
  Select,
  VStack,
  Link,
  Text,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { PDFDownloadLink } from '@react-pdf/renderer'
import DelawareOAtemplate from '../legal/DelawareOAtemplate'
import DelawareInvestmentClubTemplate from '../legal/DelawareInvestmentClubTemplate'
import DelawareUNAtemplate from '../legal/DelawareUNAtemplate'
import WyomingOAtemplate from '../legal/WyomingOAtemplate'
import SwissVerein from '../legal/SwissVerein'
import ServicesAgreement from '../legal/ops/ServicesAgreement'

function DraftDoc() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { handleSubmit, register, reset } = useForm()
  const [selection, setSelection] = useState('')

  // Toggle Legal Form
  const [deLlcForm, setDeLlcForm] = useState(false)
  const [deIcForm, setDeIcForm] = useState(false)
  const [deUnaForm, setDeUnaForm] = useState(false)
  const [wyLlcForm, setWyLlcForm] = useState(false)
  const [swissVereinForm, setSwissVereinForm] = useState(false)
  const [servicesForm, setServicesForm] = useState(false)

  // State per Legal Form
  const [delawareLlc, setDelawareLlc] = useState({})
  const [delawareIc, setDelawareIc] = useState({})
  const [delawareUna, setDelawareUna] = useState({})
  const [wyomingLlc, setWyomingLlc] = useState({})
  const [swissVerein, setSwissVerein] = useState({})
  const [services, setServices] = useState({})

  const generateDoc = (values) => {
    values.agreement = selection
    switch (selection) {
      case 'delaware-llc':
        setDelawareLlc({
          name: values.name,
          chain: values.chain,
        })
        setDeLlcForm(true)
        break
      case 'delaware-ic':
        setDelawareIc({
          name: values.name,
          chain: values.chain,
        })
        setDeIcForm(true)
        break
      case 'delaware-una':
        setDelawareUna({
          name: values.name,
          chain: values.chain,
          mission: values.mission,
        })
        setDeUnaForm(true)
        break
      case 'wyoming-llc':
        setWyomingLlc({
          name: values.name,
          chain: values.chain,
        })
        setWyLlcForm(true)
        break
      case 'swiss-verein':
        setSwissVerein({
          name: values.name,
          city: values.city,
          project: values.project,
          mission: values.mission,
        })
        setSwissVereinForm(true)
        break
      case 'services':
        setServices({
          customerEthAddress: values.customerEthAddress,
          serviceProviderEthAddress: values.serviceProviderEthAddress,
          service: values.service,
          serviceToken: values.serviceToken,
        })
        setServicesForm(true)
        break
    }

    console.log(values)
  }

  useEffect(() => {
    console.log(selection)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection])

  return (
    <>
      <Button
        className="transparent-btn"
        onClick={onOpen}
        display={{
          sm: 'none',
          md: 'block',
          lg: 'block',
          xl: 'lg',
          '2xl': 'block',
        }}
        margin="0px 5px !important"
      >
        Draft
      </Button>
      <Drawer isOpen={isOpen} placement="right" size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>✍️</DrawerHeader>
          <DrawerBody>
            <Stack as="form" id="contact-form" onSubmit={handleSubmit(generateDoc)} spacing={2}>
              <FormControl>
                <FormLabel htmlFor="name">Select an agreement:</FormLabel>
                <Select
                  onChange={(e) => {
                    setSelection(e.target.value)
                    reset()
                  }}
                  id="agreement"
                  placeholder="Select option"
                >
                  <option value="delaware-llc">Delaware DAO LLC</option>
                  <option value="wyoming-llc">Wyoming DAO LLC</option>
                  <option value="delaware-ic">Investment Club</option>
                  <option value="delaware-una">UNA</option>
                  <option value="swiss-verein">Swiss Verein</option>
                  <option value="services">Services Agreement</option>
                </Select>
              </FormControl>
              {selection === 'delaware-llc' && (
                <>
                  <FormControl isRequired>
                    <FormLabel mt={3} htmlFor="name">
                      DAO LLC Name
                    </FormLabel>
                    <Input id="name" placeholder="KALI" {...register('name')} />
                    <FormLabel mt={3} htmlFor="chain">
                      Designated Blockchain
                    </FormLabel>
                    <Input id="chain" placeholder="Ethereum, Arbitrum, Polygon, etc." {...register('chain')} />
                  </FormControl>
                </>
              )}
              {selection === 'delaware-ic' && (
                <>
                  <FormControl isRequired>
                    <FormLabel mt={3} htmlFor="name">
                      DAO LLC NAME
                    </FormLabel>
                    <Input id="name" placeholder="KALI" {...register('name')} />
                    <FormLabel mt={2} htmlFor="chain">
                      Designated Blockchain
                    </FormLabel>
                    <Input id="chain" placeholder="Ethereum, Arbitrum, Polygon, etc." {...register('chain')} />
                  </FormControl>
                </>
              )}
              {selection === 'wyoming-llc' && (
                <>
                  <FormControl isRequired>
                    <FormLabel mt={3} htmlFor="name">
                      DAO LLC Name
                    </FormLabel>
                    <Input id="name" placeholder="KALI" {...register('name')} />
                    <FormLabel mt={3} htmlFor="chain">
                      Designated Blockchain
                    </FormLabel>
                    <Input id="chain" placeholder="Ethereum, Arbitrum, Polygon, etc." {...register('chain')} />
                  </FormControl>
                </>
              )}
              {selection === 'delaware-una' && (
                <>
                  <FormControl isRequired>
                    <FormLabel mt={3} htmlFor="name">
                      UNA Name
                    </FormLabel>
                    <Input id="name" placeholder="KALI" {...register('name')} />
                    <FormLabel mt={3} htmlFor="chain">
                      Designated Blockchain
                    </FormLabel>
                    <Input id="chain" placeholder="Ethereum, Arbitrum, Polygon, etc." {...register('chain')} />
                    <FormLabel mt={3} htmlFor="mission">
                      Link to DAO Mission
                    </FormLabel>
                    <Input id="mission" placeholder="mission" {...register('mission')} />
                  </FormControl>
                </>
              )}
              {selection === 'swiss-verein' && (
                <>
                  <FormControl isRequired>
                    <FormLabel mt={3} htmlFor="name">
                      Verein Name
                    </FormLabel>
                    <Input id="name" placeholder="KALI" {...register('name')} />
                    <FormLabel mt={3} htmlFor="city">
                      City of Switzerland
                    </FormLabel>
                    <Input id="city" placeholder="Zug" {...register('city')} />
                    <FormLabel mt={3} htmlFor="project">
                      Project Name
                    </FormLabel>
                    <Input id="project" placeholder="name of your project" {...register('project')} />
                    <FormLabel mt={3} htmlFor="mission">
                      Link to DAO Mission
                    </FormLabel>
                    <Input id="mission" placeholder="URL" {...register('mission')} />
                    <Text mt={5} align="center" htmlFor="mission">
                      <Link href="http://app.kalidao.xyz">
                        <i>Need help with Swiss Verein?</i>
                      </Link>
                    </Text>
                  </FormControl>
                </>
              )}
              {selection === 'services' && (
                <>
                  <FormControl isRequired>
                    <FormLabel mt={3} htmlFor="customerEthAddress">
                      Customer ETH Address
                    </FormLabel>
                    <Input id="customerEthAddress" placeholder="0xKALI" {...register('customerEthAddress')} />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel mt={3} htmlFor="serviceProviderEthAddress">
                      Service Provider ETH Address
                    </FormLabel>
                    <Input
                      id="serviceProviderEthAddress"
                      placeholder="0xKALI"
                      {...register('serviceProviderEthAddress')}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel mt={3} htmlFor="service">
                      Service to be Rendered
                    </FormLabel>
                    <Input id="service" placeholder="Token Contract" {...register('service')} />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel mt={3} htmlFor="serviceToken">
                      Service Token
                    </FormLabel>
                    <Input id="serviceToken" placeholder="Token Contract" {...register('serviceToken')} />
                  </FormControl>
                </>
              )}
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            {(deLlcForm && (
              <PDFDownloadLink
                document={<DelawareOAtemplate name={delawareLlc.name} chain={delawareLlc.chain} />}
                fileName="Delaware DAO LLC Operating Agreement"
              >
                {({ loading }) =>
                  loading ? <Button mr={3}>Loading Document...</Button> : <Button mr={3}>Download</Button>
                }
              </PDFDownloadLink>
            )) ||
              (deIcForm && (
                <PDFDownloadLink
                  document={<DelawareInvestmentClubTemplate name={delawareIc.name} chain={delawareIc.chain} />}
                  fileName="Investment Club DAO LLC Operating Agreement"
                >
                  {({ loading }) =>
                    loading ? <Button mr={3}>Loading Document...</Button> : <Button mr={3}>Download</Button>
                  }
                </PDFDownloadLink>
              )) ||
              (deUnaForm && (
                <PDFDownloadLink
                  document={
                    <DelawareUNAtemplate
                      name={delawareUna.name}
                      chain={delawareUna.chain}
                      mission={delawareUna.mission}
                    />
                  }
                  fileName="Delaware UNA Agreement"
                >
                  {({ loading }) =>
                    loading ? <Button mr={3}>Loading Document...</Button> : <Button mr={3}>Download</Button>
                  }
                </PDFDownloadLink>
              )) ||
              (wyLlcForm && (
                <PDFDownloadLink
                  document={<WyomingOAtemplate name={wyomingLlc.name} chain={wyomingLlc.chain} />}
                  fileName="Wyoming DAO LLC Operating Agreement"
                >
                  {({ loading }) =>
                    loading ? <Button mr={3}>Loading Document...</Button> : <Button mr={3}>Download</Button>
                  }
                </PDFDownloadLink>
              )) ||
              (swissVereinForm && (
                <PDFDownloadLink
                  document={
                    <SwissVerein
                      name={swissVerein.name}
                      city={swissVerein.city}
                      project={swissVerein.project}
                      mission={swissVerein.mission}
                    />
                  }
                  fileName="Swiss Verein Article of Association"
                >
                  {({ loading }) =>
                    loading ? <Button mr={3}>Loading Document...</Button> : <Button mr={3}>Download</Button>
                  }
                </PDFDownloadLink>
              )) ||
              (servicesForm && (
                <PDFDownloadLink
                  document={
                    <ServicesAgreement
                      customerEthAddress={services.customerEthAddress}
                      serviceProviderEthAddress={services.serviceProviderEthAddress}
                      service={services.service}
                      serviceToken={services.serviceToken}
                    />
                  }
                  fileName="Services Agreement"
                >
                  {({ loading }) =>
                    loading ? <Button mr={3}>Loading Document...</Button> : <Button mr={3}>Download</Button>
                  }
                </PDFDownloadLink>
              ))}
            {}
            {}
            <Button type="submit" form="contact-form" mr={3}>
              Draft
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                onClose(), reset(), setSelection('')
              }}
            >
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default DraftDoc
