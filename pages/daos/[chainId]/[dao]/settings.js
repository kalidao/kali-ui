import React from 'react'
import Layout from '../../../../components/dao-dashboard/layout/'
import { Button, Flex, Text } from '../../../../styles/elements'
import Back from '../../../../styles/proposal/Back'
import { getDaoInfo } from '../../../../graph/queries'
import Info from '../../../../components/dao-dashboard/info/index'
import { useRouter } from 'next/router'
import { FaPen } from 'react-icons/fa'

export const getServerSideProps = async (context) => {
  const address = context.params.dao
  const chainId = context.params.chainId
  const result = await getDaoInfo(chainId, address)

  return {
    props: {
      info: result['data']['daos'][0],
    },
  }
}

export default function SettingsPage({ info, ricardian }) {
  const router = useRouter()
  console.log('res', info, ricardian)
  const govs = [
    {
      title: 'Voting Period',
      value: 10,
      propose: 'votingPeriod',
    },
    {
      title: 'Participation Required',
      value: 30,
      propose: 'quorum',
    },
    {
      title: 'Approval Required',
      value: 30,
      propose: 'quorum',
    },
  ]

  return (
    <Layout heading={`Settings`} content="View and edit the configurations.">
      <Flex
        css={{
          borderLeft: '1px solid hsla(0, 0%, 90%, 0.1)',
          height: '100%',
          padding: '20px',
        }}
      >
        <Flex
          css={{
            padding: '20px',
            border: '1px solid $gray3',
            borderRadius: '20px',
            boxShadow: 'rgba(0, 0, 0, 0.28) 0px 2px 4px',
            flexDirection: 'column',
            gap: '10px',
            minWidth: '20rem',
            height: 'fit-content',
          }}
        >
          <Text
            css={{
              fontSize: '24px',
              width: '100%',
              borderBottom: '1px solid $gray2',
            }}
          >
            Governance
          </Text>
          {govs.map((gov) => (
            <Card title={gov?.title} value={gov?.value} propose={gov?.propose} />
          ))}
        </Flex>
      </Flex>
    </Layout>
  )
}

const Card = ({ title, value, propose }) => {
  return (
    <Flex
      css={{
        gap: '10px',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Text
        css={{
          fontSize: '16px',
          fontFamily: 'Regular',
          width: '80%',
        }}
      >
        {title}
      </Text>
      <Text
        css={{
          fontSize: '16px',
          fontFamily: 'Regular',
        }}
      >
        {value}
      </Text>
      <Button
        css={{
          all: 'unset',
          height: '10px',
          width: '10px',
          padding: '6px',
          border: '1px solid $gray3',
          borderRadius: '100%',
          background: '$gray2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          '&:hover': {
            border: '1px solid $gray4',
            background: '$gray3',
          },
        }}
      >
        <FaPen />
      </Button>
    </Flex>
  )
}
