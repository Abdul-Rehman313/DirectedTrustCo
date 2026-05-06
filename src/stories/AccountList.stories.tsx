import type { Meta, StoryObj } from '@storybook/react'
import { accounts } from '../data/mockData'
import { AccountList } from '../components/dashboard'

const meta: Meta<typeof AccountList> = {
  title: 'Dashboard / AccountList',
  component: AccountList,
  args: {
    title: 'Your Accounts',
    accounts: accounts.filter((account) => account.category === 'user'),
  },
}

export default meta
type Story = StoryObj<typeof AccountList>

export const Default: Story = {}
export const Hover: Story = {}
export const Active: Story = {}
export const Disabled: Story = {}
export const Loading: Story = { args: { accounts: [{ ...accounts[0], balanceLabel: 'Loading...' }] } }
export const ErrorState: Story = { args: { accounts: [{ ...accounts[0], status: 'Review' }] } }
export const MobileViewport: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } }
export const DesktopViewport: Story = { parameters: { viewport: { defaultViewport: 'desktop' } } }
export const EmptyState: Story = { args: { accounts: [] } }
