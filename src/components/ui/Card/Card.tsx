import { cn } from '../../../utils/cn'
import type { ReactNode } from 'react'

interface CardProps {
  className?: string
  children: ReactNode
  hoverable?: boolean
}

export const Card = ({ className, children, hoverable }: CardProps) => (
  <article
    className={cn(
      'dc-card p-4 md:p-5',
      hoverable && 'transition-transform duration-200 ease-fintech hover:-translate-y-0.5 hover:shadow-modal',
      className,
    )}
  >
    {children}
  </article>
)
