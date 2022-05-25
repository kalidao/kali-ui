import React, { useState } from 'react'
import { useAccount, useNetwork, useContractWrite, useContract, useSigner } from "wagmi";
import { Flex, Text, Button } from "../../../../styles/elements"
import { Form, FormElement, Label, Input } from "../../../../styles/form-elements";
import { AddressZero } from '@ethersproject/constants'
import { ethers } from 'ethers';
import { addresses } from '../../../../constants/addresses';
import { Select } from '../../../../styles/form-elements/Select';
import FileUploader from '../../../tools/FileUpload';
import TRIBUTE_ABI from "../../../../abi/KaliDAOtribute.json";
import { useRouter } from 'next/router';
import { getDaoChain } from '../../../../utils';
import { getTokenName } from '../../../../utils/fetchTokenInfo';

export default function GiveTribute() {
  const router = useRouter();
  const daoAddress = router.query.dao;
  const daoChainId = getDaoChain(daoAddress)
  const daoName = getTokenName(daoChainId, daoAddress);
  const { data: account } = useAccount();
  const { data: signer } = useSigner();
  const { activeChain } = useNetwork();
  const tributeContract = useContract({
    addressOrName: activeChain?.id && addresses[activeChain.id]["extensions"]["tribute"],
    contractInterface: TRIBUTE_ABI, 
    signerOrProvider: signer
  })

  
  console.log(activeChain?.id)
  
  const { writeAsync, isLoading: isWritePending, isError } = useContractWrite(
    {
      addressOrName: activeChain?.id && addresses[activeChain.id]["extensions"]["tribute"],
      contractInterface: TRIBUTE_ABI, 
    },
    'submitTributeProposal',
    {
      onSuccess() {
        console.log('success!')
      }
    }
  )

  // form
  const [type, setType] = useState('eth')
  const [requestAmount, setRequestAmount] = useState();
  const [tributeAmount, setTributeAmount] = useState();
  const [tokenAddress, setTokenAddress] = useState();
  const [tokenId, setTokenId] = useState();
  const [description, setDescription] = useState(null);
  const [file, setFile] = useState(null)

  const tribute = async () => {
    if (!account || !daoAddress || !daoChainId) return
    
    requestAmount = ethers.utils.parseUnits(requestAmount, 18).toString()
    tributeAmount = ethers.utils.parseUnits(tributeAmount, 18).toString()
    console.log(requestAmount, tributeAmount)  
    console.log(description, account?.address, requestAmount, isNFT, asset, tributeAmount)

    console.log('proposeTribute', proposeTribute);
  };

  // TODO: Popup to change network if on different network from DAO
  const submit = async (e) => {
    e.preventDefault()
    console.log('type', type)
    console.log('request', requestAmount)
    console.log('description', description)
    console.log('file', file)
    console.log('tokenId', tokenId)
    console.log('tokenAddress', tokenAddress)
    console.log('tributeAmount', tributeAmount)

    let isNFT
    let asset
    let amount
    console.log(AddressZero)

    switch (type) {
      case "eth": 
        isNFT = false
        asset = AddressZero
        amount = ethers.utils.parseEther(tributeAmount).toString();
        break;
      case "erc20": 
        isNFT = false;
        asset = tokenAddress;
        amount = ethers.utils.parseEther(tributeAmount).toString();
        break;
      case "erc721": 
        asset = tokenAddress;
        amount = tokenId
        isNFT = true;
        break;
      default:  
        Error('Invalid type');
    }

    let docs
    if (file) {
      docs = file
    } else {
      docs = description
    }
    const requested = ethers.utils.parseEther(requestAmount).toString();

    console.log(
        daoAddress,
        0,
        docs,
        [account?.address],
        [requested],
        Array(0),
        isNFT,
        asset,
        amount
    )

    try {
      const tx = await tributeContract.submitTributeProposal(
        daoAddress,
        0,
        docs,
        [account?.address],
        [requested],
        [''],
        isNFT,
        asset,
        amount,
        {
          value: type === "eth" ? amount : null
        }
      )
      console.log('tx', tx)
    } catch (e) {
      console.log('error', e)
    }
  }

  return (
    <Flex dir="col" gap="md">
      <Text>
        Make a tribute in form of ETH, token or NFT to join{" "}
            <i>
              {daoName}
            </i>.
      </Text>
      <Form>
        <FormElement>
          <Label htmlFor="type">Asset type</Label>
          <Select
              name="type"
              onValueChange={(value) => setType(value)}
              defaultValue={type}
            >
              <Select.Item value="eth">ETH</Select.Item>
              <Select.Item value="erc20">ERC20</Select.Item>
              <Select.Item value="erc721">ERC721</Select.Item>
            </Select>
        </FormElement>
        {(type === "erc20" || type === "erc721") &&
          <FormElement>
            <Label htmlFor="tokenAddress">Contract Address</Label>
            <Input name="tokenAddress" type="text" defaultValue={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)}/>
          </FormElement>}
        {(type === "eth" || type === "erc20") && 
        <FormElement>
          <Label htmlFor="tributeAmount">Tribute Amount</Label>
          <Input name="tributeAmount" type="number" defaultValue={tributeAmount} onChange={(e) => setTributeAmount(e.target.value)}/>
        </FormElement>}
        {type === "erc721" &&
        <FormElement>
          <Label htmlFor="tokenId">Token ID</Label>
          <Input name="tokenId" type="number" defaultValue={tokenId} onChange={(e) => setTokenId(e.target.value)}/>
        </FormElement>
        }
        <FormElement>
          <Label htmlFor="requestAmount">DAO Tokens Requested</Label>
          <Input name="requestAmount" type="number" defaultValue={requestAmount} onChange={(e) => setRequestAmount(e.target.value)}/>
        </FormElement>
        <FormElement variant="vertical">
          <Label htmlFor="description">Description</Label>
          <Input as="textarea" name="description" type="text" defaultValue={description} onChange={(e) => setDescription(e.target.value)} css={{ padding: '0.5rem', width: '97%', height: '10vh'}} />
        </FormElement>
        <Flex gap="sm" align="end" effect="glow">
          <FileUploader setFile={setFile} />
        </Flex>
        <Button onClick={submit}>Submit</Button>
      </Form>
    </Flex>
  )
}
