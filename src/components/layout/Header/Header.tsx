import { Bell, Search } from 'lucide-react'
import type { ReactNode } from 'react'
import { Input } from '../../ui'

interface HeaderProps {
  title: string
  subtitle?: string
  showSearch?: boolean
  showNotifications?: boolean
  searchPlaceholder?: string
  onNotificationClick?: () => void
  rightSlot?: ReactNode
}

export const Header = ({
  title,
  subtitle,
  showSearch = true,
  showNotifications = true,
  searchPlaceholder = 'Search accounts, forms, docs',
  onNotificationClick,
  rightSlot,
}: HeaderProps) => (
  <header className="sticky top-0 z-10 border-b border-border bg-background/95 px-4 py-4 backdrop-blur md:px-6">
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">{title}</h1>
        {subtitle ? <p className="dc-muted mt-1">{subtitle}</p> : null}
      </div>
      {rightSlot ?? (
        <div className="flex items-center gap-2">
          {showSearch ? (
            <div className="relative w-full md:w-72">
              <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-text-muted" />
              <Input className="pl-9" placeholder={searchPlaceholder} aria-label="Global Search" />
            </div>
          ) : null}
          {showNotifications ? (
            <button
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-surface text-text-secondary hover:text-text-primary"
              aria-label="Notifications"
              onClick={onNotificationClick}
            >
              <Bell className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      )}
    </div>
  </header>
)
