'use client'
import UserDAOComponent from '@components/home/UserDAOs'
import { useAccount } from 'wagmi'

export const UserDAOs = () => {
  const { address, isConnected } = useAccount()

  if (isConnected) {
    return (
      <div className="py-8">
        <UserDAOComponent address={address as string} />
      </div>
    )
  }

  return null
}
