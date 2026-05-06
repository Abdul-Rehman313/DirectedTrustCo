import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, error, ...props }, ref) => (
  <div className="space-y-1">
    <input
      ref={ref}
      className={cn(
        'h-11 w-full rounded-md border bg-surface px-3 text-sm text-text-primary placeholder:text-text-muted',
        error ? 'border-error' : 'border-border',
        className,
      )}
      {...props}
    />
    {error ? (
      <p className="text-xs text-error" role="alert">
        {error}
      </p>
    ) : null}
  </div>
))

Input.displayName = 'Input'
