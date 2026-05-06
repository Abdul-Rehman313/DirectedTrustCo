import {
  CircleHelp,
  CreditCard,
  FileText,
  LifeBuoy,
  LayoutDashboard,
  Menu,
  ReceiptText,
  X,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import type { ComponentType } from 'react'
import { Avatar } from '../../ui'
import { cn } from '../../../utils/cn'

export interface SidebarUser {
  fullName: string
  email: string
  initials: string
}

export interface SidebarLink {
  href: string
  label: string
  icon: ComponentType<{ className?: string }>
  isActive?: boolean
}

export interface SidebarProps {
  className?: string
  brandTitle?: string
  brandSubtitle?: string
  brandMonogram?: string
  user?: SidebarUser
  topLinks?: SidebarLink[]
  bottomLinks?: SidebarLink[]
  onNavigate?: (href: string) => void
}

const defaultTopLinks: SidebarLink[] = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/transactions', label: 'Transactions', icon: CreditCard },
  { href: '/document-center', label: 'Document Center', icon: FileText },
  { href: '/fees', label: 'Fees', icon: ReceiptText },
]

const defaultBottomLinks: SidebarLink[] = [
  { href: '/support', label: 'Support', icon: LifeBuoy },
  { href: '/support/help-center', label: 'Help Center', icon: CircleHelp },
]

const defaultUser: SidebarUser = {
  fullName: 'Jordan Williams',
  email: 'jordan.williams@directedconnect.com',
  initials: 'JW',
}

export const Sidebar = ({
  className,
  brandTitle = 'Directed Connect',
  brandSubtitle = 'Fintech Portal',
  brandMonogram = 'DC',
  user = defaultUser,
  topLinks = defaultTopLinks,
  bottomLinks = defaultBottomLinks,
  onNavigate,
}: SidebarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navClasses = useMemo(
    () =>
      'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ease-fintech',
    [],
  )

  const getIsActive = (link: SidebarLink): boolean => {
    if (typeof link.isActive === 'boolean') {
      return link.isActive
    }
    return false
  }

  return (
    <>
      <button
        className="fixed left-4 top-4 z-40 inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface lg:hidden"
        onClick={() => setMobileOpen((previous) => !previous)}
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>
      <aside
        className={cn(
          'fixed left-0 top-0 z-30 flex h-screen w-[280px] flex-col border-r border-border bg-surface px-4 py-6 transition-transform duration-200 ease-fintech',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          className,
        )}
      >
        <div className="mb-8">
          <div className="mb-6 flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-primary text-base font-bold text-white">{brandMonogram}</div>
            <div>
              <p className="text-base font-semibold text-text-primary">{brandTitle}</p>
              <p className="text-xs text-text-secondary">{brandSubtitle}</p>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-background p-3">
            <div className="flex items-center gap-3">
              <Avatar fallback={user.initials} alt={user.fullName} size="md" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-text-primary">{user.fullName}</p>
                <p className="truncate text-xs text-text-secondary">{user.email}</p>
              </div>
            </div>
          </div>
        </div>

        <nav className="space-y-1">
          {topLinks.map((item) => {
            const Icon = item.icon
            const active = getIsActive(item)
            return (
              <button
                key={item.href}
                type="button"
                onClick={() => {
                  onNavigate?.(item.href)
                  setMobileOpen(false)
                }}
                className={cn(
                  navClasses,
                  'w-full',
                  active ? 'bg-info-light text-primary' : 'text-text-secondary hover:bg-slate-100 hover:text-text-primary',
                )}
                aria-current={active ? 'page' : undefined}
              >
                <Icon className={cn('h-4 w-4', active ? 'text-primary' : 'text-text-secondary')} />
                <span className={cn(active && 'font-semibold')}>{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="mt-auto space-y-1 border-t border-border pt-4">
          {bottomLinks.map((item) => {
            const Icon = item.icon
            const active = getIsActive(item)
            return (
              <button
                key={item.href}
                type="button"
                onClick={() => {
                  onNavigate?.(item.href)
                  setMobileOpen(false)
                }}
                className={cn(
                  navClasses,
                  'w-full',
                  active ? 'bg-info-light text-primary' : 'text-text-secondary hover:bg-slate-100 hover:text-text-primary',
                )}
                aria-current={active ? 'page' : undefined}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            )
          })}
        </div>
      </aside>
      {mobileOpen ? (
        <button
          className="fixed inset-0 z-20 bg-black/30 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close sidebar overlay"
        />
      ) : null}
    </>
  )
}
