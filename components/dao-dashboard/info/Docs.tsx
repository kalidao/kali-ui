import React from 'react'
import Ricardian from './Ricardian'
import { Card } from '@components/ui/card'
import { Link } from 'lucide-react'

type Props = {
  docs: string
}

export default function Docs({ docs }: Props) {
  return (
    <Card className="w-full p-6">
      {docs === '' ? (
        <Ricardian />
      ) : (
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold">Docs</h2>
          <div>
            {docs === 'none' && <p className="text-gray-500">Pending...</p>}
            {docs.substring(0, 4) === 'http' ? (
              <a href={docs} target="_blank" rel="noreferrer noopener" className="text-blue-500 hover:text-blue-600">
                <Link className="inline-block w-5 h-5" />
              </a>
            ) : (
              <a
                href={`https://content.wrappr.wtf/ipfs/${docs}`}
                target="_blank"
                rel="noreferrer noopener"
                className="text-blue-500 hover:text-blue-600"
              >
                <Link className="inline-block w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      )}
    </Card>
  )
}
