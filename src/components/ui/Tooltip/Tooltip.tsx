import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import type { ReactNode } from 'react'

interface TooltipProps {
  content: string
  children: ReactNode
}

export const Tooltip = ({ content, children }: TooltipProps) => (
  <TooltipPrimitive.Provider delayDuration={120}>
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          className="z-50 rounded-md bg-text-primary px-2.5 py-1.5 text-xs font-medium text-text-inverse shadow-dropdown"
          sideOffset={8}
        >
          {content}
          <TooltipPrimitive.Arrow className="fill-text-primary" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  </TooltipPrimitive.Provider>
)
