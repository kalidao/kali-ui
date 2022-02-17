import React, { useState, useContext } from "react";
import AppContext from "../../context/AppContext"
import kaliNFT from "../../eth/kaliNFT.js";
import {
  Button,
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  HStack
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import InfoTip from "../elements/InfoTip"
import fleek from "@fleekhq/fleek-storage-js";
import { addresses } from "../../constants/addresses"


function NftForm() {
  const value = useContext(AppContext)
  const { web3, account, chainId } = value.state
  const [file, setFile] = useState("")
  const [isMinted, setIsMinted] = useState(false)

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      recipient: "",
    },
  })

  // Upload file to Fleek Storage
  const upload = async () => {
    const input = {
      apiKey: process.env.NEXT_PUBLIC_FLEEK_API_KEY,
      apiSecret: process.env.NEXT_PUBLIC_FLEEK_API_SECRET,
      bucket: "f4a2a9f1-7442-4cf2-8b0e-106f14be163b-bucket",
      key: file.name,
      data: file,
      httpUploadProgressCallback: (event) => {
        console.log(Math.round((event.loaded / event.total) * 100) + "% done")
      },
    }

    try {
      const result = await fleek.upload(input);
      console.log("Image hash from Fleek: " + result.hash);

      // Construct NFT metadata
      const date = new Date();
      const timestamp = date.getTime();
      const metadata = {
        title: file.name,
        file: result.hash,
        createdAt: timestamp,
      };

      return metadata;
    } catch (e) {
      console.log(e);
    }
  };

  // ----- Upload metadata to Fleek Storage
  const uploadMetadata = async (metadata) => {
    const data = JSON.stringify(metadata);
    const input = {
      apiKey: process.env.NEXT_PUBLIC_FLEEK_API_KEY,
      apiSecret: process.env.NEXT_PUBLIC_FLEEK_API_SECRET,
      bucket: "f4a2a9f1-7442-4cf2-8b0e-106f14be163b-bucket",
      key: account + file.name,
      data,
    }

    try {
      // Uplaod tokenUri to Fleek
      const result = await fleek.upload(input);
      console.log("Metadata hash from Fleek: " + result.hash);

      return result.hash;
    } catch (e) {
      console.log("Error: " + e);
    }
  };

  const submit = async (values) => {
    console.log("hey")
    const nft = await kaliNFT(addresses[chainId]["nft"], web3)

    const tokenId = await nft.methods.totalSupply().call();
    const metadata = await upload();
    const tokenUri = await uploadMetadata(metadata);

    try {
      let result = await nft.methods
        .mint(values.recipient, tokenId++, tokenUri)
        .send({ from: account });

      console.log("This is the result", result);
      setIsMinted(true)
    } catch (e) {
      alert(e);
      console.log(e);
    }
  };

  return (
    <VStack w="50%" as="form" onSubmit={handleSubmit(submit)}>
      <br />
      <Heading as="h1">Mint an NFT</Heading>
      <VStack w="100%" align="flex-start">
        <HStack>

        <label>Recipient</label>
        <InfoTip
          hasArrow
          label={"Token will be minted to this recipient address"}
        />
        </HStack>
          <Input
            name="recipient"
            placeholder="0xKALI or ENS"
            {...register("recipient", {
              required: "Recipient is required.",
            })}
          />
        {errors.recipient && value.toast(errors.recipient.message)}
      </VStack>
      <Box w="100%" pt="10px">

      <input
        id="file"
        name="file"
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0])
        }}
      />
      </Box>
      {isMinted && <label>Minted!</label>}
      <Button className="transparent-btn" type="submit">
        Mint »
      </Button>
    </VStack>
  )
}

export default NftForm;
