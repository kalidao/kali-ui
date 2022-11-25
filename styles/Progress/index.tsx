import * as ProgressPrimitive from '@radix-ui/react-progress'
import * as styles from './styles.css'

export const Progress = ({ value }: { value: number }) => {
  return (
    <ProgressPrimitive.Root className={styles.root} value={value}>
      <ProgressPrimitive.Indicator className={styles.indicator} style={{ transform: `translateX(-${100 - value}%)` }} />
    </ProgressPrimitive.Root>
  )
}
