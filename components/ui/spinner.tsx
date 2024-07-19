import React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@utils/util'

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(({ className, size = 'md', ...props }, ref) => {
  return (
    <div ref={ref} className={cn('animate-spin', className)} {...props}>
      <Loader2
        className={cn(
          'text-muted-foreground',
          size === 'sm' && 'h-4 w-4',
          size === 'md' && 'h-6 w-6',
          size === 'lg' && 'h-8 w-8',
        )}
      />
      <span className="sr-only">Loading</span>
    </div>
  )
})
Spinner.displayName = 'Spinner'

export { Spinner }
