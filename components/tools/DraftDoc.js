import React, { useState, useEffect, useRef } from "react"
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
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { PDFDownloadLink } from "@react-pdf/renderer"
import DelawareOAtemplate from "../legal/DelawareOAtemplate"
import DelawareInvestmentClubTemplate from "../legal/DelawareInvestmentClubTemplate"
import WyomingOAtemplate from "../legal/WyomingOAtemplate"

function DraftDoc() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { handleSubmit, register, reset } = useForm()
  const [selection, setSelection] = useState("")
  const [deLlcForm, setDeLlcForm] = useState(false)
  const [deIcForm, setDeIcForm] = useState(false)
  const [wyLlcForm, setWyLlcForm] = useState(false)
  const [delawareLlc, setDelawareLlc] = useState({})
  const [delawareIc, setDelawareIc] = useState({})
  const [wyomingLlc, setWyomingLlc] = useState({})

  const generateDoc = (values) => {
    values.agreement = selection
    switch (selection) {
      case "delaware-llc":
        setDelawareLlc({
          name: values.name,
          chain: values.chain,
          date: values.date,
          ethAddress: values.ethAddress,
          arbitrator: values.arbitrator,
        })
        setDeLlcForm(true)
      case "delaware-ic":
        setDelawareIc({
          name: values.name,
          chain: values.chain,
        })
        setDeIcForm(true)
      case "wyoming-llc":
        setWyomingLlc({
          name: values.name,
          date: values.date,
          email: values.email,
          ethAddress: values.ethAddress,
          id: values.id,
        })
        setWyLlcForm(true)
    }

    console.log(values)
  }

  useEffect(() => {
    console.log(selection)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection])

  return (
    <>
      <Button className="transparent-btn" onClick={onOpen}>
        Draft
      </Button>
      <Drawer isOpen={isOpen} placement="right" size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>✂️</DrawerHeader>
          <DrawerBody>
            <Stack
              as="form"
              id="contact-form"
              onSubmit={handleSubmit(generateDoc)}
              spacing={2}
            >
              <FormControl>
                <FormLabel htmlFor="name">Select an agreement:</FormLabel>
                <Select
                  onChange={(e) => {
                    setSelection(e.target.value)
                    setDeLlcForm(false)
                    setDeIcForm(false)
                    setWyLlcForm(false)
                    reset()
                  }}
                  id="agreement"
                  placeholder="Select option"
                >
                  <option value="delaware-llc">Delaware LLC</option>
                  <option value="delaware-ic">Delaware Investment Club</option>
                  <option value="wyoming-llc">Wyoming LLC</option>
                </Select>
              </FormControl>
              {selection === "delaware-llc" && (
                <>
                  <FormControl isRequired>
                    <FormLabel mt={3} htmlFor="name">
                      DAO LLC Name
                    </FormLabel>
                    <Input
                      id="name"
                      placeholder="KALI"
                      {...register("name")}
                    />
                  
                    <FormLabel mt={3} htmlFor="chain">
                      Designated Blockchain
                    </FormLabel>
                    <Input
                      id="chain"
                      placeholder="Ethereum mainnet, Arbitrum, Matic, etc."
                      {...register("chain")}
                    />
                      <FormLabel mt={2} htmlFor="date">
                        Formation Date
                      </FormLabel>
                      <Input
                        id="date"
                        placeholder="MM/DD/YYYY"
                        {...register("date")}
                      />
                      <FormLabel mt={2} htmlFor="ethAddress">
                        DAO LLC Organizer Ethereum Address
                      </FormLabel>
                      <Input
                        id="ethAddress"
                        placeholder="0xKALI"
                        {...register("ethAddress")}
                      />
                      <FormLabel mt={2} htmlFor="arbitrator">
                        Arbitrator
                      </FormLabel>
                      <Input
                        id="arbitrator"
                        placeholder="JAMS, LexDAO, etc."
                        {...register("arbitrator")}
                      />
                  </FormControl>
                </>
              )}
              {selection === "delaware-ic" && (
                <>
                  <FormControl isRequired>
                    <FormLabel mt={3} htmlFor="name">
                      DAO LLC NAME
                    </FormLabel>
                    <Input
                      id="name"
                      placeholder="KALI"
                      {...register("name")}
                    />
                    <FormLabel mt={2} htmlFor="chain">
                      Designated Blockchain
                    </FormLabel>
                    <Input
                      id="chain"
                      placeholder="Ethereum mainnet, Arbitrum, Matic, etc."
                      {...register("chain")}
                    />
                  </FormControl>
                </>
              )}
              {selection === "wyoming-llc" && (
                <>
                  <FormControl isRequired>
                    <FormLabel mt={3} htmlFor="name">
                      DAO LLC Name
                    </FormLabel>
                    <Input
                      id="name"
                      placeholder="KALI"
                      {...register("name")}
                    />
                    <FormLabel mt={2} htmlFor="date">
                      Formation Date
                    </FormLabel>
                    <Input
                      id="date"
                      placeholder="MM/DD/YYYY"
                      {...register("date")}
                    />
                      <FormLabel mt={2} htmlFor="subject">
                        DAO LLC Organizer Email
                      </FormLabel>
                      <Input
                        id="email"
                        placeholder="kalidao@protonmail.com"
                        {...register("email")}
                      />
                      <FormLabel mt={2} htmlFor="ethAddress">
                        DAO LLC Organizer EthAddress
                      </FormLabel>
                      <Input
                        id="ethAddress"
                        placeholder="0xKALI"
                        {...register("ethAddress")}
                      />
                  
                      <FormLabel mt={2} htmlFor="id">
                        Books and Records
                      </FormLabel>
                      <Input
                        id="id"
                        placeholder="Enter IPFS hash"
                        {...register("id")}
                      />
                  </FormControl>
                </>
              )}
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            {(deLlcForm && (
              <PDFDownloadLink
                document={
                  <DelawareOAtemplate
                    name={delawareLlc.name}
                    chain={delawareLlc.chain}
                    date={delawareLlc.date}
                    ethAddress={delawareLlc.ethAddress}
                    arbitrator={delawareLlc.arbitrator}
                  />
                }
                fileName="Delaware Opearting Agreement"
              >
                {({ loading }) =>
                  loading ? (
                    <Button mr={3}>Loading Document...</Button>
                  ) : (
                    <Button mr={3}>Download</Button>
                  )
                }
              </PDFDownloadLink>
            )) ||
              (deIcForm && (
                <PDFDownloadLink
                  document={
                    <DelawareInvestmentClubTemplate
                      name={delawareIc.name}
                      chain={delawareIc.chain}
                    />
                  }
                  fileName="Delaware Investment Club"
                >
                  {({ loading }) =>
                    loading ? (
                      <Button mr={3}>Loading Document...</Button>
                    ) : (
                      <Button mr={3}>Download</Button>
                    )
                  }
                </PDFDownloadLink>
              )) ||
              (wyLlcForm && (
                <PDFDownloadLink
                  document={
                    <WyomingOAtemplate
                      name={wyomingLlc.name}
                      date={wyomingLlc.date}
                      email={wyomingLlc.email}
                      ethAddress={wyomingLlc.ethAddress}
                      id={wyomingLlc.id}
                    />
                  }
                  fileName="Wyoming Operating Agreement"
                >
                  {({ loading }) =>
                    loading ? (
                      <Button mr={3}>Loading Document...</Button>
                    ) : (
                      <Button mr={3}>Download</Button>
                    )
                  }
                </PDFDownloadLink>
              ))}
            {}
            {}
            <Button type="submit" form="contact-form" mr={3}>
              Draft
            </Button>
            <Button variant="outline" onClick={() => {onClose(), reset(), setSelection("")}}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default DraftDoc
