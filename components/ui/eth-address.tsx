import React from 'react'
import { useToast } from '@components/ui/use-toast'
import { Copy } from 'lucide-react'
import { Address } from 'viem'

const EthAddress = ({ address }: { address: Address }) => {
  const { toast } = useToast()
  const handleCopy = () => {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        toast({
          title: 'Copied! 🚀',
          description: `${address} copied to clipboard`,
        })
      })
      .catch((err) => {
        console.error('Failed to copy: ', err)
        toast({
          title: 'Failed to copy 😢',
          description: 'Please try again',
        })
      })
  }

  return (
    <button onClick={handleCopy} className="flex items-end w-full">
      <span className="truncate max-w-[100px]"> {address}</span>
      <Copy className="h-4 w-4" />
    </button>
  )
}

export default EthAddress
