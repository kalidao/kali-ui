import React from 'react'
import { Flex, Text } from '../../../../styles/elements'
import Link from 'next/link'
import { styled } from '../../../../styles/stitches.config'

export default function Menu({ saleActive }) {
  return (
    <>
      {items.map((item) => (
        <Item key={item.label} link={item.link} label={item.label} icon={item.icon} chainId={chainId} dao={dao} />
      ))}
      {saleActive === true && <Item key={'Crowdsale'} link={'/crowdsale'} label={'Crowdsale'} icon={<GiCoins />} />}
    </>
  )
}
