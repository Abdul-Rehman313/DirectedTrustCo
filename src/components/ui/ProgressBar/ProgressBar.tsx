import * as Progress from '@radix-ui/react-progress'

interface ProgressBarProps {
  value: number
}

export const ProgressBar = ({ value }: ProgressBarProps) => (
  <Progress.Root value={value} className="relative h-2 w-full overflow-hidden rounded-full bg-slate-200" aria-label="Progress">
    <Progress.Indicator
      className="h-full rounded-full bg-primary transition-all duration-300 ease-fintech"
      style={{ transform: `translateX(-${100 - Math.max(0, Math.min(value, 100))}%)` }}
    />
  </Progress.Root>
)
