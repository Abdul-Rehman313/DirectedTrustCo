import type { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description: string
  icon?: LucideIcon
}

export const EmptyState = ({ title, description, icon: Icon }: EmptyStateProps) => (
  <div className="mx-auto flex max-w-md flex-col items-center justify-center text-center">
    {Icon ? (
      <div className="mb-4 grid h-20 w-20 place-items-center rounded-full bg-gradient-to-b from-[#F9B3A8] via-primary to-[#CC432F] shadow-md">
        <Icon className="h-9 w-9 text-white" />
      </div>
    ) : null}
    <p className="text-[34px] font-semibold leading-none text-text-primary">{title}</p>
    <p className="mt-2 text-sm text-text-secondary">{description}</p>
  </div>
)
