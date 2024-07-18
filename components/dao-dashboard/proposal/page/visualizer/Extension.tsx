import { Button } from '@components/ui/button'
import { useRouter } from 'next/router'
import decodeExtensions from './decodeExtensions'
import { getExtensionLabel } from '@constants/extensions'
import getExplorerLink, { ExplorerType } from '@utils/getExplorerLink'
import { useQuery } from '@tanstack/react-query'
import { prettyDate } from '@utils/prettyDate'
import { User } from '@components/tools/User'
import ReactMarkdown from 'react-markdown'
import { Coins, Link } from 'lucide-react'

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
    <div className="space-y-4">
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
    </div>
  )
}

const resolveValueRender = (value: any, display: string, chainId: number): React.ReactNode => {
  switch (display) {
    case 'string':
      return <p className="text-sm">{value}</p>
    case 'token':
      return (
        <Button variant="ghost" size="icon" asChild>
          <a href={getExplorerLink(chainId, ExplorerType.ADDRESS, value)} target="_blank" rel="noopener noreferrer">
            <Coins className="h-4 w-4" />
          </a>
        </Button>
      )
    case 'id':
      return <p className="text-sm">{value}</p>
    case 'address':
      return <User address={value} />
    case 'date':
      return <p className="text-sm">{prettyDate(new Date(value))}</p>
    case 'saleType':
      return <p className="text-sm">{value}</p>
    case 'swapRatio':
      return <p className="text-sm">{value}</p>
    case 'BigNumber':
      return <p className="text-sm">{value.toString()}</p>
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
        <div className="space-y-2">
          {render?.map((item, index) => (
            <div key={index} className="space-y-1">
              <p className="font-semibold">{item.key}</p>
              {item.key == 'goalDescription' ? (
                <ReactMarkdown
                  components={{
                    h1: ({ node, ...props }) => <h2 className="text-black dark:text-white" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-black dark:text-white" {...props} />,
                    p: ({ node, ...props }) => <p className="text-black dark:text-white" {...props} />,
                    li: ({ node, ...props }) => <li className="text-black dark:text-white" {...props} />,
                    em: ({ node, ...props }) => <i className="text-black dark:text-white" {...props} />,
                  }}
                >
                  {item.value}
                </ReactMarkdown>
              ) : (
                <p className="text-sm">{item.value}</p>
              )}
            </div>
          ))}
        </div>
      )
    case 'link':
      if (value == '') return <p className="text-sm">N/A</p>
      return (
        <a href={value} target="_blank" rel="noopenner noreferrer">
          <Link className="h-4 w-4" />
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

  return (
    <div className="space-y-4">
      {decoded && (
        <p className="text-sm">
          This interacts with the {getExtensionLabel(decoded?.type)} app. You can review the contract{' '}
          <a
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            href={getExplorerLink(chainId, ExplorerType.ADDRESS, extension)}
          >
            here
          </a>
          .
        </p>
      )}
      <div className="flex justify-between items-center">
        <p className="text-xs font-medium uppercase">Type</p>
        <p className="text-xs font-medium uppercase">Value</p>
      </div>
      {decoded &&
        decoded?.values?.map((item, index) => (
          <ExtensionRow
            key={index}
            label={item.label}
            display={item.display}
            value={resolveValueRender(item.value, item.display, chainId)}
          />
        ))}
    </div>
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
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase">{label}</p>
        <div className="flex">{value}</div>
      </div>
    )
  }

  return (
    <div className="flex justify-between items-center" key={label}>
      <p className="text-sm">{label}</p>
      <div>{value}</div>
    </div>
  )
}
