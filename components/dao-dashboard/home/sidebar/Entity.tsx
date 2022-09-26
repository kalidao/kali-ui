import Link from 'next/link'
import { Avatar, ButtonCard, Heading, Stack } from '@kalidao/reality'
import wrappr from '@public/img/wrappr.webp'
import NextImage from 'next/image'

type Props = {
  address: string
  chainId: string
}

const Entity = ({ address, chainId }: Props) => {
  return (
    <Link
      href={{
        pathname: '/daos/[chainId]/[dao]/info',
        query: {
          dao: address,
          chainId: chainId,
        },
      }}
      passHref
    >
      <ButtonCard
        buttonText="Wrappr"
        prefix={
          <Avatar
            as="img"
            shape="square"
            label={'Wrappr Logo'}
            src={'https://raw.githubusercontent.com/kalidao/wrappr-ui/main/public/logo.png'}
          />
        }
        as="a"
      >
        <Heading>Delaware LLC</Heading>
      </ButtonCard>
    </Link>
  )
}

export default Entity
