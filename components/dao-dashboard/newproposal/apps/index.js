import React, { useState, useEffect } from 'react'
import { Menu } from '../../../../styles/proposal/Menu'
import { Flex, Text } from '../../../../styles/elements'
import { FcSalesPerformance } from 'react-icons/fc'
import { MdOutlineRedeem, MdOutlineConstruction } from 'react-icons/md'
// menu items
import SetCrowdsale from './SetCrowdsale'
import SetRedemption from './SetRedemption'
import Tribute from './Tribute'
import Back from '../../../../styles/proposal/Back'
import { useRouter } from 'next/router'
import { addresses } from '../../../../constants/addresses'
import { fetchExtensionStatus } from '../../../../utils/fetchExtensionStatus'

function AppsMenu({ setProposal }) {
  const router = useRouter()
  const { dao, chainId } = router.query

  const [isCrowdsale, setIsCrowdsale] = useState(false)
  useEffect(() => {
    const getCrowdsaleStatus = async () => {
      const status = await fetchExtensionStatus(chainId, dao, addresses[chainId]['extensions']['crowdsale2'])
      console.log(status)
      status ? setIsCrowdsale('Yes') : setIsCrowdsale('No')
    }

    getCrowdsaleStatus()
  }, [])

  return (
    <Flex gap="md" dir="col">
      <Text> </Text>
      <Text variant="instruction">(1) Swap :</Text>
      <Text variant="instruction">
        KaliDAOs may swap their KaliDAO tokens for ETH or ERC20 tokens publicly or privately.
      </Text>
      <Text variant="instruction">(2) Redemption :</Text>
      <Text variant="instruction">
        KaliDAO members may redeem a portion of KaliDAO treasury by burning their KaliDAO tokens.
      </Text>
      <Menu>
        {isCrowdsale ? (
          <>
            <Menu.Item onClick={() => setProposal('crowdsale_update')}>
              <MdOutlineConstruction />
              Update Swap
            </Menu.Item>
            <Menu.Item onClick={() => setProposal('crowdsale_remove')}>
              <MdOutlineConstruction />
              Remove Swap
            </Menu.Item>
          </>
        ) : (
          <Menu.Item onClick={() => setProposal('crowdsale_add')}>
            <MdOutlineConstruction />
            Add Swap
          </Menu.Item>
        )}
        <Menu.Item onClick={() => setProposal('redemption')}>
          <MdOutlineRedeem />
          Redemption
        </Menu.Item>
        {/* <Menu.Item onClick={() => setProposal('crowdsaleWithVesting')}>Crowdsale with Vesting</Menu.Item> */}
        {/* <Menu.Item onClick={() => setProposal('tributeWithVesting')}>Tribute with Vesting</Menu.Item> */}
      </Menu>
      <Back onClick={() => setProposal('menu')} />
    </Flex>
  )
}

export { AppsMenu, SetCrowdsale, SetRedemption, Tribute }
