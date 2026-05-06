import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { type ReactNode } from 'react'
import { cn } from '../../../utils/cn'

interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export const Modal = ({ open, onOpenChange, title, description, children, className }: ModalProps) => {
  const hasDescription = Boolean(description)
  const contentA11yProps = hasDescription ? {} : { 'aria-describedby': undefined as undefined }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px]" />
        <Dialog.Content
          {...contentA11yProps}
          className={cn(
            'fixed left-1/2 top-1/2 z-50 flex max-h-[92vh] w-[95vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-modal',
            className,
          )}
        >
          <div className="flex items-start justify-between gap-3 border-b border-border px-6 py-4">
            <div>
              <Dialog.Title className="text-xl font-semibold text-text-primary">{title}</Dialog.Title>
              {description ? (
                <Dialog.Description className="mt-1 text-sm text-text-secondary">
                  {description}
                </Dialog.Description>
              ) : null}
            </div>
            <Dialog.Close asChild>
              <button className="rounded-md p-2 text-text-secondary hover:bg-slate-100 hover:text-text-primary" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>
          <div className="overflow-y-auto px-6 pb-6 pt-4">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
