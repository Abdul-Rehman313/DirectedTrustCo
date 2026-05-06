import { cn } from '../../../utils/cn'

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info'

interface BadgeProps {
  children: string
  variant?: BadgeVariant
}

const badgeStyles: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-text-primary',
  success: 'bg-success-light text-success',
  warning: 'bg-warning-light text-warning',
  error: 'bg-error-light text-error',
  info: 'bg-info-light text-info',
}

export const Badge = ({ children, variant = 'default' }: BadgeProps) => (
  <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold', badgeStyles[variant])}>
    {children}
  </span>
)
