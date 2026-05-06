import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { DashboardPage } from '../components/pages'
import { mockAccounts } from '../mocks'

const meta: Meta<typeof DashboardPage> = {
  title: 'Pages / Dashboard',
  component: DashboardPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof DashboardPage>

export const Default: Story = {
  args: {
    accountsData: mockAccounts,
  },
}
export const Loading: Story = {
  args: {
    accountsData: mockAccounts,
  },
}
export const ErrorState: Story = {
  args: {
    accountsData: mockAccounts,
  },
}
export const EmptyState: Story = {
  args: {
    accountsData: [],
  },
}
export const MobileViewport: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } }
export const DesktopViewport: Story = { parameters: { viewport: { defaultViewport: 'desktop' } } }
