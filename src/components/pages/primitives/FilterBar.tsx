import type { ReactNode } from 'react'

interface FilterBarProps {
  leftSlot: ReactNode
  rightSlot: ReactNode
}

export const FilterBar = ({ leftSlot, rightSlot }: FilterBarProps) => (
  <div className="mb-3 flex flex-wrap items-center gap-2">
    {leftSlot}
    <div className="ml-auto flex flex-wrap items-center gap-2">{rightSlot}</div>
  </div>
)
