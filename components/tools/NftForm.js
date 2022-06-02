import React, { useState } from 'react'
import kaliNFT from '../../eth/kaliNFT.js'
import { useForm } from 'react-hook-form'
import Tip from '../elements/Tip'
import fleek from '@fleekhq/fleek-storage-js'
import { addresses } from '../../constants/addresses'
import { Flex, Box, Button, Text } from '../../styles/elements/'
import { Input } from '../../styles/form-elements/'
function NftForm() {
  const [file, setFile] = useState('')
  const [isMinted, setIsMinted] = useState(false)

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      recipient: '',
    },
  })

  const resolveAddressAndEns = async (ens) => {
    let address

    if (ens.slice(-4) === '.eth') {
      address = await web3.eth.ens.getAddress(ens).catch(() => {
        value.toast(ens + ' is not a valid ENS.')
      })
    } else if (web3.utils.isAddress(ens) == false) {
      value.toast(ens + ' is not a valid Ethereum address.')
      return
    } else {
      address = ens
    }

    if (ens === undefined) {
      return
    }

    return address
  }

  // Upload file to Fleek Storage
  const upload = async () => {
    console.log(file)
    const input = {
      apiKey: process.env.NEXT_PUBLIC_FLEEK_API_KEY,
      apiSecret: process.env.NEXT_PUBLIC_FLEEK_API_SECRET,
      bucket: 'f4a2a9f1-7442-4cf2-8b0e-106f14be163b-bucket',
      key: file.name,
      data: file,
      httpUploadProgressCallback: (event) => {
        console.log(Math.round((event.loaded / event.total) * 100) + '% done')
      },
    }

    try {
      const result = await fleek.upload(input)
      console.log('Image hash from Fleek: ' + result.hash)

      // Construct NFT metadata
      const date = new Date()
      const timestamp = date.getTime()
      const metadata = {
        title: file.name,
        file: result.hash,
        createdAt: timestamp,
      }

      return metadata
      value.setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  // ----- Upload metadata to Fleek Storage
  const uploadMetadata = async (metadata) => {
    const data = JSON.stringify(metadata)
    const input = {
      apiKey: process.env.NEXT_PUBLIC_FLEEK_API_KEY,
      apiSecret: process.env.NEXT_PUBLIC_FLEEK_API_SECRET,
      bucket: 'f4a2a9f1-7442-4cf2-8b0e-106f14be163b-bucket',
      key: account + ' ' + file.name,
      data,
    }

    try {
      // Uplaod tokenUri to Fleek
      const result = await fleek.upload(input)
      console.log('Metadata hash from Fleek: ' + result.hash)

      return result.hash
    } catch (e) {
      console.log('Error: ' + e)
    }
  }

  const submit = async (values) => {
    const owner = values.recipient
    owner = await resolveAddressAndEns(owner)

    const nft = await kaliNFT(addresses[chainId]['nft'], web3)
    const tokenId = await nft.methods.totalSupply().call()
    const metadata = await upload()
    const tokenUri = await uploadMetadata(metadata)

    value.setLoading(true)
    try {
      let result = await nft.methods.mint(owner, tokenId++, tokenUri).send({ from: account })

      console.log('This is the result', result)
      setIsMinted(true)
      value.setLoading(false)
    } catch (e) {
      alert(e)
      console.log(e)
      value.setLoading(false)
    }
  }

  return (
    <Flex w="50%" as="form" onSubmit={handleSubmit(submit)}>
      <br />
      <Text as="h1" variant="heading">
        Mint an NFT
      </Text>
      <Flex w="100%" align="flex-start">
        <Flex>
          <label>Recipient</label>
          <Tip label={'Token will be minted to this recipient address'} />
        </Flex>
        <Input
          name="recipient"
          placeholder="0xKALI or ENS"
          {...register('recipient', {
            required: 'Recipient is required.',
          })}
        />
        {errors.recipient && value.toast(errors.recipient.message)}
      </Flex>
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
    </Flex>
  )
}

export default NftForm
