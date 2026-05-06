import {
  CircleHelp,
  CreditCard,
  FileText,
  LayoutDashboard,
  LifeBuoy,
  ReceiptText,
  type LucideIcon,
} from 'lucide-react'

export interface NavigationItem {
  href: string
  label: string
  icon: LucideIcon
}

export const topNavigation: NavigationItem[] = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/transactions', label: 'Transactions', icon: CreditCard },
  { href: '/document-center', label: 'Document Center', icon: FileText },
  { href: '/fees', label: 'Fees', icon: ReceiptText },
]

export const bottomNavigation: NavigationItem[] = [
  { href: '/support', label: 'Support', icon: LifeBuoy },
  { href: '/support/help-center', label: 'Help Center', icon: CircleHelp },
]
