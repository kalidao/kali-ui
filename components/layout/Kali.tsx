import React from 'react'
import Image from 'next/image'
import { styled } from '@design/stitches.config'
import { useRouter } from 'next/router'

const LogoContainer = styled('div', {
  display: 'flex',
  padding: '8.11px 7.9px 8.6px 0.92px',
  fontSize: '48px',
  filter: 'grayscale(100%)',
})

export default function Kali() {
  const router = useRouter()

  const home = () => {
    router.push('/')
  }

  return (
    <LogoContainer>
      {/* KALI */}
      <Image src="/icons/K-logo.svg" alt="KALI" width="48px" height="48px" onClick={home} priority />
    </LogoContainer>
  )
}
