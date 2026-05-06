import { useLocation, useNavigate } from 'react-router-dom'
import type { SidebarUser } from './Sidebar'
import { AppSidebar } from './AppSidebar'
import type { NavigationItem } from '@/mocks/navigation'

interface RoutedAppSidebarProps {
  className?: string
  user: SidebarUser
  topLinks: NavigationItem[]
  bottomLinks: NavigationItem[]
}

export const RoutedAppSidebar = ({ className, user, topLinks, bottomLinks }: RoutedAppSidebarProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <AppSidebar
      className={className}
      currentPath={location.pathname}
      user={user}
      topLinks={topLinks}
      bottomLinks={bottomLinks}
      onNavigate={navigate}
    />
  )
}
