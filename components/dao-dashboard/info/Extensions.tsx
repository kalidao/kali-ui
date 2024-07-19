import React from 'react'
import { Card, CardContent } from '@components/ui/card'
import { Activity, Repeat, ArrowLeftRight } from 'lucide-react'

type Props = {
  tribute: any
  redemption: any
  swap: any
}

export default function Extensions({ tribute, redemption, swap }: Props) {
  const extensions = [
    {
      title: 'Tribute',
      value: tribute === null ? 'Inactive' : tribute?.active === true ? 'Active' : 'Inactive',
      icon: <Activity className="h-5 w-5" />,
    },
    {
      title: 'Redemption',
      value: redemption === null ? 'Inactive' : redemption?.active === true ? 'Active' : 'Inactive',
      icon: <Repeat className="h-5 w-5" />,
    },
    {
      title: 'Swap',
      value: swap === null ? 'Inactive' : swap?.active === true ? 'Active' : 'Inactive',
      icon: <ArrowLeftRight className="h-5 w-5" />,
    },
  ]

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          {extensions?.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {item.icon}
                <span className="text-sm font-medium">{item.title}</span>
              </div>
              <span className={`text-sm font-bold ${item.value === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
