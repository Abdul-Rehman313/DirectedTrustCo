import { Select } from '@/components/ui'

interface FilterSelectOption {
  label: string
  value: string
}

interface FilterSelectProps {
  value: string
  placeholder: string
  ariaLabel: string
  options: ReadonlyArray<FilterSelectOption>
  onChange: (value: string) => void
  minWidthClassName?: string
}

export const FilterSelect = ({
  value,
  placeholder,
  ariaLabel,
  options,
  onChange,
  minWidthClassName = 'min-w-[160px]',
}: FilterSelectProps) => (
  <div className={minWidthClassName}>
    <Select
      value={value}
      onValueChange={onChange}
      placeholder={placeholder}
      options={options}
      ariaLabel={ariaLabel}
      triggerClassName="h-10 rounded-full px-4 text-xs"
      itemClassName="text-xs"
    />
  </div>
)
