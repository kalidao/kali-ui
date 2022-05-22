import React from 'react'
import { useForm } from 'react-hook-form'
import Layout from '../../components/layout'
import { Button } from '../../styles/elements'
import { Form, Input } from '../../styles/form-elements'
import { useContractRead } from 'wagmi'
import FACTORY_ABI from '../../abi/KaliClubSigFactory.json'
import { formatBytes32String } from 'ethers/lib/utils'

export default function Clone() {
  const methods = useForm()
  const { data, status, isError } = useContractRead(
    {
      addressOrName: '0x8Ba8438024fCaFa94C37c6C69D01DDb2Db06ba3A',
      contractInterface: FACTORY_ABI, 
    },
    'determineClones',
    {
        args: [
            formatBytes32String("SOSSMOSS2"),
            formatBytes32String("SOSS")
        ]
    },
    {
      onSuccess() {
        console.log('success!')
      }
    }
  )
  return (
    <Layout heading="determineClone">
        <Form css={{
            position: 'absolute',
            top: '5rem'
        }}
        id="clone"
        >
            {/* <Input name="name" type="text" placeholder="name" />
            <Input name="symbol" type="text" placeholder="symbol" />
            <Button type="submit">Submit</Button> */}
            <pre>
                {data ? JSON.stringify(data, 2, null) : null}
            </pre>
        </Form>
    </Layout>
  )
}
