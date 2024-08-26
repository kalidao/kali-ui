'use client'
import Services from '@components/services'
import { NextPage } from 'next'
import { Back } from '@components/ui/back'
import { useRouter } from 'next/navigation'

const ServicesPage: NextPage = () => {
  const router = useRouter()
  return (
    <div className="flex flex-col">
      <Back onClick={() => router.replace('/')} />
      <Services />
    </div>
  )
}

export default ServicesPage
