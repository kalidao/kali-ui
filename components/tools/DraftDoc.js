import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { PDFDownloadLink } from '@react-pdf/renderer'
import DelawareOAtemplate from '../legal/DelawareOAtemplate'
import DelawareInvestmentClubTemplate from '../legal/DelawareInvestmentClubTemplate'
import DelawareUNAtemplate from '../legal/DelawareUNAtemplate'
import WyomingOAtemplate from '../legal/WyomingOAtemplate'
import SwissVerein from '../legal/SwissVerein'
import { Button, Flex, Text } from '../../styles/elements/'
import { Label, Input } from '../../styles/form-elements/'

function DraftDoc() {
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
      <Flex as="form" id="contact-form" onSubmit={handleSubmit(generateDoc)} gap="md" dir="col">
        <Flex dir="row" align="separate">
          <Label htmlFor="name">Select an agreement:</Label>
          <select
            onChange={(e) => {
              setSelection(e.target.value)
              setDeLlcForm(false)
              setDeIcForm(false)
              setDeUnaForm(false)
              setWyLlcForm(false)
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
          </select>
        </Flex>
        {selection === 'delaware-llc' && (
          <Flex dir="col">
            <Flex dir="row" align="separate">
              <Label mt={3} htmlFor="name">
                DAO LLC Name
              </Label>
              <Input id="name" placeholder="KALI" {...register('name')} />
            </Flex>
            <Flex dir="row" align="separate">
              <Label mt={3} htmlFor="chain">
                Designated Blockchain
              </Label>
              <Input id="chain" placeholder="Ethereum, Arbitrum, Polygon, etc." {...register('chain')} />
            </Flex>
          </Flex>
        )}
        {selection === 'delaware-ic' && (
          <Flex dir="col" gap="md">
            <Flex dir="row" align="separate">
              <Label mt={3} htmlFor="name">
                DAO LLC NAME
              </Label>
              <Input id="name" placeholder="KALI" {...register('name')} />
            </Flex>
            <Flex dir="row" align="separate">
              <Label mt={2} htmlFor="chain">
                Designated Blockchain
              </Label>
              <Input id="chain" placeholder="Ethereum, Arbitrum, Polygon, etc." {...register('chain')} />
            </Flex>
          </Flex>
        )}
        {selection === 'wyoming-llc' && (
          <Flex>
            <Label mt={3} htmlFor="name">
              DAO LLC Name
            </Label>
            <Input id="name" placeholder="KALI" {...register('name')} />
            <Label mt={3} htmlFor="chain">
              Designated Blockchain
            </Label>
            <Input id="chain" placeholder="Ethereum, Arbitrum, Polygon, etc." {...register('chain')} />
          </Flex>
        )}
        {selection === 'delaware-una' && (
          <Flex>
            <Label mt={3} htmlFor="name">
              UNA Name
            </Label>
            <Input id="name" placeholder="KALI" {...register('name')} />
            <Label mt={3} htmlFor="chain">
              Designated Blockchain
            </Label>
            <Input id="chain" placeholder="Ethereum, Arbitrum, Polygon, etc." {...register('chain')} />
            <Label mt={3} htmlFor="mission">
              Link to DAO Mission
            </Label>
            <Input id="mission" placeholder="mission" {...register('mission')} />
          </Flex>
        )}
        {selection === 'swiss-verein' && (
          <Flex>
            <Label mt={3} htmlFor="name">
              Verein Name
            </Label>
            <Input id="name" placeholder="KALI" {...register('name')} />
            <Label mt={3} htmlFor="city">
              City of Switzerland
            </Label>
            <Input id="city" placeholder="Zug" {...register('city')} />
            <Label mt={3} htmlFor="project">
              Project Name
            </Label>
            <Input id="project" placeholder="name of your project" {...register('project')} />
            <Label mt={3} htmlFor="mission">
              Link to DAO Mission
            </Label>
            <Input id="mission" placeholder="URL" {...register('mission')} />
            <Text mt={5} align="center" htmlFor="mission">
              <a href="http://app.kalidao.xyz">
                <i>Need help with Swiss Verein?</i>
              </a>
            </Text>
          </Flex>
        )}
      </Flex>
      {(deLlcForm && (
        <PDFDownloadLink
          document={<DelawareOAtemplate name={delawareLlc.name} chain={delawareLlc.chain} />}
          fileName="Delaware DAO LLC Operating Agreement"
        >
          {({ loading }) => (loading ? <Button mr={3}>Loading Document...</Button> : <Button mr={3}>Download</Button>)}
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
              <DelawareUNAtemplate name={delawareUna.name} chain={delawareUna.chain} mission={delawareUna.mission} />
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
        ))}
      {}
      {}
      <Button type="submit" form="contact-form" mr={3}>
        Draft
      </Button>
    </>
  )
}

export default DraftDoc
