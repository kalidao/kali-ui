import React, { useContext } from "react";
import AppContext from "../../context/AppContext"
import kaliNFT from "../../eth/kaliNFT.js";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  HStack
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import InfoTip from "../elements/InfoTip"
// import fleek from "@fleekhq/fleek-storage-js";

function NftForm() {
  const value = useContext(AppContext);
  const { web3, account, loading, dao } = value.state;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // votingPeriod: details["governance"]["votingPeriod"],
      // votingPeriodUnit: 0,
    },
  })

  // Upload file to Fleek Storage
  // const upload = async (values) => {
  //   const input = {
  //     apiKey: process.env.REACT_APP_FLEEK_API_KEY,
  //     apiSecret: process.env.REACT_APP_FLEEK_API_SECRET,
  //     bucket: "f4a2a9f1-7442-4cf2-8b0e-106f14be163b-bucket",
  //     key: values.title,
  //     data: values.file,
  //     httpUploadProgressCallback: (event) => {
  //       console.log(Math.round((event.loaded / event.total) * 100) + "% done");
  //     },
  //   };

  //   try {
  //     const result = await fleek.upload(input);
  //     console.log("Image hash from Fleek: " + result.hash);

  //     // Construct NFT metadata
  //     const date = new Date();
  //     const timestamp = date.getTime();
  //     const metadata = {
  //       title: values.title,
  //       description: values.desc,
  //       image: result.hash,
  //       createdAt: timestamp,
  //     };

  //     return metadata;
  //   } catch (e) {
  //     console.log("Error: " + e);
  //     alert(e);
  //   }
  // };

  // ----- Upload metadata to Fleek Storage
  // const uploadMetadata = async (metadata) => {
  //   const data = JSON.stringify(metadata);
  //   const input = {
  //     apiKey: process.env.REACT_APP_FLEEK_API_KEY,
  //     apiSecret: process.env.REACT_APP_FLEEK_API_SECRET,
  //     bucket: "f4a2a9f1-7442-4cf2-8b0e-106f14be163b-bucket",
  //     key: metadata.image,
  //     data,
  //   };

  //   try {
  //     // Uplaod tokenUri to Fleek
  //     const result = await fleek.upload(input);
  //     console.log("Metadata hash from Fleek: " + result.hash);

  //     return result.hash;
  //   } catch (e) {
  //     console.log("Error: " + e, i);
  //   }
  // };

  // const handleSubmit = async (values) => {
  //   const tokenId = await kaliNFT.methods.totalSupply().call();
  //   const metadata = await upload(values);
  //   const tokenUri = await uploadMetadata(metadata);

  //   try {
  //     let result = await kaliNFT.methods
  //       .mint(dao, tokenId, tokenUri)
  //       .send({ from: account });

  //     console.log("This is the result", result);
  //   } catch (e) {
  //     alert(e);
  //     console.log(e);
  //   }
  // };

  const submit = (values) => {
    const { name, symbol } = values

    console.log("hi")
  }

  return (
    <VStack as="form" onSubmit={handleSubmit(submit)}>
      <br/>
      <Heading as="h1">Mint an NFT</Heading>
      <FormControl>
        <FormLabel htmlFor="symbol" fontSize="m" fontWeight="500">
          Owner
        </FormLabel>
        <HStack>
          <Input
            name="owner"
            {...register("owner", {
              required: "Owner is required.",
            })}
          />
          <InfoTip hasArrow label={"Token will be minted to this address"} />
        </HStack>
        {errors.symbol && value.toast(errors.symbol.message)}
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="name" fontSize="m" fontWeight="500">
          Name
        </FormLabel>
        <HStack>
          <Input
            name="name"
            {...register("name", {
              required: true,
            })}
          />
          <InfoTip
            hasArrow
            label={
              "Give your DAO a name, which will also be the name of the DAO token"
            }
          />
        </HStack>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="symbol" fontSize="m" fontWeight="500">
          Symbol
        </FormLabel>
        <HStack>
          <Input
            name="symbol"
            {...register("symbol", {
              required: "Symbol is required.",
              maxLength: {
                value: 12,
                message: "Symbol shouldn't be greater than 12 characters.",
              },
            })}
          />
          <InfoTip hasArrow label={"Symbol of DAO token"} />
        </HStack>
        {errors.symbol && value.toast(errors.symbol.message)}
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="symbol" fontSize="m" fontWeight="500">
          Total Supply
        </FormLabel>
        <HStack>
          <Input
            name="symbol"
            {...register("supply", {
              required: "Total supply is required.",
            })}
          />
          <InfoTip hasArrow label={"Total supply of ERC20 token"} />
        </HStack>
        {errors.symbol && value.toast(errors.symbol.message)}
      </FormControl>
      <Button className="transparent-btn" type="submit">
        Mint »
      </Button>
    </VStack>
    // <>
    //   <Formik
    //     initialValues={initialValues}
    //     validationSchema={validationSchema}
    //     onSubmit={handleNftSubmit}
    //   >
    //     {({ setFieldValue }) => (
    //       <Form>
    //         <FormikControl
    //           control="input"
    //           type="text"
    //           label="Title"
    //           name="title"
    //           placeholder="Title of NFT"
    //         />
    //         <FormikControl
    //           control="textarea"
    //           type="text"
    //           label="Description"
    //           name="desc"
    //           placeholder="Description for NFT"
    //         />
    //         <br />
    //         <input
    //           id="file"
    //           name="file"
    //           type="file"
    //           onChange={(event) => {
    //             setFieldValue("file", event.target.files[0]);
    //           }}
    //         />
    //         <br />
    //         <br />
    //         <Button type="submit">Summon</Button>
    //       </Form>
    //     )}
    //   </Formik>
    // </>
  );
}

export default NftForm;
