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
          chain: values.chain,
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
      <Button
        className="transparent-btn" onClick={onOpen}
        display={{sm: 'none', md: 'block', lg: 'block', xl: 'lg', '2xl': 'block'}}
        margin="0px 5px !important"
      >
        Draft
      </Button>
      <Drawer isOpen={isOpen} placement="right" size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>✍️</DrawerHeader>
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
                  <option value="delaware-llc">Delaware DAO LLC</option>
                  <option value="wyoming-llc">Wyoming DAO LLC</option>
                  <option value="delaware-ic">Investment Club</option>
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
                      placeholder="Ethereum, Arbitrum, Polygon, etc."
                      {...register("chain")}
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
                      placeholder="Ethereum, Arbitrum, Polygon, etc."
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
                    <FormLabel mt={3} htmlFor="chain">
                      Designated Blockchain
                    </FormLabel>
                    <Input
                      id="chain"
                      placeholder="Ethereum, Arbitrum, Polygon, etc."
                      {...register("chain")}
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
                  />
                }
                fileName="Delaware DAO LLC Operating Agreement"
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
                  fileName="Investment Club DAO LLC Operating Agreement"
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
                      chain={wyomingLlc.chain}
                    />
                  }
                  fileName="Wyoming DAO LLC Operating Agreement"
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
