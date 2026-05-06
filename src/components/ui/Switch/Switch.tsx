import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '../../../utils/cn'

interface SwitchProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  label: string
}

export const Switch = ({ checked, onCheckedChange, label }: SwitchProps) => (
  <label className="flex items-center justify-between gap-3 rounded-md border border-border p-3">
    <span className="text-sm text-text-primary">{label}</span>
    <SwitchPrimitive.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={cn(
        'relative h-6 w-11 rounded-full border border-transparent transition-colors',
        checked ? 'bg-primary' : 'bg-slate-300',
      )}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'block h-5 w-5 rounded-full bg-white transition-transform',
          checked ? 'translate-x-5' : 'translate-x-0.5',
        )}
      />
    </SwitchPrimitive.Root>
  </label>
)
