import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'
import { useLayoutShell } from '../LayoutShellContext'

interface PageWrapperProps {
  title: string
  subtitle?: string
  children: ReactNode
  showHeader?: boolean
  showSidebar?: boolean
  headerSlot?: ReactNode
  sidebarSlot?: ReactNode
}

export const PageWrapper = ({
  title,
  subtitle,
  children,
  showHeader = true,
  showSidebar = true,
  headerSlot,
  sidebarSlot,
}: PageWrapperProps) => {
  const { renderHeader, renderSidebar } = useLayoutShell()

  return (
    <div className="min-h-screen bg-background">
      {showSidebar ? (sidebarSlot ?? renderSidebar?.()) : null}
      <div className={cn(showSidebar && 'lg:pl-[280px]')}>
        {showHeader ? (headerSlot ?? renderHeader?.({ title, subtitle })) : null}
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
