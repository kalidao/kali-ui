import React from 'react'
import { useSigner, useNetwork, useContract } from 'wagmi'
import DAO_ABI from '../../abi/KaliDAO.json';
import { addresses } from "../../constants/addresses";

export default function useDAO(address) {
  const { data: signer } = useSigner();
  
  return useContract({
    addressOrName: address,
    contractInterface: DAO_ABI,
    signerOrProvider: signer
  })
}
