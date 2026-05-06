import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { cn } from '../../../utils/cn'

interface CheckboxProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  label: string
  description?: string
  required?: boolean
}

export const Checkbox = ({ checked, onCheckedChange, label, description, required }: CheckboxProps) => (
  <label className="flex cursor-pointer items-start gap-2">
    <CheckboxPrimitive.Root
      checked={checked}
      onCheckedChange={(value) => onCheckedChange?.(Boolean(value))}
      className={cn(
        'mt-0.5 flex h-4 w-4 items-center justify-center rounded-sm border border-border bg-surface',
        checked && 'border-primary bg-primary text-white',
      )}
      aria-required={required}
    >
      <CheckboxPrimitive.Indicator>
        <Check className="h-3 w-3" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    <span className="space-y-0.5">
      <span className="block text-sm font-medium text-text-primary">{label}</span>
      {description ? <span className="block text-xs text-text-secondary">{description}</span> : null}
    </span>
  </label>
)
