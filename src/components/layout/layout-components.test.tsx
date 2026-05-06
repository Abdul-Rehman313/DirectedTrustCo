import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { Header } from './Header/Header'
import { LayoutShellProvider } from './LayoutShellContext'
import { PageWrapper } from './PageWrapper/PageWrapper'
import { Sidebar } from './Sidebar/Sidebar'
import { RoutedAppSidebar } from './Sidebar/RoutedAppSidebar'
import { mockCurrentUser, topNavigation, bottomNavigation } from '@/mocks'

const LocationDisplay = () => {
  const location = useLocation()
  return <p data-testid="location">{location.pathname}</p>
}

describe('Layout Components', () => {
  it('renders Header with search and notification callback', async () => {
    const onNotificationClick = vi.fn()
    const user = userEvent.setup()

    render(<Header title="Dashboard" subtitle="Overview" onNotificationClick={onNotificationClick} />)

    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Global Search' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Notifications' }))
    expect(onNotificationClick).toHaveBeenCalledTimes(1)
  })

  it('renders PageWrapper with optional header/sidebar toggles', () => {
    const { rerender } = render(
      <LayoutShellProvider renderHeader={({ title, subtitle }) => <Header title={title} subtitle={subtitle} />}>
        <PageWrapper title="One" subtitle="Two" showHeader={false} showSidebar={false}>
          <p>Body</p>
        </PageWrapper>
      </LayoutShellProvider>,
    )

    expect(screen.queryByRole('heading', { name: 'One' })).not.toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()

    rerender(
      <LayoutShellProvider renderHeader={({ title, subtitle }) => <Header title={title} subtitle={subtitle} />}>
        <PageWrapper title="One" subtitle="Two" showSidebar={false}>
          <p>Body</p>
        </PageWrapper>
      </LayoutShellProvider>,
    )

    expect(screen.getByRole('heading', { name: 'One' })).toBeInTheDocument()
  })

  it('handles Sidebar navigation interactions', async () => {
    const onNavigate = vi.fn()
    const user = userEvent.setup()

    render(
      <Sidebar
        user={{ fullName: 'Jordan', email: 'jordan@example.com', initials: 'JW' }}
        topLinks={[{ href: '/dashboard', label: 'Dashboard', icon: ({ className }) => <span className={className}>D</span>, isActive: true }]}
        bottomLinks={[{ href: '/help', label: 'Help', icon: ({ className }) => <span className={className}>H</span> }]}
        onNavigate={onNavigate}
      />,
    )

    expect(screen.getByText('Jordan')).toBeInTheDocument()
    await user.click(screen.getAllByRole('button', { name: /dashboard/i })[0])
    expect(onNavigate).toHaveBeenCalledWith('/dashboard')
  })

  it('maps active routes in AppSidebar and navigates with router', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/accounts/acct-001']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route
            path="*"
            element={
              <>
                <RoutedAppSidebar
                  user={mockCurrentUser}
                  topLinks={topNavigation}
                  bottomLinks={bottomNavigation}
                />
                <LocationDisplay />
              </>
            }
          />
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByRole('button', { name: 'Dashboard' })).toHaveAttribute('aria-current', 'page')

    await user.click(screen.getByRole('button', { name: 'Transactions' }))
    expect(screen.getByTestId('location')).toHaveTextContent('/transactions')
  })
})
