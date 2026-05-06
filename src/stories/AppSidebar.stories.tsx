import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { RoutedAppSidebar } from '../components/layout'
import { mockCurrentUser, topNavigation, bottomNavigation } from '../mocks'

const meta: Meta<typeof RoutedAppSidebar> = {
  title: 'Design System / Layout / AppSidebar',
  component: RoutedAppSidebar,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/transactions']}>
        <div className="h-screen bg-background">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof RoutedAppSidebar>

export const Default: Story = {
  args: {
    user: mockCurrentUser,
    topLinks: topNavigation,
    bottomLinks: bottomNavigation,
  },
}
