import { useMemo } from 'react'
import type { SidebarLink, SidebarProps, SidebarUser } from './Sidebar'
import { Sidebar } from './Sidebar'

interface AppSidebarLink {
  href: string
  label: string
  icon: SidebarLink['icon']
}

interface AppSidebarProps {
  className?: string
  currentPath: string
  user: SidebarUser
  topLinks: AppSidebarLink[]
  bottomLinks: AppSidebarLink[]
  onNavigate: NonNullable<SidebarProps['onNavigate']>
}

const withActiveState = ({
  links,
  currentPath,
  dashboardMatch,
  supportMatch,
}: {
  links: AppSidebarLink[]
  currentPath: string
  dashboardMatch: boolean
  supportMatch: boolean
}): SidebarLink[] =>
  links.map((link) => ({
    ...link,
    isActive: link.href === '/' ? dashboardMatch : link.href === '/support' ? supportMatch : currentPath === link.href,
  }))

export const AppSidebar = ({ className, currentPath, user, topLinks, bottomLinks, onNavigate }: AppSidebarProps) => {
  const isDashboardActive = currentPath === '/' || currentPath.startsWith('/accounts/')
  const isSupportActive = currentPath === '/support'

  const mappedTopLinks = useMemo(
    () =>
      withActiveState({
        links: topLinks,
        currentPath,
        dashboardMatch: isDashboardActive,
        supportMatch: isSupportActive,
      }),
    [currentPath, isDashboardActive, isSupportActive, topLinks],
  )

  const mappedBottomLinks = useMemo(
    () =>
      withActiveState({
        links: bottomLinks,
        currentPath,
        dashboardMatch: isDashboardActive,
        supportMatch: isSupportActive,
      }),
    [bottomLinks, currentPath, isDashboardActive, isSupportActive],
  )

  return (
    <Sidebar
      className={className}
      user={user}
      topLinks={mappedTopLinks}
      bottomLinks={mappedBottomLinks}
      onNavigate={onNavigate}
    />
  )
}
