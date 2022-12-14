import React, { useState, useEffect } from 'react'
// menu items
import SetRedemption from './SetRedemption'
import Back from '@design/proposal/Back'
import { useRouter } from 'next/router'
import { addresses } from '@constants/addresses'
import { fetchExtensionStatus } from '@utils/fetchExtensionStatus'
import { IconSparkles, IconTrash, Stack, Text } from '@kalidao/reality'
import { Item } from '../Item'

type Props = {
  setProposal: React.Dispatch<React.SetStateAction<string>>
}

function AppsMenu({ setProposal }: Props) {
  const router = useRouter()
  const { dao, chainId } = router.query

  const [isCrowdsale, setIsCrowdsale] = useState(false)

  useEffect(() => {
    const getCrowdsaleStatus = async () => {
      const status = await fetchExtensionStatus(
        Number(chainId),
        dao as string,
        addresses[Number(chainId)]['extensions']['crowdsale2'],
      )
      console.log(status)
      status ? setIsCrowdsale(true) : setIsCrowdsale(false)
    }

    getCrowdsaleStatus()
  }, [chainId, dao])

  return (
    <Stack>
      <Text>(1) Swap :</Text>
      <Text>Swap allows KaliDAOs to swap KaliDAO tokens for ETH or ERC20 tokens publicly or privately.</Text>
      <Text>(2) Redemption :</Text>
      <Text>Redemption allows KaliDAO members to redeem a portion of DAO treasury by burning their KaliDAO tokens.</Text>
      <Text>(3) Data Room :</Text>
      <Text>Data Room is on-chain storage for recording off-chain activities or ratifying documents.</Text>
      <Stack>
        {isCrowdsale ? (
          <>
            <Item onClick={() => setProposal('crowdsale_update')} label="Update Swap" icon={<IconSparkles />} />
            <Item onClick={() => setProposal('crowdsale_remove')} label="Remove Swap" icon={<IconTrash />} />
          </>
        ) : (
          <Item onClick={() => setProposal('swap_add')} label="Add Swap" icon={<IconSparkles />} />
        )}
        <Item onClick={() => setProposal('redemption')} label="Add Redemption" icon={<IconSparkles />} />
        <Item onClick={() => setProposal('record')} label="Record Off-Chain Activities" icon={<IconSparkles />} />
      </Stack>
      <Back onClick={() => setProposal('menu')} />
    </Stack>
  )
}

export { AppsMenu, SetRedemption }
