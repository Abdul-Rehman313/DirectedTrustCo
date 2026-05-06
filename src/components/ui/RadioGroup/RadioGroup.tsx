import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cn } from '../../../utils/cn'

export interface RadioOption {
  label: string
  value: string
  hint?: string
}

interface RadioGroupProps {
  value?: string
  onValueChange?: (value: string) => void
  options: RadioOption[]
  name: string
}

export const RadioGroup = ({ value, onValueChange, options, name }: RadioGroupProps) => (
  <RadioGroupPrimitive.Root value={value} onValueChange={onValueChange} className="space-y-2" name={name}>
    {options.map((option) => (
      <label key={option.value} className="flex cursor-pointer items-start gap-2 rounded-md border border-border p-3 hover:bg-slate-50">
        <RadioGroupPrimitive.Item
          value={option.value}
          className={cn(
            'mt-0.5 h-4 w-4 rounded-full border border-border',
            value === option.value && 'border-primary bg-primary',
          )}
        >
          <RadioGroupPrimitive.Indicator className="relative flex h-full w-full items-center justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
        <span>
          <span className="block text-sm font-medium text-text-primary">{option.label}</span>
          {option.hint ? <span className="text-xs text-text-secondary">{option.hint}</span> : null}
        </span>
      </label>
    ))}
  </RadioGroupPrimitive.Root>
)
