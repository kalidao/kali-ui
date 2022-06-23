import React, { useState, useEffect } from 'react'
import { useAccount, useNetwork, useContract, useContractRead, useSigner, erc721ABI } from 'wagmi'
import { Flex, Text, Button, Warning, Box, Image } from '../../../../styles/elements'
import { Form, FormElement, Label, Input, Select } from '../../../../styles/form-elements'
import { ethers } from 'ethers'
import FileUploader from '../../../tools/FileUpload'
import KALIDAO_ABI from '../../../../abi/KaliDAO.json'
import KALINFT_ABI from '../../../../abi/KaliNFT.json'
import { useRouter } from 'next/router'
import { isHolder } from '../../../../utils'
import { uploadIpfs } from '../../../tools/ipfsHelpers'
import Back from '../../../../styles/proposal/Back'
import { addresses } from '../../../../constants/addresses'
import { AddressZero } from '@ethersproject/constants'

export default function MintReal({ setProposal }) {
  const router = useRouter()
  const daoAddress = router.query.dao
  const daoChainId = router.query.chainId
  const { data: signer, isLoading } = useSigner()
  const { data: daoName } = useContractRead(
    {
      addressOrName: daoAddress,
      contractInterface: KALIDAO_ABI,
    },
    'name',
    {
      chainId: Number(daoChainId),
    },
  )
  const { data: totalSupply_, error } = useContractRead(
    {
      addressOrName: addresses[daoChainId]['nft'] ? addresses[daoChainId]['nft'] : AddressZero,
      contractInterface: KALINFT_ABI,
    },
    'totalSupply',
    {
      chainId: Number(daoChainId),
    },
  )

  // form
  const [title, setTitle] = useState(null)
  const [description, setDescription] = useState(null)
  const [externalUrl, setExternalUrl] = useState(null)
  const [classification, setClassification] = useState(null)
  const [location, setLocation] = useState(null)
  const [deed, setDeed] = useState(null)
  const [parcels, setParcels] = useState(null)
  const [owner, setOwner] = useState(null)
  const [kml, setKml] = useState(null)
  const [terms, setTerms] = useState('none')
  const [totalSupply, setTotalSupply] = useState(null)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [warning, setWarning] = useState()

  const buildMetadata = async () => {
    const date = new Date()
    const timestamp = date.getTime()

    if (title && description && classification && location && parcels && file) {
      const hash = await uploadIpfs(daoAddress, `KaliNFT #${totalSupply}`, file)
      const metadata = {
        title: title,
        description: description,
        classification: classification,
        externalUrl: externalUrl,
        location: location,
        deed: deed,
        parcels: parcels,
        owner: owner,
        kml: kml,
        terms: terms,
        image: hash,
        createdAt: timestamp,
      }
      setWarning(null)
      return metadata
    } else {
      setWarning('Please provide all information above.')
      return
    }
  }

  // Preview upload
  useEffect(() => {
    if (!file) {
      setPreview(null)
    }

    if (file) {
      const _preview = URL.createObjectURL(file)
      setPreview(_preview)

      return () => URL.revokeObjectURL(_preview)
    }
  }, [file])

  // Get KaliNFT total supply
  useEffect(() => {
    const getTotalSupply = async () => {
      console.log(signer, isLoading)
      try {
        const instance = new ethers.Contract(addresses[daoChainId]['nft'], KALINFT_ABI, signer)
        const _totalSupply = await instance.totalSupply()
        _totalSupply = ethers.utils.formatUnits(_totalSupply, 'wei')
        setTotalSupply(_totalSupply)
        setWarning(null)
      } catch (e) {
        setWarning('Error connecting to network.')
        console.log(e)
      }
    }
    getTotalSupply()
  }, [signer, isLoading])

  // TODO: Popup to change network if on different network from DAO
  const submit = async (e) => {
    e.preventDefault()

    const _totalSupply = ethers.utils.parseUnits(totalSupply, 'wei')
    const metadata = await buildMetadata()
    let tokenUri

    if (metadata) {
      const data = JSON.stringify(metadata)
      console.log(data)
      tokenUri = await uploadIpfs(daoAddress, `KaliNFT #${totalSupply} Metadata`, data)
    }

    try {
      const instance = new ethers.Contract(addresses[daoChainId]['nft'], KALINFT_ABI, signer)
      const tx = await instance.mint(daoAddress, _totalSupply, tokenUri)
      console.log('tx', tx)
    } catch (e) {
      console.log('error', e)
    }
  }

  return (
    <Flex dir="col" gap="md">
      <Text>Mint a real estate NFT to {daoName}</Text>
      <Form>
        <FormElement>
          <Label htmlFor="name">Name</Label>
          <Input name="contractAddress" type="text" defaultValue={title} onChange={(e) => setTitle(e.target.value)} />
        </FormElement>
        <FormElement variant="vertical">
          <Label htmlFor="description">Description</Label>
          <Input
            as="textarea"
            name="description"
            type="text"
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
            css={{ padding: '0.5rem', width: '97%', height: '10vh' }}
          />
        </FormElement>
        <FormElement>
          <Label htmlFor="description">External URL</Label>
          <Input
            name="location"
            type="text"
            defaultValue={externalUrl}
            onChange={(e) => setExternalUrl(e.target.value)}
          />
        </FormElement>
        <FormElement>
          <Label htmlFor="classification">Land Classification</Label>
          <Input
            name="classification"
            type="text"
            defaultValue={classification}
            onChange={(e) => setClassification(e.target.value)}
          />
        </FormElement>
        <FormElement>
          <Label htmlFor="location">Location</Label>
          <Input name="location" type="text" defaultValue={location} onChange={(e) => setLocation(e.target.value)} />
        </FormElement>
        <FormElement>
          <Label htmlFor="deed">Deed</Label>
          <Input name="deed" type="text" defaultValue={deed} onChange={(e) => setDeed(e.target.value)} />
        </FormElement>
        <FormElement>
          <Label htmlFor="parcels">Parcels</Label>
          <Input name="parcels" type="text" defaultValue={parcels} onChange={(e) => setParcels(e.target.value)} />
        </FormElement>
        <FormElement>
          <Label htmlFor="owner">Owner</Label>
          <Input name="owner" type="text" defaultValue={owner} onChange={(e) => setOwner(e.target.value)} />
        </FormElement>
        <FormElement>
          <Label htmlFor="kml">KML URL</Label>
          <Input name="kml" type="text" defaultValue={kml} onChange={(e) => setKml(e.target.value)} />
        </FormElement>
        <FormElement>
          <Label htmlFor="type">Terms</Label>
          <Select name="type" onChange={(e) => setTerms(e.target.value)} defaultValue={terms}>
            <Select.Item value="none">None</Select.Item>
            {/* <Select.Item value="tokenizer">Property Tokenizer</Select.Item> */}
          </Select>
        </FormElement>
        <FormElement>
          <Label htmlFor="upload">Image</Label>
          <FileUploader setFile={setFile} setPreview={setPreview} />
        </FormElement>
        <FormElement variant="vertical">
          <Label htmlFor="preview">Preview</Label>
          {file && (
            <Box
              css={{
                height: '150px',
                width: '150px',
              }}
            >
              <img src={preview} height="100%" width="100%" alt="Artwork" />
            </Box>
          )}
        </FormElement>
        {warning && <Warning warning={warning} />}
        <Back onClick={() => setProposal('mintMenu')} />
        <Button onClick={submit}>Submit</Button>
      </Form>
    </Flex>
  )
}
