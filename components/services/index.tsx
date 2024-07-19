import React from 'react'
import { serviceProviders } from '@constants/serviceProviders'
import { Card } from '@components/ui/card'
import { Button } from '@components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Services() {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center capitalize mb-8">Partner Service Providers</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {serviceProviders.map((provider) => (
          <Card key={provider.name} className="w-80 md:w-96 p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                {provider.icon ? (
                  <img src={provider.icon} alt={`${provider.name} logo`} className="w-16 h-16 rounded-lg" />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                )}
                <h3 className="text-xl font-semibold">{provider.name}</h3>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-600">{provider.text}</p>
                <Button asChild size="icon" className="rounded-full">
                  <a href={provider.link} target="_blank" rel="noreferrer noopener">
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
