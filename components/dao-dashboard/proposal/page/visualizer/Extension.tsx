import { Button, Box, Stack, IconLink, Text, IconTokens } from '@kalidao/reality'
import { useRouter } from 'next/router'
import decodeExtensions from './decodeExtensions'
import { getExtensionLabel } from '@constants/extensions'
import KALIDAO_ABI from '@abi/DAO'
import { useContractRead } from 'wagmi'
import getExplorerLink, { ExplorerType } from '@utils/getExplorerLink'
import { useQuery } from '@tanstack/react-query'
import { prettyDate } from '@utils/prettyDate'
import { User } from '@components/tools/User'
import ReactMarkdown from 'react-markdown'
import { useThemeStore } from '@components/hooks/useThemeStore'

export default function ExtensionShell({
  accounts,
  amounts,
  payloads,
}: {
  accounts: string[]
  amounts: string[]
  payloads: string[]
}) {
  const router = useRouter()

  const dao = router.query.dao as string
  const chainId = Number(router.query.chainId)

  let extensions = []
  for (let i = 0; i < accounts.length; i++) {
    extensions.push({
      account: accounts[i],
      amount: amounts[i],
      payload: payloads[i],
    })
  }
  return (
    <Stack>
      {extensions.map((extension, i) => (
        <Extension
          key={extension.account}
          extension={extension.account}
          amount={extension.amount}
          payload={extension.payload}
          chainId={chainId}
          dao={dao}
        />
      ))}
    </Stack>
  )
}

const resolveValueRender = (value: any, display: string, chainId: number, mode: string): React.ReactNode => {
  switch (display) {
    case 'string':
      return <Text>{value}</Text>
    case 'token':
      return (
        <Button
          shape="circle"
          as="a"
          href={getExplorerLink(chainId, ExplorerType.ADDRESS, value)}
          target="_blank"
          rel="noopener noreferrer"
          variant="transparent"
          size="small"
        >
          <IconTokens />
        </Button>
      )
    case 'id':
      return <Text>{value}</Text>
    case 'address':
      return <User address={value} />
    case 'date':
      return <Text>{prettyDate(new Date(value))}</Text>
    case 'saleType':
      return <Text>{value}</Text>
    case 'swapRatio':
      return <Text>{value}</Text>
    case 'BigNumber':
      return <Text>{value.toString()}</Text>
    case 'json':
      let json = value[0]
      let render = []
      for (const key in json) {
        render.push({
          key: key,
          value: json[key],
        })
      }
      return (
        <Stack>
          {render?.map((item, index) => (
            <Stack key={index}>
              <Text weight="semiBold">{item.key}</Text>
              {item.key == 'goalDescription' ? (
                <ReactMarkdown
                  components={{
                    h1: ({ node, ...props }) => (
                      <h2 style={{ color: mode === 'dark' ? 'white' : 'black' }} {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 style={{ color: mode === 'dark' ? 'white' : 'black' }} {...props} />
                    ),
                    p: ({ node, ...props }) => <p style={{ color: mode === 'dark' ? 'white' : 'black' }} {...props} />,
                    li: ({ node, ...props }) => (
                      <li style={{ color: mode === 'dark' ? 'white' : 'black' }} {...props} />
                    ),
                    em: ({ node, ...props }) => <i style={{ color: mode === 'dark' ? 'white' : 'black' }} {...props} />,
                  }}
                >
                  {item.value}
                </ReactMarkdown>
              ) : (
                <Text>{item.value}</Text>
              )}
            </Stack>
          ))}
        </Stack>
      )
    case 'link':
      if (value == '') return <Text>N/A</Text>
      return (
        <a href={value} target="_blank" rel="noopenner noreferrer">
          <IconLink />
        </a>
      )
  }
}

const Extension = ({
  extension,
  amount,
  payload,
  dao,
  chainId,
}: {
  extension: string
  amount: string
  payload: string
  dao: string
  chainId: number
}) => {
  const { data: decoded } = useQuery(
    ['extension', extension, payload, chainId],
    async () => await decodeExtensions(dao, extension, payload, chainId),
    { enabled: !!payload },
  )
  const mode = useThemeStore((state) => state.mode)

  return (
    <Stack>
      {decoded && (
        <Text>
          This interacts with the {getExtensionLabel(decoded?.type)} app. You can review the contract{' '}
          <a target="_blank" rel="noopener noreferrer" href={getExplorerLink(chainId, ExplorerType.ADDRESS, extension)}>
            here
          </a>
          .
        </Text>
      )}
      <Stack direction={'horizontal'} align="center" justify={'space-between'}>
        <Text variant="label">Type</Text>
        <Text variant="label">Value</Text>
      </Stack>
      {decoded &&
        decoded?.values?.map((item, index) => (
          <ExtensionRow
            key={index}
            label={item.label}
            display={item.display}
            value={resolveValueRender(item.value, item.display, chainId, mode)}
          />
        ))}
    </Stack>
  )
}

type RowProps = {
  label: string
  display: string
  value: React.ReactNode
}

const ExtensionRow = ({ label, display, value }: RowProps) => {
  if (display === 'json') {
    return (
      <Stack>
        <Text variant="label">{label}</Text>
        <Box display="flex">{value}</Box>
      </Stack>
    )
  }

  return (
    <Stack direction="horizontal" justify="space-between" align="center" key={label}>
      <Text>{label}</Text>
      <Box>{value}</Box>
    </Stack>
  )
}
