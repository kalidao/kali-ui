import { addresses } from '../constants/addresses'
import { ethers } from 'ethers'

export const computeKaliAddress = (name, chainId) => {
  const kaliMaster = addresses[chainId]['kaliMaster']
  const factoryAddress = addresses[chainId]['factory']
  const salt = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(name))
  const bytecodeHash = ethers.utils.keccak256(
    ethers.utils.solidityPack(
      ['bytes10', 'bytes10', 'address', 'bytes15'],
      ['0x3d602d80600a3d3981f3', '0x363d3d373d3d3d363d73', kaliMaster, '0x5af43d82803e903d91602b57fd5bf3'],
    ),
  )

  const address = ethers.utils.getCreate2Address(factoryAddress, salt, bytecodeHash)
  console.log(`Address for ${name} on ${chainId}:`, address)
  // return address
}
