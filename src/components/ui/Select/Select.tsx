import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '../../../utils/cn'

export interface SelectOption {
  label: string
  value: string
}

interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  options: ReadonlyArray<SelectOption>
  disabled?: boolean
  ariaLabel?: string
  triggerClassName?: string
  contentClassName?: string
  itemClassName?: string
}

export const Select = ({
  value,
  onValueChange,
  placeholder = 'Select option',
  options,
  disabled,
  ariaLabel,
  triggerClassName,
  contentClassName,
  itemClassName,
}: SelectProps) => (
  <SelectPrimitive.Root value={value} onValueChange={onValueChange} disabled={disabled}>
    <SelectPrimitive.Trigger
      className={cn(
        'flex h-11 w-full items-center justify-between rounded-md border border-border bg-surface px-3 text-left text-sm text-text-primary',
        disabled && 'cursor-not-allowed opacity-60',
        triggerClassName,
      )}
      aria-label={ariaLabel ?? placeholder}
    >
      <SelectPrimitive.Value placeholder={placeholder} />
      <SelectPrimitive.Icon>
        <ChevronDown className="h-4 w-4 text-text-secondary" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn('z-50 max-h-60 overflow-auto rounded-md border border-border bg-surface shadow-dropdown', contentClassName)}
      >
        <SelectPrimitive.Viewport className="p-1">
          {options.map((option) => (
            <SelectPrimitive.Item
              key={option.value}
              value={option.value}
              className={cn(
                'relative flex cursor-pointer items-center rounded px-8 py-2 text-sm text-text-primary outline-none hover:bg-slate-100',
                itemClassName,
              )}
            >
              <SelectPrimitive.ItemIndicator className="absolute left-2">
                <Check className="h-4 w-4 text-primary" />
              </SelectPrimitive.ItemIndicator>
              <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
            </SelectPrimitive.Item>
          ))}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  </SelectPrimitive.Root>
)
