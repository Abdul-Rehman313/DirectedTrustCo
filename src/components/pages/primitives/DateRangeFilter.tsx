interface DateRangeFilterProps {
  fromLabel: string
  toLabel: string
  fromValue: string
  toValue: string
  onFromChange: (next: string) => void
  onToChange: (next: string) => void
}

const DateInput = ({
  value,
  onChange,
  label,
}: {
  value: string
  onChange: (next: string) => void
  label: string
}) => (
  <label className="inline-flex h-10 min-w-[150px] items-center justify-between gap-2 rounded-full border border-border bg-surface px-4 text-xs text-text-primary">
    <input
      type="date"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label={label}
      className="w-full bg-transparent text-xs text-text-primary outline-none"
    />
  </label>
)

export const DateRangeFilter = ({
  fromLabel,
  toLabel,
  fromValue,
  toValue,
  onFromChange,
  onToChange,
}: DateRangeFilterProps) => (
  <div className="flex flex-wrap items-center gap-2">
    <DateInput value={fromValue} onChange={onFromChange} label={fromLabel} />
    <span className="text-text-muted">-</span>
    <DateInput value={toValue} onChange={onToChange} label={toLabel} />
  </div>
)
