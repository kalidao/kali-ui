import React, { useState, useEffect } from 'react'
import { MdOutlineRedeem, MdOutlineConstruction } from 'react-icons/md'
// menu items
import SetCrowdsale from './SetCrowdsale'
import SetRedemption from './SetRedemption'
import Back from '@design/proposal/Back'
import { useRouter } from 'next/router'
import { addresses } from '@constants/addresses'
import { fetchExtensionStatus } from '@utils/fetchExtensionStatus'
import { Stack, Text } from '@kalidao/reality'
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
      const status = await fetchExtensionStatus(Number(chainId), dao, addresses[chainId]['extensions']['crowdsale2'])
      console.log(status)
      status ? setIsCrowdsale(true) : setIsCrowdsale(false)
    }

    getCrowdsaleStatus()
  }, [])

  return (
    <Stack>
      <Text>(1) Swap :</Text>
      <Text>KaliDAOs may swap their KaliDAO tokens for ETH or ERC20 tokens publicly or privately.</Text>
      <Text>(2) Redemption :</Text>
      <Text>KaliDAO members may redeem a portion of KaliDAO treasury by burning their KaliDAO tokens.</Text>
      <Stack>
        {isCrowdsale ? (
          <>
            <Item
              onClick={() => setProposal('crowdsale_update')}
              label="Update Swap"
              icon={<MdOutlineConstruction />}
            />
            <Item
              onClick={() => setProposal('crowdsale_remove')}
              label="Remove Swap"
              icon={<MdOutlineConstruction />}
            />
          </>
        ) : (
          <Item onClick={() => setProposal('crowdsale_add')} label="Add Swap" icon={<MdOutlineConstruction />} />
        )}
        <Item onClick={() => setProposal('redemption')} label="Redemption" icon={<MdOutlineRedeem />} />
      </Stack>
      <Back onClick={() => setProposal('menu')} />
    </Stack>
  )
}

export { AppsMenu, SetCrowdsale, SetRedemption }
